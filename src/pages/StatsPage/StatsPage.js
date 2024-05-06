import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { BarChart} from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import './heatmap.css';
import { Box, Grid, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Template1 from '../../templates/Template1';


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
            <Template1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        minHeight: '92vh',
                    }}
                >
                    <Paper sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 800 } }}>
                        <Typography variant="h3" align="center" sx={{ mt: 2, mb: 3, fontWeight: 'bold' }}>
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
                            width={600}
                            height={350}
                        />
                        <Divider />
                        <LineChart
                            series={[
                                { data: weeklyStats.avgFlashGrades, label: 'Avg Flash Grade', color: '#92d050', connectNulls: true },
                                { data: weeklyStats.avgRedpointGrades, label: 'Avg Redpoint Grade', color: '#ff0000', connectNulls: true },
                                { data: weeklyStats.avgOtherGrades, label: 'Avg Other Grade', color: '#d9d9d9', connectNulls: true }
                            ]}
                            xAxis={[{ data: weeklyStats.weeksRange, label: 'Weeks' }]}
                            yAxis={[{ min: 15, max: 28 }]}
                            width={600}
                            height={350}
                        />
                        <Divider />
                        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 3 }}>
                            Activity Calendar
                        </Typography>
                        <div style={{ width: '600px', height: '300px' }}>
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
                        </div>

                </Paper>
            </Box>
        </Template1>
    );
}

export default StatsPage;