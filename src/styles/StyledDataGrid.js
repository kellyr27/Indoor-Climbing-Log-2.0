import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)({
    backgroundColor: 'white',
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#94FFD8',
      },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
});

export default StyledDataGrid;