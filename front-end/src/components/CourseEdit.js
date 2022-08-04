import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'

const CourseEdit = ({getCourses, course_id, handleShowEdit}) => {
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [totalHours, setTotalHours] = useState("")
    const [teacher_id, setTeacherId] = useState("")
    const [teachers, setTeachers] = useState([])

    const menuItems = []
    useEffect(() => {
        const getTeachers = () => {
            axios({
                method: 'get',
                url: 'http://localhost:8080/api/v1/teacher',
              })
                .then(function (response) {
                    setTeachers(response.data)                 
                });
        }

    
      return () => {
        getTeachers()
       

      }
    }, [])

    teachers.forEach((element) => {
        menuItems.push(<MenuItem key={element.id} value={element.id}>{element.firstname} {element.lastname}</MenuItem>)
    });

    const handleDateChange = (newValue) => {

      setDate(format(newValue, 'yyyy-MM-dd'));

    };

    const handleDescChange = (e) => {
        setDesc(e.target.value)
  
      };

    const handleHoursChange = (e) => {
      setTotalHours(e.target.value)
    }

      const handleSelectChange = (e) =>{
        setTeacherId(e.target.value)
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const teacher = teachers.filter(elment => elment.id === teacher_id)
        console.log(teacher[0])
        axios.put(`http://localhost:8080/api/v1/course/${course_id}`, {
            description: desc,
            date: date,
            teacher: teacher[0],
            totalHours: totalHours
          })
          .then(function (response) {
            getCourses()
            handleShowEdit()
          })
          .catch(function (error) {
            console.log(error);
          });

        setDesc("")
        setTotalHours("")
    }
  return (
    <form onSubmit = {handleSubmit}>
      

      <TextField label="course_id" 
                name="course_id"
                disabled 
                variant="standard" 
                 
                style = {{width: '75%', marginLeft: 100}}          
                value={course_id}
     />

    <TextField label="Description" 
                name="description"
                required 
                variant="standard" 
                sx={{m:2}} 
                style = {{width: '75%', marginLeft: 100}}          
                value={desc}
                onChange={handleDescChange}
     />
      {/* {formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null} */}


      <TextField label="Total hours" 
                name="totalHours"
                required 
                variant="standard" 
                sx={{mb:3}} 
                style = {{width: '75%', marginLeft: 100}}          
                value={totalHours}
                onChange={handleHoursChange}
     />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
<Stack                                 sx={{m:1}} 
                        style = {{width: '75%', marginLeft: 100}} spacing={3}>
<DesktopDatePicker

name="date"
  label="Start date"
  inputFormat="MM/dd/yyyy"
value={date}
onChange={handleDateChange}
  renderInput={(params) => <TextField {...params} />}
/>
</Stack>
</LocalizationProvider>
    


    <TextField
    sx={{m:1}} 
    style = {{width: '75%', marginLeft: 100}}
  variant="outlined"
  value={teacher_id}
  onChange={handleSelectChange}
  select
  label="Teacher"
>
    {menuItems}
</TextField>
    <Button type="submit"
      style = {{width: '75%', marginLeft: 100, backgroundColor:'black'}}
     sx={{m:2, fontSize:16}}
     variant="contained"
     
     > save </Button>

</form>
  )
}

export default CourseEdit