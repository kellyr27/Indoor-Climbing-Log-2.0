import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { BarChart} from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

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

    return (
        <div>
            <h1>Stats Page</h1>
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
        </div>
    );
}

export default StatsPage;