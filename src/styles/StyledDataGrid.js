import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { withStyles } from '@mui/material';

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
    '& .MuiDataGrid-scrollbarFiller--header': {
        backgroundColor: '#94FFD8',
    }
});


export default StyledDataGrid;