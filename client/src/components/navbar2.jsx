import React from "react"
import { Container, Button, Grid } from '@mui/material'
import logo from '../assests/images/logo.png'
import { Link } from "react-router-dom"
export default function Navbar2() {
    return (
        <React.Fragment>
            <Grid container style={{ backgroundColor: "#569DAA" }}>
                <Grid item sm={4}><img src={logo} alt="logo" style={{ width: "17%", marginLeft: '10%' }} /></Grid>
                <Grid item sm={2}></Grid>
                <Grid item sm={6}>
                    <Container container style={{ marginLeft: "50%", marginRight: "10%", marginTop: "2%", marginBottom: '2%' }}>
                        <Link to='/register'>
                            <Button variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }}>Register</Button>
                        </Link>
                        <Link to='/login'>
                            <Button variant="text" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0% ", backgroundColor: "#577D86", width: '114px', height: "60px", marginLeft: '2%', color: "#2F4858" }}>Login</Button>
                        </Link>
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}