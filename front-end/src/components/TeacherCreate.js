import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email'),
    firstname: yup
    .string('Enter your firstname'),
    lastname: yup
    .string('Enter your lastname')

});

const TeacherCreate = ({getTeachers}) => {

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('http://localhost:8080/api/v1/teacher', {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email
      })
      .then(function (response) {
        getTeachers()
        console.log(response);
        values.firstname = ''
        values.lastname = ''
        values.email = ''
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      
            <TextField label="Firstname" 
                        name="firstname"
                        required 
                        variant="standard" 
                        sx={{m:1}} 
                        style = {{width: '75%', marginLeft: 100}}          
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
             />
              {formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}

            <TextField 
                    label="Lastname" 
                    name="lastname"
                    required 
                    variant="standard" 
                    sx={{m:1}} 
                    style = {{width: '75%', marginLeft: 100}}
                    fullWidth 
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
              />
              {formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}

            <TextField 
                  label="Email" 
                  name="email"
                  required 
                  variant="standard" 
                  sx={{m:1}} 
                  style = {{width: '75%', marginLeft: 100}}
                  fullWidth  
                  onChange={formik.handleChange}
                  value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <Button type="submit"
              style = {{width: '75%', marginLeft: 100}}
             sx={{m:2, fontSize:16}}
             variant="contained"
             
             > submit </Button>
        
    </form>
  )
}

export default TeacherCreate