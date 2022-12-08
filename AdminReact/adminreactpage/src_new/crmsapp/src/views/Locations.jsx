import React, {useState, useMemo, useEffect} from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import {citySelection, uniqueCity} from "./Homeview";
import Geocode from "react-geocode";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { FcInfo } from "react-icons/fc";


Geocode.setApiKey("AIzaSyAyWUbi0l3wS6UoF12UofGBI6-jz0RJM4k");

 

 export let branchlocation = [];
 export let loco2 = "";
 export let branchaddress=[];
 export let locatecheck="";

function Locations() {
    const navigate = useNavigate();
    const {} = useLoadScript({googleMapsApiKey: "AIzaSyAyWUbi0l3wS6UoF12UofGBI6-jz0RJM4k"});

   
    const [branches, setBranches] = useState([]);
    
    let position = {lat:53.631611,lng:-113.323975}
    
    

    useEffect(function(){
        axios.get("/api/branches/")
        .then(response => setBranches(response.data))
    },[]);

   
    const cityy = (e) =>{
        console.log(e.target.innerText)
    }
    

    const [location,setLocation] = useState([]);
    const [checked,setChecked] = useState("false");
   

   const loco = (e) =>{
        branchlocation = e.currentTarget.innerText
        branchaddress= branchlocation.slice(branchlocation.length - 6)
        branches.map((c)=>{ 
            if(c.PostalCode===branchaddress){
                branchaddress=c.StreetNumber+" "+c.StreetName+", "+c.City+", "+c.Province
            }
        })
        if (checked ==="false"){

            navigate('/cars');
            

        }else{
            navigate('/locations2'); 
            loco2 =checked;
        }
        
   }

    const loco2 =(e) => {
        setChecked(e.target.checked);
        
    }

    if (location ==="Edmonton"){
        position = {lat:53.631611,lng:-113.323975}
    }else if (location==="Calgary"){
        position = {lat:51.049999,lng:-114.066666}
    }


  


     function Map(){
        return (<GoogleMap
        zoom={7} 
        center={position}
        mapContainerClassName="map-container" 
        >
         
        
        <MarkerF position={position}></MarkerF>
    
        </GoogleMap>
        );
     }  
    
        let cities = branches.map((b =>b.City));
      
        let uniqueCity = cities.filter((c,index)=>{
            return cities.indexOf(c)=== index;
        });

       
        

        return(
            <div>
            <section className="container-fluid locate">
                 <h1 align="left" >Choose a Location</h1>
                
                 <Autocomplete  
                    value= {location}
                    onChange={e => setLocation(e.target.innerText) }
                    sx={{  width: 800 }}
                    freeSolo
                    options={uniqueCity}
                    renderInput={(params) => <TextField {...params} label="Change City" />}
                    />
                    <div align="left">
                 <FormControlLabel control={<Checkbox  onChange={loco2}/>} label="Return to a Different Location" /> 
                 <Tooltip title="Additional Fee will be Added" arrow> 
                 <Button size="large"><FcInfo/></Button>
                 </Tooltip>
                    </div>
            </section>
            <section class="layout">
                <div class="sidebar">
            {branches.filter((item,index)=> item.City== location).map((options) => 
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



export default Locations;

