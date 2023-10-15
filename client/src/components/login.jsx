import React, { useState } from 'react';
import { Paper, Button, TextField, Checkbox, FormControlLabel, Typography, Container } from '@mui/material';
import Logo from '../assests/images/logo.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
export default function Login() {

  const [input, setInput] = useState('')
  const navGate = useNavigate()
  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4004/login/log', input,).then(function (res) {
      console.log('sucesss', res);
      localStorage.setItem('token',res.data.token )
      localStorage.setItem('loginRole', res.data.details.role)
      localStorage.setItem('loginName', res.data.details.username)
      navGate('/')
    })
      .catch(function (error) {
        const message = error.response.data.message
        navGate('/register')
        console.log(message);
      });
    console.log(input);
  }
  return (<center><ToastContainer/>
    <Paper shadows elevation={0} style={{
      width: "75%", backgroundColor: "#87CBB9", marginTop: "5%",
      "-webkit-border-radius": "40px",
      "-moz-border-radius": "40px",
      "border-radius": "40px",
      "webkitBoxShadow": "0px 0px 29px 6px rgba(0,0,0,0.75)",
      "-moz-box-shadow": "0px 0px 29px 6px rgba(0,0,0,0.75)",
      "box-shadow": "0px 0px 29px 6px rgba(#577D86)"
    }}>
      <Container>
        <div ><br />
          <img src={Logo} alt="logo" style={{ width: "17%", marginLeft: '4%' }} />
          <h3 style={{ marginTop: '-4%' }}>USER LOGIN</h3>
          <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" onChange={inputChange} label="Username" variant="outlined" style={{ width: "60%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="username" /><br /><br />
            <TextField id="outlined-basic" onChange={inputChange} label="Password" variant="outlined" style={{ width: "60%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="password" /><br />
            <FormControlLabel name="permanent" control={<Checkbox />} style={{ marginLeft: "-210px" }} label="Remember me" />
            <Link to='/register'><Typography style={{textDecoration:'none', marginTop: "-32px", marginLeft: "230px" }}>New User Register</Typography></Link> <br />
            <Button type='Submit' variant="contained" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginBottom: "20px", color: "#2F4858" }}>LOGIN</Button>
          </form>
        </div>
      </Container>
    </Paper>

  </center>
  )
}
