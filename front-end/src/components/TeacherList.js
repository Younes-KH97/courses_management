import { DataGrid  } from '@mui/x-data-grid';
import { useState } from 'react';
import {Button} from '@mui/material'
import DeleteBtn from './DeleteBtn';
import { Box } from '@mui/system';



const TeacherList = ({rows, handleDelete, handleShowEdit, editText, setId}) => {

  const [selectionModel, setSelectionModel] = useState([]);

  const handleDeleteRows = () => {
    handleDelete(selectionModel)
  }




  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstname',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastname',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
    },
  ];

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
      bgcolor: 'background.paper',
      borderRadius: 1,
    }}
  >
    <DeleteBtn handleDelete={handleDeleteRows}/>
    <BtnEdit />
  </Box>
  )
  
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
export default TeacherList