import { Alert, Button, Container, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import TeacherCreate from '../components/TeacherCreate'
import TeacherList from '../components/TeacherList'
import SearchIcon from '@mui/icons-material/Search';
import TeacherEdit from '../components/TeacherEdit'

const Teachers = () => {
    const [btnText, setBtnText] = useState("Add")
    const [rows, setRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [colorBtn, setColorBtn] = useState("green")

    const [id, setId] = useState("")
    const [editText, setEditText] = useState("Edit")
    const [showEdit, setShowEdit] = useState(false)

    const handleBtnClick = () => {
        if(btnText === 'add') {
           setBtnText('close') 
           setColorBtn("red")
          } 
          else{
            setBtnText('add') 
            setColorBtn("green")
          }
        }
    const BtnAlert = () => { return (
      <Stack  sx={{ width: '50%' ,   position: 'absolute',
      top: '10%', ml: 14
       }} spacing={2}>
        <Alert onClose={()=>setShowAlert(false)} severity="error">This teacher has multiple courses!</Alert>
      </Stack>
    )}
    const handleDelete = (ids) => {
      for (let index = 0; index < ids.length; index++) {
      axios.delete(`http://localhost:8080/api/v1/teacher/${ids[index]}`).then(function (response) {
        getTeachers()
      }).catch(function (error){   
          setShowAlert(true)
      });
    
     }}



    const getTeachers = () => {
        axios.get(
          'http://localhost:8080/api/v1/teacher'
        )
        .then(function (response) {
          setRows(response.data)
        });
      }

    React.useEffect(() => {
        return () => {
          getTeachers()
        }
      }, [])

      let srchList = []
      const handleSearchChange = (e) => {
         const val = e.target.value
 
         if(val === ''){
           getTeachers()
           
           return ;
         }
         rows.forEach(element => {
             
           
           if(element.lastname.indexOf(val) === 0){
             srchList.push(element)
             
           }
         }
         )
         setRows(srchList);
         
      }

      const handleShowEdit = () => {
        let bool = !showEdit

        setShowEdit(bool)
        if(bool === true)
         setEditText("Cancel")
        else
         setEditText("Edit")
      }

  return (
      <Container>
        <SearchIcon  sx={{mt:3,ml:13,  color:'gray'}} />
          <TextField onChange={handleSearchChange} sx={{ml:1, width:'650px'}} label="Lastname..." variant="standard" />
          <Button onClick={handleBtnClick} variant='outlined' sx={{ml:90, color:`${colorBtn}`, borderColor:`${colorBtn}`, fontSize:16}}>
              {btnText}
          </Button>
          {(btnText === 'close') && <TeacherCreate getTeachers={getTeachers}/>}

          {showEdit && <TeacherEdit handleShowEdit={handleShowEdit} getTeachers={getTeachers} id = {id}/>}

          <TeacherList rows={rows}  handleDelete={handleDelete}
                                handleShowEdit = {handleShowEdit}
                                setId = {setId} 
                                editText={editText}
          />
          {showAlert && <BtnAlert />}
      </Container>

  )
}

export default Teachers