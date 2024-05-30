import React, { useState, useEffect } from 'react';
import { dateToDisplay } from '../../utils/helpers';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade';
import {Tooltip} from '@mui/material';
import StyledDataGrid from '../../styles/StyledDataGrid';
import { Box } from '@mui/material';
import Template2 from '../../templates/Template2';
import {Typography} from '@mui/material';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { useLocation } from 'react-router-dom';
import { getRoutes } from '../../services/apis';

const RoutesPage = () => {
    const navigate = useNavigate();
	const location = useLocation();
	const initialFilterModel = location.state ? {filterModel: location.state.defaultFilter} : {}
	

    const [routesData, setRoutesData] = useState([]);

    useEffect(() => {
        // Fetch the ascents data from the server
        const fetchRoutesData = async () => {
            try {


				const data = await getRoutes()



				// Sort ascents (property of route) by date descending
				const sortedAscents = data.map(item => {
					item.ascents.sort((a, b) => new Date(b.date) - new Date(a.date));
					return item;
				})



                const dataWithIds = sortedAscents.map(item => ({
                    ...item,
                    id: item._id,
                    lastAscentDate: item.ascents.length > 0 ? item.ascents[0].date : null,
                    firstAscentDate: item.ascents.length > 0 ? item.ascents[item.ascents.length - 1].date : null,
                }));
				// Sort by last ascent date, then by created date for the last ascent
                const sortedData = dataWithIds.sort((a, b) => {
					const dateComparison = new Date(b.lastAscentDate) - new Date(a.lastAscentDate);
					if (dateComparison !== 0) {
					  	return dateComparison;
					} else {
					  	return new Date(b.ascents[0].createdAt) - new Date(a.ascents[0].createdAt);
					}
				});

                setRoutesData(sortedData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchRoutesData();
    }, [])

    const [columns, setColumns] = useState(null)

    useEffect(() => {
            

        if (routesData.length > 0) {
            setColumns([
                {
                    field: 'name',
                    headerName: 'Name',
                    minWidth: 200,
                    flex: 4,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    renderCell: (params) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <RouteColour colour={params.row.colour} />
                            {params.value}
                        </div>
                    ),
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'grade',
                    headerName: 'Grade',
                    minWidth: 50,
                    flex: 3,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
					renderCell: (params) => {
						return (
							<Box 
								sx={{
									display: 'flex', 
									justifyContent: 'center',
									alignItems: 'center', 
									height: '100%',
									width: '100%',
								}}
							>
								<RouteGrade grade={params.value} />
							</Box>
						)
					},
                }, 
                {
                    field: 'ascents',
                    headerName: 'Ascents',
                    minWidth: 150,
                    flex: 5,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    renderCell: (params) => {
                        const ascents = params.row.ascents;
                        return (
                            <Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
                                <Typography variant="body1">
                                    {ascents.map((ascent, index) => {
                                        return (
                                            <Tooltip key={index} title={dateToDisplay(ascent.date)}>
                                                <span>
                                                    <TickTypeIcon tickType={ascent.tickType} />
                                                </span>
                                            </Tooltip>
                                        )
                                    })}
                                </Typography>
                            </Box>
                        )
                    },
                    headerAlign: 'center',
                }, 
				{
                    field: 'area',
                    headerName: 'Area',
                    minWidth: 200,
                    flex: 4,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'string',
					valueFormatter: (params) => {
                        return params ? params.name : null;
                    },
					valueGetter: (params) => {
                        return params ? params.name : null;
                    },
					renderCell: (params) => {
                        return (
                            <Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
                                {/* <Typography variant="body1"> */}
                                    {params.row.area ? params.row.area.name : null}
                                {/* </Typography> */}
                            </Box>
                        )
                    },
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'lastAscentDate',
                    headerName: 'Last Ascent Date',
                    minWidth: 150,
                    flex: 3,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueFormatter: (params) => {
                        return dateToDisplay(params);
                    },
                    type: 'date',
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    headerName: 'First Ascent Date',
                    field: 'firstAscentDate',
                    minWidth: 150,
                    flex: 3,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueFormatter: (params) => {
                        return dateToDisplay(params);
                    },
                    type: 'date',
                    headerAlign: 'center',
                    align: 'center',
                }
            ]);
        }
    }, [routesData]);

    return (
        <>
            <Template2>
                {columns && <StyledDataGrid
                    style={{ width: '100%' }}
                    rows={routesData}
                    columns={columns}
                    pageSize={100}
                    disableCellFocus
                    rowHeight={70}
                    sx={{height: '90vh', bgcolor: 'rgba(254, 250, 250, 0.92)'}}
                    onRowDoubleClick={(params) => {
                        navigate(`/routes/${params.row.id}`);
                    }}
					initialState={{
						filter: initialFilterModel
					}}
                />}
				{!columns && <StyledDataGrid
                    style={{ width: '100%' }}
                    rows={[]}
                    columns={[]}
                    pageSize={100}
                    disableCellFocus
                    rowHeight={70}
                    sx={{height: '90vh', bgcolor: 'rgba(254, 250, 250, 0.92)'}}
					localeText={{noRowsLabel: 'No routes to display!'}}
                />}
            </Template2>
            <CreateAscentFab />
        </>
    );
}

export default RoutesPage;