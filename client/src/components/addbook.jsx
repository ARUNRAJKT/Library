import { Paper, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function Addbook() {
    const token = localStorage.getItem('token')
    const [input, setInput] = useState('')
    const inputChange = (e) => {
        const { name, value } = e.target;
        setInput(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4004/addbook/addbook',input,{
            headers: {
                authorization:`Bearer ${token}`
            }
        } ).then(function (res) {
            setInput('')
            toast("Yahh..You have Added a Book!");
            inputChange("");
            console.log('sucesss');
        })
            .catch(function (error) {
                setInput('')
                console.log(error);
            });
        console.log(input);
    }
    return (
        <center><br /><br /><ToastContainer />
            <Paper shadows elevation={0} style={{
                backgroundColor: "#87CBB9", width: '70%',
                "-webkit-border-radius": "20px",
                "-moz-border-radius": "20px",
                "border-radius": "20px",
                "box-shadow": "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
            }}>
                <form onSubmit={handleSubmit}>
                    <Typography fontSize={'500%'} fontFamily={"monospace"}>Add Book</Typography><br />
                    <TextField variant="outlined" onChange={inputChange} name="bookName" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} label='Book Name'></TextField><br />
                    <TextField variant="outlined" onChange={inputChange} name="bookAuthor" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} label='Author'></TextField><br />
                    <TextField variant="outlined" onChange={inputChange} name="bookType" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} label='Type'></TextField><br />
                    <TextField variant="outlined" onChange={inputChange} name="bookLanguage" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} label='Language'></TextField><br />
                    <Button variant="text" type="submit" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0% ", backgroundColor: "#577D86", width: '114px', height: "60px", marginTop: '2%', marginBottom: "2%", color: "#2F4858" }}>ADD BOOK</Button>
                </form>
            </Paper>
        </center>
    )
}
