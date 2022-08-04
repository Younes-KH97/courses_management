import { Box, Button } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';
import DeleteBtn from './DeleteBtn';



const ListCourse = ({rows, handleDelete, handleShowEdit, editText, setId}) => {

  const [selectionModel, setSelectionModel] = useState([]);


  const handleDeleteRows = () => {
    handleDelete(selectionModel)
  }


  function getFullName(params) {
      
    return `${params.row.teacher.firstname || ''} ${params.row.teacher.lastname || ''}`;
  }

  const handleShowEditBtn = () => {
    setId(selectionModel[0])
    handleShowEdit()
  }

  const BtnEdit = () => (
    <Button
    color="primary"
    variant="outlined"
    sx={{ ml: 1 }}
    onClick={handleShowEditBtn}
  >
    {editText}
  </Button>
  )
  
  const btns = (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      p: 1,
      m: 1,
      borderRadius: 1,
    }}
  >
    <DeleteBtn handleDelete={handleDeleteRows}/>
    <BtnEdit />
  </Box>
  )

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Start date',
      width: 150,
    },
    {
      field: 'totalHours',
      headerName: 'Total hours',
      width: 100,
    },
    {
        field: 'teacher',
        headerName: 'Teacher',
        valueGetter: getFullName,
        width: 220,
    }
  ];


  
  
  return (
    <div style={{ height: 635, width: '75%', marginLeft: 100 }}>
       {selectionModel.length > 0 && btns} 
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </div>
  );
      }

export default ListCourse