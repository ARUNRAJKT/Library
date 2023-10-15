import React, { useState } from 'react';
import { Paper, Button, TextField, Container, Typography } from '@mui/material';
import Logo from '../assests/images/logo.png'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function Register() {

   const[input,setInput]=useState('')
   const inputChange=(e)=>{
      const{name,value}=e.target;
      setInput(values=>({...values,[name]:value}))
      // .reset();
   }
   const navGate=useNavigate()
   const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post('http://localhost:4004/login/reg', input).then(function (res) {
      console.log(res);
      toast("Wow,You have made the right decision!");   
      navGate('/login')
            console.log('sucesss');
        })
            .catch(function (error) {
               const message=error.response.data.message
               alert(message)
                console.log(error);
            });
        console.log(input);
   }
   return (<center>
      <br />
      <Container>
         <Paper shadows elevation={0} style={{
            backgroundColor: "#87CBB9", width: '70%',
            "-webkit-border-radius": "40px",
            "-moz-border-radius": "40px",
            "border-radius": "40px",
            " -webkit-box-shadow": " 0px 9px 9px 4px rgba(0,0,0,0.75)",
            "-moz-box-shadow": "  0px 9px 9px 4px rgba(0,0,0,0.75)",
            "box-shadow": " 0px 9px 9px 4px rgba(0,0,0,0.75)"
         }}>


            <img style={{ width: '25%', marginLeft: '-16%' }} src={Logo} alt="logo" /><Typography style={{ marginLeft: '17%', marginTop: '-15%' }}>REGISTER</Typography>
            <br /><br /> <form onSubmit={handleSubmit}>
               <TextField id="outlined-basic" onChange={inputChange} style={{ marginTop: '2%', width: "70%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="name" label="Name" variant="outlined" /><br />
               <TextField id="outlined-basic" onChange={inputChange} style={{ marginTop: '2%', width: "70%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="number" label="Phone" variant="outlined" type={"number"} /><br />
               <TextField id="outlined-basic" onChange={inputChange} style={{ marginTop: '2%', width: "70%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="address" label="Address" variant="outlined" /><br />
               <TextField id="outlined-basic" onChange={inputChange} style={{ marginTop: '2%', width: "70%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="username" label="Username" variant="outlined" /><br />
               <TextField id="outlined-basic" onChange={inputChange} style={{ marginTop: '2%', width: "70%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="password" label="Password" variant="outlined" type="password" /><br />
               <Button type='Submit' variant="contained" color="secondary" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", color: "#2F4858", marginBottom: "2%", marginTop: "2%" }}>
                  Register
               </Button>
               <ToastContainer/>
            </form>
         </Paper>
      </Container>
   </center>
   )
}