import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgba(148, 255, 216, 0.7)',
      },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
    '& .MuiDataGrid-scrollbarFiller--header': {
        backgroundColor: 'rgba(148, 255, 216, 0.7)',
    }
});


export default StyledDataGrid;