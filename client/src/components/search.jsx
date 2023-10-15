import React, { useState,useEffect } from 'react';
import { Paper, Button, TextField, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';
export default function Search() {

    const [input, setInput] = useState('')
    const [books, setBooks] = useState([])
    const inputChange = (e) => {
        const { name, value } = e.target;
        setInput(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input);
        axios.post('http://localhost:4004/addbook/search', input).then(function (res) {
            const bk = res.data.details
            console.log(bk);
            setBooks(bk)
        })
            .catch(function (error) {
                const message = error
                alert(message)
                console.log(error);
            });
    };
    useEffect(() => {
        // console.log(books);
    }, [books]);
    // console.log(books);
    return (<center>
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
                <div >
                    <form onSubmit={handleSubmit} >
                        <h3 style={{ marginTop: '-4%' }}>Search Author</h3>
                        <TextField id="outlined-basic" onChange={inputChange} label="Enter author" variant="outlined" style={{ width: "60%", backgroundColor: "#B9EDDD", color: '#2F4858' }} name="search" />
                        <Button type='Submit' variant="contained" style={{ borderRadius: "49% 30% 40% 100% / 100% 78% 49% 0%  ", backgroundColor: "#577D86", width: '114px', height: "60px", marginBottom: "20px", marginLeft: "20px", color: "#2F4858" }}>Search</Button>
                    </form>
                    {books.map((book) => (
                            <Grid item className='front' xs={3} style={{ backgroundColor: "#569DAA", margin: "2%",borderRadius:"30px" }}>
                                    <div  >
                                        <Typography style={{ width: "200px", boxShadow: "none", color: "#2F4858" }}>
                                            Bookname : &nbsp;
                                            {book.bookName}
                                        </Typography>
                                        <Typography style={{ width: "200px", boxShadow: "none", color: "#2F4858" }}>
                                            Author : &nbsp;
                                            {book.bookAuthor}
                                        </Typography>
                                        <Typography style={{ width: "200px", boxShadow: "none", color: "#2F4858" }}>
                                            Type :&nbsp;
                                            {book.bookType}
                                        </Typography>
                                        <Typography style={{ width: "200px", boxShadow: "none", color: "#2F4858" }}>
                                            Language :&nbsp;
                                            {book.bookLanguage}
                                        </Typography>
                                    </div>
                            </Grid >
                    ))}
                    <br />
                </div>
            </Container>
        </Paper>

    </center>
    )
}
