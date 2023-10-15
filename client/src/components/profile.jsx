import React,{useEffect,useState} from 'react';
import { Paper, Container, Typography } from '@mui/material';
import Logo from '../assests/images/logo.png'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
export default function Profile() {
    const token=localStorage.getItem('token')
    const[profile,setProfile]=useState('')
    useEffect(() => {
        axios.get('http://localhost:4004/login/profile',{headers:{
        Authorization:`Bearer ${token}`
            }})
            .then(function (response) {
                const profile=response.data.details
               setProfile(profile)
            })
            .catch(error => {
                console.error('Error ', error)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
console.log(profile);
    return (<center>
        <br />
        <Container>
            <Paper shadows elevation={0} style={{
                backgroundColor: "#87CBB9", width: '70%',
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px"
            }}>


                <img style={{ width: '25%', marginLeft: '-16%' }} src={Logo} alt="logo" /><Typography style={{ marginLeft: '17%', fontSize: "40px", fontFamily: "monospace", marginTop: '-15%' }}>Profile</Typography>
                <br /><br /> <form><center>
                    <Typography style={{ marginTop: '2%', width: "70%",height:"50px",fontSize:"25px",fontFamily:"monospace", backgroundColor: "#B9EDDD", color: '#2F4858' }} >Name : {profile.name}</Typography><br />
                    <Typography style={{ marginTop: '2%', width: "70%",height:"50px",fontSize:"25px",fontFamily:"monospace", backgroundColor: "#B9EDDD", color: '#2F4858' }} >Username : {profile.username}</Typography><br />
                    <Typography style={{ marginTop: '2%', width: "70%",height:"50px",fontSize:"25px",fontFamily:"monospace", backgroundColor: "#B9EDDD", color: '#2F4858' }} >Address : {profile.address}</Typography><br />
                    <Typography style={{ marginTop: '2%', width: "70%",height:"50px",fontSize:"25px",fontFamily:"monospace", backgroundColor: "#B9EDDD", color: '#2F4858' }} >Phone : {profile.Phone}</Typography><br />
                    </center></form><br />
            </Paper>
        </Container>
    </center>
    )
}