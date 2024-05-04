import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { dateToDisplay } from '../../utils/helpers';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import {Tooltip} from '@mui/material';
import StyledDataGrid from '../../styles/StyledDataGrid';
import { Grid, Box, Container } from '@mui/material';

const RoutesPage = () => {
    const navigate = useNavigate();

    const [routesData, setRoutesData] = useState([]);

    useEffect(() => {
        // Fetch the ascents data from the server
        const fetchRoutesData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${baseUrl}/routes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const dataWithIds = response.data.map(item => ({
                    ...item,
                    id: item._id,
                    lastAscentDate: item.ascents.length > 0 ? item.ascents[0].date : null,
                    firstAscentDate: item.ascents.length > 0 ? item.ascents[item.ascents.length - 1].date : null,
                }));

                const sortedData = dataWithIds.sort((a, b) => {
                    return new Date(b.lastAscentDate) - new Date(a.lastAscentDate);
                });

                setRoutesData(sortedData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchRoutesData();
    }, [])

    const [columns, setColumns] = useState([])

    useEffect(() => {
            

        if (routesData.length > 0) {
            setColumns([
                {
                    field: 'name',
                    headerName: 'Name',
                    // width: 200,
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
                    // width: 150,
                    flex: 3,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                    renderCell: (params) => (
                        <RouteGrade grade={params.value} />
                    ),
                }, 
                {
                    field: 'ascents',
                    headerName: 'Ascents',
                    // width: 250,
                    flex: 5,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    renderCell: (params) => {
                        const ascents = params.row.ascents;
                        // TODO: Fix word wrap
                        return (
                            <div>
                                {ascents.map((ascent, index) => {
                                    return (
                                        <Tooltip key={index} title={dateToDisplay(ascent.date)}>
                                            <span>
                                                <TickTypeIcon tickType={ascent.tickType} />
                                            </span>
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        )
                    },
                    headerAlign: 'center',
                }, 
                {
                    field: 'lastAscentDate',
                    headerName: 'Last Ascent Date',
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
                    headerName: 'First Ascent Date',
                    field: 'firstAscentDate',
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
                }
            ]);
        }
    }, [routesData]);


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
                        rows={routesData}
                        columns={columns}
                        pageSize={100}
                        disableCellFocus
                        rowHeight={70}
                        onRowDoubleClick={(params) => {
                            navigate(`/routes/${params.row.id}`);
                        }}
                    />
                </Box>
            </Container>
        </div>
    );
}

export default RoutesPage;