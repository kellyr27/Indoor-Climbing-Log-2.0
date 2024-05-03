import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { BarChart } from '@mui/x-charts/BarChart';

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


const StatsPage = () => {

    const [gradePyramid, setGradePyramid] = useState({
        flashGrades: [],
        redpointGrades: [],
        otherGrades: [],
        gradesRange: []
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

    return (
        <div>
            <h1>Stats Page</h1>
            <BarChart 
                series={[
                    {data: gradePyramid.flashGrades, stack: 'A', label: 'Flash', color: 'green'},
                    {data: gradePyramid.redpointGrades, stack: 'A', label: 'Redpoint', color: 'red'},
                    {data: gradePyramid.otherGrades, stack: 'A', label: 'Other', color: 'grey'}
                ]}
                yAxis={[{ scaleType: 'band', data: gradePyramid.gradesRange, label: 'Grades' }]}
                layout="horizontal"
                width={600}
                height={350}
            />
        </div>
    );
}

export default StatsPage;