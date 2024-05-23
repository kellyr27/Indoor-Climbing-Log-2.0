import React, { useState, useEffect } from 'react';
import { dateToDisplay } from '../../utils/helpers';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade';
import StyledDataGrid from '../../styles/StyledDataGrid';
import {  Box, Tooltip } from '@mui/material';
import Template2 from '../../templates/Template2';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { getAscents } from '../../services/apis';
import { useLocation } from 'react-router-dom';

const fetchAndPrepareAscents = async () => {
    const ascents = await getAscents()
    // Add id, routeName, routeGrade, and routeColour to each ascent (flattening the route object)
    const ascentsFlattened = ascents.map(item => {
		const ascentFlattened = {
			...item,
			id: item._id,
			routeName: item.route.name,
			routeGrade: item.route.grade,
			routeColour: item.route.colour,
		}

		if (item.route.area) {
			ascentFlattened.routeAreaName = item.route.area.name;
		}

		return ascentFlattened;
	
	});

    // Sort the ascents by date then by createdAt, descending
    const sortedAscents = ascentsFlattened.sort((a, b) => {
        const dateDifference = new Date(b.date) - new Date(a.date);
        if (dateDifference !== 0) {
            return dateDifference;
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    })

    return sortedAscents;
}

const AscentsPage = () => {
    const navigate = useNavigate();
    const [ascentsData, setAscentsData] = useState([]);

	const location = useLocation();
	const initialFilterModel = location.state ? {filterModel: location.state.defaultFilter} : null

    useEffect(() => {
        const fetchAscentsData = async () => {
            try {
                const ascents = await fetchAndPrepareAscents();
                setAscentsData(ascents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAscentsData();
    }, [])

    const [columns, setColumns] = useState(null)

    useEffect(() => {
        if (ascentsData.length > 0) {

            setColumns([
                {
                    field: 'date', 
                    headerName: 'Date', 
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
                    field: 'tickType', 
                    headerName: 'Tick Type', 
                    minWidth: 50,
                    flex: 2,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'singleSelect',
                    valueOptions: ['flash', 'redpoint', 'hangdog', 'attempt'],
					sortComparator: (v1, v2, cellParams1, cellParams2) => {
						const order = ['flash', 'redpoint', 'hangdog', 'attempt'];
						return order.indexOf(v1) - order.indexOf(v2);
					},
                    renderCell: (params) => {
                        return (
							<Tooltip title={params.value} arrow>
								<span>
									<TickTypeIcon tickType={params.value} />
								</span>
							</Tooltip>
                        )
                    },
					valueGetter: (params) => {
						return params ? params : null;
					},
                    headerAlign: 'center',
                    align: 'center',
					filterOperators: [
						{
							value: 'equals',
							getApplyFilterFn: (filterItem, column) => {

								if (!filterItem.field || !filterItem.value || !filterItem.operator) {
									return;
								}
								return (params) => {
									const value = params;
									const filterValue = filterItem.value;
									return value === filterValue;
								};
							},
						},
					],
                }, 
                {
                    field: 'routeName',
                    headerName: 'Route Name',
                    minWidth: 200,
                    flex: 4,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        return params
                    },
                    renderCell: (params) => {
                        return (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <RouteColour colour={params.row.routeColour} />
                                {params.row.routeName}
                            </div>
                        )
                    },
                    type: 'string',
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'routeGrade',
                    headerName: 'Grade',
                    minWidth: 50,
                    flex: 2,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        return params
                    },
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
								<RouteGrade grade={params.row.routeGrade} />
							</Box>
						)
					},
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                }, 
				{
                    field: 'routeAreaName',
                    headerName: 'Area',
                    minWidth: 200,
                    flex: 4,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'string',
					valueFormatter: (params) => {
                        return params ? params : null;
                    },
					valueGetter: (params) => {
                        return params ? params : null;
                    },
					renderCell: (params) => {
                        return (
                            <Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
                                {/* <Typography variant="body1"> */}
									{params.formattedValue ? params.formattedValue : null}
                                {/* </Typography> */}
                            </Box>
                        )
                    },
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'notes', 
                    headerName: 'Notes', 
                    flex: 8,
                    minWidth: 200,
                    sortable: false,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    renderCell: (params) => (
                        <Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
                            {params.row.notes}
                        </Box>
                    ),
                    headerAlign: 'center',
                    align: 'left',
                }
            ])
        }
    }, [ascentsData])


    return (
        <>
            <Template2>
				{columns && <StyledDataGrid
                    style={{ width: '100%' }}
                    rows={ascentsData}
                    columns={columns}
                    pageSize={100}
                    disableCellFocus
                    rowHeight={70}
                    sx={{height: '90vh', bgcolor: 'rgba(254, 250, 250, 0.92)'}}
                    onRowDoubleClick={(params) => {
                        navigate(`/ascents/${params.row.id}`);
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
					localeText={{noRowsLabel: 'No ascents to display!'}}
				/>}
            </Template2>
            <CreateAscentFab />
        </>
    );
}

export default AscentsPage;