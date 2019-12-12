import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';

const axios = require('axios');

function Main(props) {
    const [apod, setApod] = useState([]);
    var [date, setDate] = useState((new Date()).toISOString().split('T')[0]);
    var [dayCount, setDayCount] = useState(0);

    var today = (new Date()).toISOString().split('T')[0];
    var dayBefore = (new Date(Date.now() - (Math.abs(dayCount-1) * 86400000))).toISOString().split('T')[0];
    var dayAfter = (new Date(Date.now() - (Math.abs(dayCount+1) * 86400000))).toISOString().split('T')[0];
    var currentDate = date;
    var test = (new Date()).toString().split('T')[0];
    console.log(test);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=IxChViHyyrlKLnnbDRB8mQt16hd8f22mYI9TefeR&date=${date}`)
            .then(response => {
                const apods = response.data;
                setApod(apods);
            })
            .catch(error => {
                console.log("Broken ROboT!");
            })
    }, [date])
    if (!props) { 
        return <h3>Loading...</h3>;
    } else {
    return (
        <main>
            <Button color="primary" onClick={() => {setDate(dayBefore);setDayCount(--dayCount)}}>Previous Day</Button>
            <Button onClick={() => {setDate(today);setDayCount(0)}}>Today</Button>
            <Button onClick={() => {setDate(dayAfter);setDayCount(++dayCount)}} disabled={(today === currentDate) ? true : false} color={(today === currentDate) ? "secondary" : "primary"}>Next Day</Button>
            <h1>{apod.title}</h1>
            <img src={apod.url} alt={apod.title} style={{display: apod.media_type === 'image' ? 'block' : 'none'}} />
            <iframe src={apod.url} title={apod.title} style={{display: apod.media_type === 'video' ? 'block' : 'none'}}></iframe>
            <p>Date: {apod.date}</p>
            <p>{apod.explanation}</p>
        </main>
    );
    }
}



export default Main;