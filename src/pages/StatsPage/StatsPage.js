import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { BarChart} from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import './heatmap.css';
import { Box,  Paper } from '@mui/material';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Template1 from '../../templates/Template1';
import { useResizeDetector } from 'react-resize-detector';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';



function formatDataBarChart (data) {
    // All the keys are grades

    // Find the minimum and maximum grade
    const grades = Object.keys(data);
    const minGrade = Math.min(...grades);
    const maxGrade = Math.max(...grades); 

    // Create an array for flash, redpoint and other of all the grades between the min and max
    const gradesRange = []
    const flashGrades = []
    const redpointGrades = []
    const otherGrades = []

    for (let i = maxGrade; i >= minGrade; i--) {
        gradesRange.push(i);
        flashGrades.push(data[i].flash);
        redpointGrades.push(data[i].redpoint);
        otherGrades.push(data[i].hangdog + data[i].attempt);
    }

    return {
        flashGrades,
        redpointGrades,
        otherGrades,
        gradesRange
    }
}

function formatWeeklyStats (data) {
    const weeksRange = []
    const avgFlashGrades = []
    const avgRedpointGrades = []
    const avgOtherGrades = []

    // Sort data by week number (string)
    const sortedData = Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0]));

    for (const [week, ascents] of sortedData) {
        weeksRange.push(week);
        avgFlashGrades.push(ascents.avgFlashGrade);
        avgRedpointGrades.push(ascents.avgRedpointGrade);
        avgOtherGrades.push(ascents.avgOtherGrade);
    }

    return {
        weeksRange,
        avgFlashGrades,
        avgRedpointGrades,
        avgOtherGrades
    }
}

function formatPerformanceRatings (data) {
    const performanceRatings = []

    for (const [date, values] of Object.entries(data)) {
        performanceRatings.push({
            date,
            numClimbs: values.numClimbs,
            totalPoints: values.totalPoints
        });
    }

    return performanceRatings;
}



const StatsPage = () => {

    const { width, ref } = useResizeDetector();

    const [gradePyramid, setGradePyramid] = useState({
        flashGrades: [],
        redpointGrades: [],
        otherGrades: [],
        gradesRange: []
    });
    const [weeklyStats, setWeeklyStats] = useState({
        weeksRange: [],
        avgFlashGrades: [],
        avgRedpointGrades: [],
        avgOtherGrades: []
    });
    const [performanceRatings, setPerformanceRatings] = useState(null);

    useEffect(() => {
        const fetchGradePyramid = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/stats/grade-pyramid`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setGradePyramid(formatDataBarChart(data));
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchGradePyramid();
    }, []);

    useEffect(() => {
        const fetchWeeklyStates = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/stats/weekly-stats`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;

                setWeeklyStats(formatWeeklyStats(data));
                
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchWeeklyStates();
    }, []);

    useEffect(() => {
        const fetchPerformanceRatings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/stats/performance-rating`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setPerformanceRatings(formatPerformanceRatings(data));
                
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchPerformanceRatings();
    }, []);

    return (
        <>
            <Template1>
                <Paper ref={ref} sx={{minHeight: '92vh', borderRadius: 6, m: 2, bgcolor: 'rgba(254, 250, 250, 0.95)'}}>
                    <Typography variant="h3" align="center" sx={{ pt: 2, mb: 3, fontWeight: 'bold' }}>
                        Your Statistics
                    </Typography>
                    <BarChart 
                        series={[
                            {data: gradePyramid.flashGrades, stack: 'A', label: 'Flash', color: '#92d050'},
                            {data: gradePyramid.redpointGrades, stack: 'A', label: 'Redpoint', color: '#ff0000'},
                            {data: gradePyramid.otherGrades, stack: 'A', label: 'Other', color: '#d9d9d9'}
                        ]}
                        yAxis={[{ scaleType: 'band', data: gradePyramid.gradesRange, label: 'Grades', curve: 'catmullRom' }]}
                        layout="horizontal"
                        width={width}
                        height={350}
                    />
                    <Divider sx={{mt: 2, mb: 2}} />
                    <LineChart
                        series={[
                            { data: weeklyStats.avgFlashGrades, label: 'Avg Flash Grade', color: '#92d050', connectNulls: true },
                            { data: weeklyStats.avgRedpointGrades, label: 'Avg Redpoint Grade', color: '#ff0000', connectNulls: true },
                            { data: weeklyStats.avgOtherGrades, label: 'Avg Other Grade', color: '#d9d9d9', connectNulls: true }
                        ]}
                        xAxis={[{ data: weeklyStats.weeksRange, label: 'Weeks' }]}
                        yAxis={[{ min: 15, max: 28 }]}
                        width={width}
                        height={350}
                    />
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="h5" align="center" sx={{  mb: 1 }}>
                        Activity Calendar
                    </Typography>
                    <Box sx={{ width: width, height: '100%' }}>
                        <Box sx={{p: 2, pb: 4, mb: 3}}>
                            <Tooltip id="my-tooltip"/>
                            {performanceRatings && <CalendarHeatmap
                                startDate={new Date('2024-01-01')}
                                endDate={new Date('2024-12-01')}
                                values={performanceRatings}
                                showMonthLabels
                                tooltipDataAttrs={(value) => {
                                    if (!value.totalPoints) {
                                        return null;
                                    } else {
                                        return { 
                                            'data-tooltip-content': `Performance rating: ${value.totalPoints}, Number of climbs: ${value.numClimbs}`, 
                                            "data-tooltip-id": "my-tooltip"
                                        }
                                    }
                                }}
                                classForValue={value => {
                                    if (!value) {
                                    return 'color-empty';
                                    }
                                    return `color-github-${value.numClimbs}`;
                                }}
                            />}
                        </Box>
                    </Box>         
                </Paper>
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default StatsPage;