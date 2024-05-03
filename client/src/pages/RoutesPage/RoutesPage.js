import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { dateToDisplay } from '../../utils/helpers';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import {Tooltip} from '@mui/material';

const RoutesPage = () => {
    const navigate = useNavigate();

    const [routesData, setRoutesData] = useState([]);

    useEffect(() => {
        // Fetch the ascents data from the server
        const fetchroutesData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${baseUrl}/routes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('routes', response.data)

                const dataWithIds = response.data.map(item => ({
                    ...item,
                    id: item._id,
                    lastAscentDate: item.ascents.length > 0 ? item.ascents[0].date : null,
                    firstAscentDate: item.ascents.length > 0 ? item.ascents[item.ascents.length - 1].date : null,
                }));

                setRoutesData(dataWithIds);

            } catch (error) {
                console.error(error);
            }
        };

        fetchroutesData();
    }, [])

    const [columns, setColumns] = useState([])

    useEffect(() => {
            

        if (routesData.length > 0) {
            setColumns([
                {
                    field: 'name',
                    headerName: 'Name',
                    width: 200,
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
                    width: 150,
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
                    width: 250,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    renderCell: (params) => {
                        const ascents = params.row.ascents;
                        // TODO: Fix word wrap
                        return (
                            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
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
                    width: 150,
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
                    width: 150,
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
        <DataGrid
            rows={routesData}
            columns={columns}
            pageSize={100}
            disableCellFocus
            rowHeight={70}
            onRowDoubleClick={(params) => {
                navigate(`/routes/${params.row.id}`);
            }}
        />
    );
}

export default RoutesPage;