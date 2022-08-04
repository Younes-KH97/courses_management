import { Button, Container, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import ListCourse from '../components/ListCourse'
import CreateCourse from '../components/CreateCourse'
import SearchIcon from '@mui/icons-material/Search';
import CourseEdit from '../components/CourseEdit'

const Courses = () => {
    const [btnText, setBtnText] = useState("Add")
    const [editText, setEditText] = useState("Edit")
    const [showEdit, setShowEdit] = useState(false)
    const [rows, setRows] = useState([])
    const [id, setId] = useState("")
    const [colorBtn, setColorBtn] = useState("green")

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

    const handleDelete = (ids) => {
      for (let index = 0; index < ids.length; index++) {
      axios.delete(`http://localhost:8080/api/v1/course/${ids[index]}`).then(function (response) {
        getCourses()
      }).catch(function (response){
        console.log(response)
      });
    
     }}

     let srchList = []
     const handleSearchChange = (e) => {
        const val = e.target.value

        if(val === ''){
          getCourses()
          
          return ;
        }
        rows.forEach(element => {
            
          
          if(element.description.indexOf(val) === 0){
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


     const getCourses = () => {
        axios.get(
          'http://localhost:8080/api/v1/course'
        )
        .then(function (response) {
           setRows(response.data)
           
        });
      }

    React.useEffect(() => {
        return () => {
            getCourses()
        }
      }, [])

  return (
      <Container>
        <SearchIcon  sx={{mt:3,ml:13,  color:'gray'}} />
          <TextField onChange={handleSearchChange} sx={{ml:1, width:'650px'}} label="Description..." variant="standard" />
          
          <Button onClick={handleBtnClick} variant='outlined' sx={{ml:90, color:`${colorBtn}`, borderColor:`${colorBtn}`, fontSize:16}}  >
              {btnText}
          </Button>
          {(btnText === 'close') && <CreateCourse getCourses={getCourses}/>}
          {showEdit && <CourseEdit handleShowEdit={handleShowEdit} getCourses={getCourses} course_id = {id}/>}
          <ListCourse rows={rows}  
                      handleDelete={handleDelete} 
                      handleShowEdit = {handleShowEdit}
                      setId = {setId} 
                      editText={editText} />
      </Container>
      )
  
}

export default Courses