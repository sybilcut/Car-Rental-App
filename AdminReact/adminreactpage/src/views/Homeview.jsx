import React, {useState, useEffect, Text} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import moment from "moment";
import { dateTimePickerTabsClasses } from "@mui/x-date-pickers";

const bg = new URL("../images/bg.jpg",import.meta.url);


export let citySelection = [];
export let uniqueCity =[];

export let pickupday = [];
export let dropoffday = [];


function Homeview(props){
    

        return(
        
        <section className="container-fluid bgimage">

        <Box className="box"
         sx={{
            width: '77%',
            height: '98%',
            backgroundColor: '#eeeee4',
            borderRadius:'16px'
            
          }}>
            
            <h1 className="lol">Reserve a Vehicle</h1>

                
            <ul className="pp">
            
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: 'Pick Up', end: 'Drop off' }}
                >
                <DateRangePicker
                disablePast
                value={[1,1,1993]}
                onChange={ (newValue) => {
                props.setValue(newValue);
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
                <Button onClick={()=>{props.setCurrentTab('Homeview')}}> View Locations</Button>
            </div>

            
           
            
          </Box>
          
        
        
        </section>
        );
    

}


export {Homeview};