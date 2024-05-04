import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { dateToDisplay } from '../../utils/helpers';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import StyledDataGrid from '../../styles/StyledDataGrid';
import { Grid, Box, Container } from '@mui/material';

const AscentsPage = () => {
    const navigate = useNavigate();

    const [ascentsData, setAscentsData] = useState([]);


    useEffect(() => {
        // Fetch the ascents data from the server
        const fetchAscentsData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${baseUrl}/ascents`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const dataWithIds = response.data.map(item => ({
                    ...item,
                    id: item._id,
                    routeName: item.route.name,
                    routeGrade: item.route.grade,
                    routeColour: item.route.colour,
                }));

                // Sort the data by date
                const sortedData = dataWithIds.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })

                setAscentsData(sortedData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchAscentsData();
    }, [])

    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (ascentsData.length > 0) {

            setColumns([
                {
                    field: 'date', 
                    headerName: 'Date', 
                    // width: 150,
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
                    // width: 100,
                    flex: 2,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'singleSelect',
                    valueOptions: ['flash', 'redpoint', 'hangdog', 'attempt'],
                    renderCell: (params) => {
                        return (
                            <TickTypeIcon tickType={params.value} />
                        )
                    },
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    field: 'routeName',
                    headerName: 'Route Name',
                    // width: 200,
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
                    // width: 100,
                    flex: 2,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        return params
                    },
                    renderCell: (params) => {
                        return (
                            <RouteGrade grade={params.row.routeGrade} />
                        )
                    },
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    field: 'notes', 
                    headerName: 'Notes', 
                    flex: 4,
                    minWidth: 200,
                    maxWidth: 400,
                    sortable: false,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    renderCell: (params) => (
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {params.row.notes}
                        </div>
                    ),
                    headerAlign: 'center',
                    align: 'left',
                }
            ])
        }
    }, [ascentsData])


    return (
            <div style={{backgroundColor: '#FDFFC2'}} >
                <Container sx={{backgroundColor: '#FDFFC2'}} >
                    <Box
                        sx={{
                            // alignItems: "stretch",
                            minHeight: '92vh',
                            height: '92vh', 
                            width: '100%',
                            // maxWidth: '950px'
                        }}
                    >
                        <StyledDataGrid
                            style={{ width: '100%' }}
                            rows={ascentsData}
                            columns={columns}
                            pageSize={100}
                            disableCellFocus
                            rowHeight={70}
                            onRowDoubleClick={(params) => {
                                navigate(`/ascents/${params.row.id}`);
                            }}
                        />
                    </Box>
                </Container>
            </div>

    );
}

export default AscentsPage;