import { Grid, Typography, Container, Button, Modal, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import { ToastContainer, toast } from 'react-toastify';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Viewbook() {
    const token=localStorage.getItem('token')
    const [bookDetails, setDetails] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4004/addbook/showbook',{headers:{
            authorization:`Bearer ${token}`
        }})
            .then(function (response) {
                const data = response.data.data;
                console.log(response)
                if (response.data.success === true) {
                    setDetails(data)
                }
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching book details', error)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookDetails]);

    const deleteBook = (id) => {
        console.log(id);
        axios.get(`http://localhost:4004/addbook/deleteBook/${id}`).then(function (res) {
            console.log('deleted');
            window.location.reload()
        })
            .catch(function (error) {
                const message = error.response.data.message
                alert(message)
                console.log(error);
            });
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[upDetails,setUpdetails]=useState('')
    const updateBook = (id) => {
        console.log(id);
        axios.get(`http://localhost:4004/addbook/updateBook/${id}`).then(function (res) {

            const upD=res.data.details
            setUpdetails(upD)
            console.log('update details got',upD);
        })
            .catch(function (error) {
                const message = error.response.data.message
                alert(message)
                console.log(error);
            });
            console.log(upDetails,"-------------");
    }
  
    const updateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdetails(values => ({ ...values, [name]: value }))
    }
    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4004/addbook/updated', upDetails).then(function (res) {  
            console.log('sucesss');
            setOpen(false);
            window.location.reload()
            toast("updated")
        })
            .catch(function (error) {
                console.log(error);
            });
        console.log(upDetails);
    }

    return (
        <center>
            <br />
            <Grid container style={{ backgroundColor: '#87CBB9' }}>
                {bookDetails?.map((book) => (

                    <Grid item className='front' xs={3} style={{ backgroundColor: "#569DAA", width: "100%", margin: "4%" }}>
                        <Container className='back' style={{
                            backgroundColor: "#577D86", margin: '2%', '-webkit-border-top-right-radius': '20px',
                            '- webkit - border - bottom - right - radius': '37px',
                            '-moz-border-radius-topright': '10px',
                            '-moz-border-radius-bottomright': '37px',
                            'border-top-right-radius': '20px',
                            'border-bottom-right-radius': '20px',
                        }}>
                            <div style={{ boxShadow: "none" }} >
                                <Typography style={{ width: "200px", boxShadow: "none", color: "#000000" }}>
                                    Bookname : &nbsp;
                                    {book.bookName}
                                </Typography>
                                <Typography style={{ width: "200px", boxShadow: "none", color: "#000000" }}>
                                    Author : &nbsp;
                                    {book.bookAuthor}
                                </Typography>
                                <Typography style={{ width: "200px", boxShadow: "none", color: "#000000" }}>
                                    Type :&nbsp;
                                    {book.bookType}
                                </Typography>
                                <Typography style={{ width: "200px", boxShadow: "none", color: "#000000" }}>
                                    Language :&nbsp;
                                    {book.bookLanguage}
                                </Typography>
                                <Typography style={{ width: "200px", boxShadow: "none", color: "#000000" }}>
                                    Donated By :&nbsp;
                                    {book.bookLanguage}
                                </Typography>
                                <Button onClick={() => { deleteBook(book._id) }} variant="contained" style={{ boxShadow: "none", backgroundColor: "#A03E2E", margin: '2%', color: '#000000' }} color="error" endIcon={<DeleteForeverRoundedIcon style={{ boxShadow: "none" }} />}>
                                    Delete
                                </Button>
                                <Button onClick={() => { updateBook(book._id);handleOpen()}} variant="contained" style={{ boxShadow: "none", backgroundColor: "#308E3A", margin: '2%', color: '#000000' }} color="success" endIcon={<NoteAltRoundedIcon style={{ boxShadow: "none" }} />}> EDIT</Button>

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    // aria-labelledby="modal-modal-title"
                                    // aria-describedby="modal-modal-description"
                                ><center  >
                                        <Paper sx={style} shadows elevation={0} style={{
                                            backgroundColor: "#87CBB9", width: '70%',
                                            "-webkit-border-radius": "20px",
                                            "-moz-border-radius": "20px",
                                            "border-radius": "20px"
                                        }}>
                                            <form  onSubmit={handleUpdateSubmit}>
                                                <Typography fontSize={'500%'} fontFamily={"monospace"}>Update Book</Typography><br />
                                                <TextField value={upDetails.bookName} onChange={updateInputChange} variant="outlined" name="bookName" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} ></TextField><br />
                                                <TextField value={upDetails.bookAuthor} onChange={updateInputChange} variant="outlined" name="bookAuthor" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} ></TextField><br />
                                                <TextField value={upDetails.bookType} onChange={updateInputChange} variant="outlined" name="bookType" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} ></TextField><br />
                                                <TextField value={upDetails.bookLanguage} onChange={updateInputChange} variant="outlined" name="bookLanguage" style={{ marginTop: "2%", backgroundColor: "#B9EDDD", width: "90%" }} ></TextField><br />
                                                <Button variant="text" type="submit" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0% ", backgroundColor: "#577D86", width: '114px', height: "60px", marginTop: '2%', marginBottom: "2%", color: "#2F4858" }}>ADD BOOK</Button>
                                            </form>
                                        </Paper>
                                    </center>
                                </Modal>
                            </div>
                            <ToastContainer/>
                        </Container>
                    </Grid>

                ))}
            </Grid>
        </center>
    );
}
