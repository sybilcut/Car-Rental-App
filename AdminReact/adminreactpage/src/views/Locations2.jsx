import React, {useState, useMemo, useEffect} from "react";
import {citySelection, uniqueCity} from "./Homeview";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import {branchlocation} from "./Locations";


 

 export let branchlocation2 = [];
 

function Locations2() {
    const navigate = useNavigate();

    const pp =[];
    const [branches, setBranches] = useState([]);
    const [latlong, setLatlong] = useState([]);
    

    useEffect(function(){
        axios.get("/api/branches/")
        .then(response => setBranches(response.data))
    },[]);

   
    let position = {lat:53.631611,lng:-113.323975}

    if (location ==="Edmonton"){
        position = {lat:53.631611,lng:-113.323975}
    }else if (location==="Calgary"){
        position = {lat:51.049999,lng:-114.066666}
    }

    const [location,setLocation] = useState([]);


   const loco = (e) =>{
        branchlocation2 = e.currentTarget.innerText
        branchlocation2 = branchlocation2.slice(branchlocation2.length - 6)
        branches.map((c)=>{ 
            if(c.PostalCode===branchlocation2){
                branchlocation2=c.StreetNumber+" "+c.StreetName+", "+c.City+", "+c.Province
            }
        })
        navigate('/cars');
   }

        

        function Map(){
        return (<></>
     );
    }  
    
        let cities = branches.map((b =>b.City));
      
        let uniqueCity = cities.filter((c,index)=>{
            return cities.indexOf(c)=== index;
        });

       
        

        return(
            <div>
            <section className="container-fluid locate">
                 <h1 align="left" >Choose a Drop off Location</h1>
                
                 <Autocomplete  
                    value= {location}
                    onChange={e => setLocation(e.target.innerText)}
                    sx={{  width: 800 }}
                    freeSolo
                    options={uniqueCity}
                    renderInput={(params) => <TextField {...params} label="Change City" />}
                    />
            </section>
            <section class="layout">
                <div class="sidebar">
            {branches.filter((item,index)=> item.City== location && item.PostalCode !=branchlocation.slice(branchlocation.length - 6) ).map((options) => 
                <Grid container >
                    <Grid>
                        <Card sx={{minWidth:200}}>
                        <CardContent>
                        <strong>{options.StreetNumber}</strong>&nbsp;<strong>{options.StreetName}</strong>
                        </CardContent>
                        <CardContent>
                        <Button size="small" onClick={loco}>{options.City}&nbsp;{options.Province}&nbsp;{options.PostalCode} </Button>
                        </CardContent>
                        
                        </Card>
                        <div>&nbsp;</div>
                    </Grid>
                    </Grid>
                )}
                </div>
                <div class="body">
                    <Map/>
                </div>


            </section>

            </div>
           
        
        );
    

};



export {Locations2};

