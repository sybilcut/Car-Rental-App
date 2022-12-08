import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Geocode from "react-geocode";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import moment from "moment";

const bg = new URL("../images/bg.jpg",import.meta.url);


export let citySelection = [];
export let uniqueCity =[];




export let pickupday = [];
export let dropoffday = [];

Geocode.setApiKey("AIzaSyAyWUbi0l3wS6UoF12UofGBI6-jz0RJM4k");
Geocode.setRegion("ca");


const Home =()=>{
    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);




    const nextUrl =(e) => {
        navigate('/locations');
    }
    

        
        
        const [value, setValue] = React.useState([" ", " "]);

        

        
        pickupday = value[0]
        dropoffday = value[1]
        
        

        return(
        
        <section className="container-fluid bgimage">

        <Box className="box"
         sx={{
            width: '77%',
            height: '98%',
            backgroundColor: '#eeeee4',
            borderRadius:'16px'
            
          }}>
            
            <text className="lol">Reserve a Vehicle</text>

                
            <ul className="pp">
            
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: 'Pick Up', end: 'Drop off' }}
                >
                <DateRangePicker
                disablePast
                value={value}
                onChange={ (newValue) => {
                setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
                 )}
                />
                </LocalizationProvider>
           
            </ul>
            <div>
                <Button onClick={nextUrl}> View Locations</Button>
            </div>

            
           
            
          </Box>
          
        
        
        </section>
        );
    

}


export default Home;