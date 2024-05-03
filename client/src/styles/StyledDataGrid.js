import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)({
    backgroundColor: '#FDFFC2',
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#94FFD8',
      },
});

export default StyledDataGrid;