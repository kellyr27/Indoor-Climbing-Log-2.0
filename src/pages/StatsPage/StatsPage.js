import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { BarChart} from '@mui/x-charts/BarChart';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import './heatmap.css';
import { Box,  Paper } from '@mui/material';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Template4 from '../../templates/Template4';
import { useResizeDetector } from 'react-resize-detector';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { Chart, ArcElement, PieController } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import { useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';




TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

// Chart.register(ArcElement, PieController);


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

function formatAreaStats (data) {

	// For each area, group the gradeCounts by difficulty
	const areaStats = data.map((area) => {
		const gradeCountGroupByDifficulty = {
			'easy': 0,
			'moderate': 0,
			'difficult': 0,
			'hard': 0,
			'very hard': 0,
			'extreme': 0
		}

		for (const [grade, count] of Object.entries(area.gradeCounts)) {
			if (grade <= 17) {
				gradeCountGroupByDifficulty['easy'] += count;
			} else if ((grade > 17) && (grade <= 20)) {
				gradeCountGroupByDifficulty['moderate'] += count;
			} else if ((grade > 20) && (grade <= 22)) {
				gradeCountGroupByDifficulty['difficult'] += count;
			} else if ((grade > 22) && (grade <= 25)) {
				gradeCountGroupByDifficulty['hard'] += count;
			} else {
				gradeCountGroupByDifficulty['very hard'] += count;
			}
		}

		// Format it for the piechart
		const gradeCountData = [
			{
				id: 0, 
				value: gradeCountGroupByDifficulty['easy'],
				label: 'Easy',
			},
			{
				id: 1, 
				value: gradeCountGroupByDifficulty['moderate'],
				label: 'Moderate',
			},
			{
				id: 2, 
				value: gradeCountGroupByDifficulty['difficult'],
				label: 'Difficult',
			},
			{
				id: 3, 
				value: gradeCountGroupByDifficulty['hard'],
				label: 'Hard',
			},
			{
				id: 4, 
				value: gradeCountGroupByDifficulty['very hard'],
				label: 'Very Hard',
			},
		]

		return {
			...area,
			gradeCountData
		}
		
	});

	return areaStats;
}

const StatsPage = () => {

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
	const [areaStats, setAreaStats] = useState(null);

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

	useEffect(() => {
		const fetchAreaStats = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(`${baseUrl}/stats/area-stats`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setAreaStats(formatAreaStats(response.data));
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchAreaStats();
	}, [])

    return (
        <>
            <Template4>
                <Paper ref={ref} sx={{minHeight: '92vh', borderRadius: 6, m: 2, bgcolor: 'rgba(254, 250, 250, 0.95)'}}>
                    <Typography variant="h3" align="center" sx={{ pt: 2, mb: 3, fontWeight: 'bold' }}>
                        Your Statistics
                    </Typography>
					<Box  sx={{p: 1}}>
						<TableContainer>
							<Table>
							<TableHead style={{backgroundColor: '#f2f2f2'}}>
								<TableRow>
									<TableCell align="center" style={{fontWeight: 'bold'}}>Area Name</TableCell>
									<TableCell align="center" style={{fontWeight: 'bold'}}>Difficulty</TableCell>
									<TableCell align="center" style={{fontWeight: 'bold'}}>Total Ascents</TableCell>
									<TableCell align="center" style={{fontWeight: 'bold'}}>Best Ascents</TableCell>
								</TableRow>
							</TableHead>
								<TableBody>
									{areaStats && areaStats.map((row) =>{ 

										return (
											<TableRow key={row.area}>
												<TableCell>
													{row.area}
												</TableCell>
												<TableCell>
													<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
														<PieChart
															// series={{
															// 	data: {
															// 		labels: ['Easy', 'Moderate', 'Difficult', 'Hard', 'Very Hard'],
															// 		datasets: [
															// 		{
															// 			data: Object.values(row.gradeCountGroupByDifficulty),
															// 			backgroundColor: ['#66b320', '#f9e11a', '#f29a14', '#cc2c28', '#9f247b'],
															// 		},
															// 		],
															// 	},
															// 	highlightScope: { faded: 'global', highlighted: 'item' },
															// 	faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
															// }}
															series={[{
																data: row.gradeCountData,
																highlightScope: { faded: 'global', highlighted: 'item' },
          														faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
															}]}
															colors={['#66b320', '#f9e11a', '#f29a14', '#cc2c28', '#9f247b']}
															
															width={100}
															height={100}
															margin={{right: 5}}
															slotProps={{
																legend: {
																	hidden: true,
																},
															}}
															// options={{ layout: { legend: 'none' } }}

														/>
													</div>
												</TableCell>
												<TableCell align="center">
													<Link to={'/routes'} state={ {defaultFilter: {items: [{ field: 'area', operatorValue: 'contains', value: row.area }]}}}>
														{row.totalAscents}
													</Link>
												</TableCell>
												<TableCell>
													{row.topAscents.flash && row.topAscents.flash.map((ascent) => {
														return (
															<Box key={ascent.date} display="flex" justifyContent="space-between" flexDirection={isSmallScreen ? "column" : "row"} sx={{mb: 1}}>
																<Box display="flex" flexDirection="row" >
																	<Box sx={{mr: 2}}>
																		<TickTypeIcon tickType={ascent.tickType}/> 
																	</Box>
																	<Box display="flex" flexDirection="row">
																		<Box sx={{mr: 1}}>
																			<RouteGrade grade={ascent.route.grade}/>
																		</Box>
																		<Box> 
																			{ascent.route.name}
																		</Box> 
																	</Box>
																</Box>
																<Box textAlign="right" sx={{ letterSpacing: 0.5, fontSize: 10, fontStyle: 'italic' }}>
																	{timeAgo.format(new Date(ascent.date))}
																</Box>
															</Box>
														)
													})}
													{row.topAscents.redpoint && row.topAscents.redpoint.map((ascent) => {
														return (
															<Box key={ascent.date} display="flex" justifyContent="space-between" flexDirection={isSmallScreen ? "column" : "row"} sx={{mb: 1}}>
																<Box display="flex" flexDirection="row" >
																	<Box sx={{mr: 2}}>
																		<TickTypeIcon tickType={ascent.tickType}/> 
																	</Box>
																	<Box display="flex" flexDirection="row">
																		<Box sx={{mr: 1}}>
																			<RouteGrade grade={ascent.route.grade}/>
																		</Box>
																		<Box> 
																			{ascent.route.name}
																		</Box> 
																	</Box>
																</Box>
																<Box textAlign="right" sx={{ letterSpacing: 0.5, fontSize: 10, fontStyle: 'italic' }}>
																	{timeAgo.format(new Date(ascent.date))}
																</Box>
															</Box>
														)
													})}
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<BarChart 
							series={[
								{data: gradePyramid.flashGrades, stack: 'A', label: 'Flash', color: '#92d050'},
								{data: gradePyramid.redpointGrades, stack: 'A', label: 'Redpoint', color: '#ff0000'},
								{data: gradePyramid.otherGrades, stack: 'A', label: 'Other', color: '#d9d9d9'}
							]}
							yAxis={[{ scaleType: 'band', data: gradePyramid.gradesRange, label: 'Grades', curve: 'catmullRom' }]}
							layout="horizontal"
			
							width={Math.min(width, 700)}
							height={350}
						/>
					</Box>
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
					<Box sx={{display: 'flex', justifyContent: 'center'}}>
						<Box sx={{ width: Math.min(700, width), height: '100%', }}>
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
					</Box>        
                </Paper>
            </Template4>
            <CreateAscentFab />
        </>
    );
}

export default StatsPage;