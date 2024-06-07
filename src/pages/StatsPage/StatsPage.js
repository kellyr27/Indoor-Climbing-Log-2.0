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
import Template4 from '../../templates/Template4';
import { useResizeDetector } from 'react-resize-detector';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import { PieChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';
import BestAscentDisplay from '../../components/BestAscentDisplay';
import { getDifficultyClassification } from '../../utils/helpers';

function formatDateActivityCalendarTooltip (date) {

    function getOrdinalSuffix(day) {
        if (day % 10 === 1 && day !== 11) {
            return day + 'st';
        } else if (day % 10 === 2 && day !== 12) {
            return day + 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            return day + 'rd';
        } else {
            return day + 'th';
        }
    }

    const dateObject = new Date(date);
    const day = parseInt(new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(dateObject), 10);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject);
    const formattedDate = `${getOrdinalSuffix(day)} ${month}`;

    return formattedDate;
}

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

function formatTickTypeStats (data) {
	// Reusing the API for the Grade bar chart

	const tickTypeStats = [
		{
			tickType: 'flash',
			totalAscents: data.tickTypeCountsTotal.flash,
			topAscents: data.topAscents.flash

		},
		{
			tickType: 'redpoint',
			totalAscents: data.tickTypeCountsTotal.redpoint,
			topAscents: data.topAscents.redpoint
		}
	]

	for (const tickType of ['flash', 'redpoint']) {

		const gradeCountGroupByDifficulty = {
			'easy': 0,
			'moderate': 0,
			'difficult': 0,
			'hard': 0,
			'very hard': 0,
			'extreme': 0
		}

		for (const [grade, tickTypeCount] of Object.entries(data.tickTypeCountsByGrade)) {

			const difficultyClassification = getDifficultyClassification(grade);
			switch (difficultyClassification) {
				case 0:
					gradeCountGroupByDifficulty['easy'] += tickTypeCount[tickType];
					break;
				case 1:
					gradeCountGroupByDifficulty['moderate'] += tickTypeCount[tickType];
					break;
				case 2:
					gradeCountGroupByDifficulty['difficult'] += tickTypeCount[tickType];
					break;
				case 3:
					gradeCountGroupByDifficulty['hard'] += tickTypeCount[tickType];
					break;
				case 4:
					gradeCountGroupByDifficulty['very hard'] += tickTypeCount[tickType];
					break;
				default:
					break;
			}
		}

		tickTypeStats.find((tickTypeStat) => tickTypeStat.tickType === tickType).gradeCountData = [
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
	}

	return tickTypeStats;
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
		}

		for (const [grade, count] of Object.entries(area.gradeCounts)) {
			const difficultyClassification = getDifficultyClassification(grade);
			
			switch (difficultyClassification) {
				case 0:
					gradeCountGroupByDifficulty['easy'] += count;
					break;
				case 1:
					gradeCountGroupByDifficulty['moderate'] += count;
					break;
				case 2:
					gradeCountGroupByDifficulty['difficult'] += count;
					break;
				case 3:
					gradeCountGroupByDifficulty['hard'] += count;
					break;
				case 4:
					gradeCountGroupByDifficulty['very hard'] += count;
					break;
				default:
					break;
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
	const [tickTypeStats, setTickTypeStats] = useState(null);

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

	useEffect(() => {
		const fetchTickTypeStats = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(`${baseUrl}/stats/tickType-stats`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setTickTypeStats(formatTickTypeStats(response.data));
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchTickTypeStats();
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
										<TableCell key="tickType" align="center" style={{fontWeight: 'bold'}}>Tick Type</TableCell>
										<TableCell key="difficulty" align="center" style={{fontWeight: 'bold'}}>Difficulty</TableCell>
										<TableCell key="totalAscents" align="center" style={{fontWeight: 'bold'}}>Total Ascents</TableCell>
										<TableCell key="bestAscents" align="center" style={{fontWeight: 'bold'}}>Best Ascents</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tickTypeStats && tickTypeStats.map((row, index) =>{ 

										return (
											<TableRow key={index}>
												<TableCell key="tickType">
													<Box display="flex" flexDirection="row" >
														<Box sx={{mr: 1}}>
															<TickTypeIcon tickType={row.tickType}/> 
														</Box>
														<Box display="flex" flexDirection="row">
															{row.tickType.charAt(0).toUpperCase() + row.tickType.slice(1)}
														</Box>
													</Box>
												</TableCell>
												<TableCell key="difficulty">
													<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
														<PieChart
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
												<TableCell key="totalAscents" align="center">
													<Link to={'/ascents'} style={{ textDecoration: 'none' }} state={ {defaultFilter: {items: [{ field: 'tickType', operator: 'equals', value: row.tickType }]}}}>
														{row.totalAscents}
													</Link>
												</TableCell>
												<TableCell key="bestAscents">
													{row.topAscents && row.topAscents.map((ascent, index) => {
														return (
															<BestAscentDisplay
																key={index}
																tickType={ascent.tickType}
																date={ascent.date}
																routeName={ascent.route.name}
																routeGrade={ascent.route.grade}
																routeId={ascent.route._id}
															/>
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
					<Box  sx={{p: 1}}>
						<TableContainer>
							<Table>
							<TableHead style={{backgroundColor: '#f2f2f2'}}>
								<TableRow>
									<TableCell key="areaName" align="center" style={{fontWeight: 'bold'}}>Area Name</TableCell>
									<TableCell key="difficulty" align="center" style={{fontWeight: 'bold'}}>Difficulty</TableCell>
									<TableCell key="totalAscents" align="center" style={{fontWeight: 'bold'}}>Total Ascents</TableCell>
									<TableCell key="bestAscents" align="center" style={{fontWeight: 'bold'}}>Best Ascents</TableCell>
								</TableRow>
							</TableHead>
								<TableBody>
									{areaStats && areaStats.map((row) =>{ 

										return (
											<TableRow key={row.area.id}>
												<TableCell key="area">
													<Link to={`/areas/${row.area.id}`} style={{ textDecoration: 'none' }}>
														{row.area.name}
													</Link>
												</TableCell>
												<TableCell key="difficulty">
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
												<TableCell align="center" key="totalAscents">
													<Link to={'/ascents'} style={{ textDecoration: 'none' }} state={ {defaultFilter: {items: [{ field: 'routeAreaName', operator: 'contains', value: row.area.name }]}}}>
														{row.totalAscents}
													</Link>
												</TableCell>
												<TableCell key="bestAscents">
														{row.topAscents.flash && row.topAscents.flash.map((ascent, index) => {
															return (
																<BestAscentDisplay
																	key={index}
																	tickType={ascent.tickType}
																	date={ascent.date}
																	routeName={ascent.route.name}
																	routeGrade={ascent.route.grade}
																	routeId={ascent.route._id}
																/>
															)
														})}
														{row.topAscents.redpoint && row.topAscents.redpoint.map((ascent, index) => {
															return (
																<BestAscentDisplay
																	key={index}
																	tickType={ascent.tickType}
																	date={ascent.date}
																	routeName={ascent.route.name}
																	routeGrade={ascent.route.grade}
																	routeId={ascent.route._id}
																/>
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
                        yAxis={[{ min: 10, max: 28 }]}
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
													'data-tooltip-content': `Performance rating: ${value.totalPoints}, Number of climbs: ${value.numClimbs} on ${formatDateActivityCalendarTooltip(value.date)}`, 
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