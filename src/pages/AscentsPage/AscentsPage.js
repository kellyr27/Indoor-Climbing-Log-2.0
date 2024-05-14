import React, { useState, useEffect } from 'react';
import { dateToDisplay } from '../../utils/helpers';
import {useNavigate} from 'react-router-dom';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteColour from '../../components/RouteColour/RouteColour';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import StyledDataGrid from '../../styles/StyledDataGrid';
import {  Box } from '@mui/material';
import Template2 from '../../templates/Template2';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { getAscents } from '../../apis/ascents';

const fetchAndPrepareAscents = async () => {
    const ascents = await getAscents()

    // Add id, routeName, routeGrade, and routeColour to each ascent (flattening the route object)
    const ascentsFlattened = ascents.map(item => ({
        ...item,
        id: item._id,
        routeName: item.route.name,
        routeGrade: item.route.grade,
        routeColour: item.route.colour,
    }));

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

    const [columns, setColumns] = useState([])

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
                <StyledDataGrid
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
                />
            </Template2>
            <CreateAscentFab />
        </>
    );
}

export default AscentsPage;