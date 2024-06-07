import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import StyledDataGrid from '../../styles/StyledDataGrid';
import Template5 from '../../templates/Template5';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { getAreas } from '../../services/apis';
import { useLocation } from 'react-router-dom';
import SteepnessIcon from "../../components/SteepnessIcon";
import { Box, Typography} from '@mui/material';
import { Tooltip } from '@mui/material';

const AreasPage = () => {
    const navigate = useNavigate();
    const [areasData, setAreasData] = useState([]);

	const location = useLocation();
	const initialFilterModel = location.state ? {filterModel: location.state.defaultFilter} : null

    useEffect(() => {
        const fetchAreasData = async () => {
            try {
                const areas = await getAreas();

				// Order area by name ascending
				areas.sort((a, b) => a.name.localeCompare(b.name))

                setAreasData(areas);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAreasData();
    }, [])

    const [columns, setColumns] = useState(null)

    useEffect(() => {
        if (areasData.length > 0) {

            setColumns([
                {
                    field: 'name', 
                    headerName: 'Name', 
                    minWidth: 250,
                    flex: 5,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    headerAlign: 'center',
                    align: 'left',
					valueFormatter: (params) => {
                        return params ? params : null;
                    },
					renderCell: (params) => {
                        return (
                            <Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
								{params.formattedValue ? params.formattedValue : null}
                            </Box>
                        )
                    },
                },
				{
                    field: 'steepnessTags', 
                    headerName: 'Steepness', 
                    minWidth: 200,
                    flex: 2,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    type: 'string',
                    headerAlign: 'center',
                    align: 'center',
					renderCell: (params) => {
						const steepnessTags = params.value
						return (
							<Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
                                <Typography variant="body1" >
                                    {steepnessTags.map((tag, index) => {
                                        return (
                                            <Tooltip key={index} title={tag}>
                                                <span style={{marginRight: '5px'}}>
														<SteepnessIcon steepness={tag} />
                                                </span>
                                            </Tooltip>
                                        )
                                    })}
                                </Typography>
                            </Box>
						)
					}
                },
            ])
        }
    }, [areasData])


    return (
        <>
            <Template5>
				{columns && <StyledDataGrid
                    style={{ width: '100%' }}
                    rows={areasData}
                    columns={columns}
                    pageSize={100}
                    disableCellFocus
                    rowHeight={70}
                    sx={{height: '90vh', bgcolor: 'rgba(254, 250, 250, 0.92)'}}
					onRowDoubleClick={(params) => {
                        navigate(`/areas/${params.row.id}`);
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
					localeText={{noRowsLabel: 'No areas to display!'}}
				/>}
            </Template5>
            <CreateAscentFab />
        </>
    );
}

export default AreasPage;