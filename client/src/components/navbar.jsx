import React, { useEffect } from "react"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Container, Button, Grid } from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from '../assests/images/logo.png'
import { Link, useNavigate } from "react-router-dom"
export default function Navbar() {
  const navGate = useNavigate()
  const handleSubmit = (e) => {
    localStorage.removeItem('token')
    localStorage.removeItem('loginRole')
    localStorage.removeItem('loginName')
    navGate('/Login')
  };
  const value = localStorage.getItem('token')
  const name = localStorage.getItem('loginName')
  useEffect(() => {
    if (value === null) {
      navGate('/Login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <React.Fragment>
      <Grid container style={{ backgroundColor: "#569DAA" }}>
        <Grid item sm={4}><img src={logo} alt="logo" style={{ width: "17%", marginLeft: '10%' }} /></Grid>
        <Grid item sm={2}></Grid>
        <Grid item sm={6}>
            <Container container style={{ marginTop: "2%", marginBottom: '2%' }}>
              <Link to='/'>
                <Button variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: '#2F4858' }} >Home</Button>
              </Link>
              <Link to='/addbook'>
                <Button variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }}>Books</Button>
              </Link>
              <Link to='/authorSearch'>
                <Button variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }}>Author</Button>
              </Link>
              <Button type="submit" onClick={handleSubmit} variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0% ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }} endIcon={<LogoutOutlinedIcon />}>Logout</Button>
              <Link to='/profile'>
              <Button type="submit"  variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0% ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }} endIcon={<AccountCircleRoundedIcon />}>{name}</Button>
              </Link>
            </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}