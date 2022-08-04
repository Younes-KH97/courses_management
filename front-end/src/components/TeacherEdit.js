import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";



const TeacherEdit = ({getTeachers, id, handleShowEdit}) => {

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")

  const handleFnameChange = (e) => {
    setFname(e.target.value)
  }

  const handleLnameChange = (e) => {
    setLname(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      axios.put(`http://localhost:8080/api/v1/teacher/${id}`,{
          firstname: fname,
          lastname: lname,
          email: email
      }
      ).then(function (response){
        getTeachers()
        handleShowEdit()
      }).catch(function (error){
        console.log(error)
      })
      setFname("")
      setLname("")
      setEmail("")
  } 

  return (
    <form onSubmit={handleSubmit}>

            <TextField label="id" 
                        name="id"
                        disabled 
                        variant="standard" 
                        sx={{m:1}} 
                        style = {{width: '75%', marginLeft: 100}}          
                        value={id}
                    
             />
      
            <TextField label="Firstname" 
                        name="firstname"
                        required 
                        variant="standard" 
                        sx={{m:1}} 
                        style = {{width: '75%', marginLeft: 100}}          
                        value={fname}
                        onChange={handleFnameChange}
             />


            

            <TextField 
                    label="Lastname" 
                    name="lastname"
                    required 
                    variant="standard" 
                    sx={{m:1}} 
                    style = {{width: '75%', marginLeft: 100}}
                    fullWidth 
                    value={lname}
                    onChange={handleLnameChange}
              />
            

            <TextField 
                  label="Email" 
                  name="email"
                  required 
                  variant="standard" 
                  sx={{m:1}} 
                  style = {{width: '75%', marginLeft: 100}}
                  fullWidth  
                  value={email}
                  onChange={handleEmailChange}
            />

            <Button type="submit"
              style = {{width: '75%', marginLeft: 100, backgroundColor:'black'}}
             sx={{m:2, fontSize:16}}
             variant="contained"
             
             > save </Button>
        
    </form>
  )
}

export default TeacherEdit