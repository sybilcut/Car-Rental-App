import React, {useState,  useEffect} from "react";
import {cartype} from "./Cars";
import {branchaddress, branchlocation,locatecheck} from "./Locations";
import {pickupday,dropoffday} from "./Homeview";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from "react-router-dom";
import {branchlocation2} from "./Locations2";

export let totalPrice = [];
export let rentedcar = [];
export let listofcars = [];
export let licence = [];
function Allcars (){
    let prices=[];
    
    const navigate = useNavigate();
    
    const fltype = ["Gas","Diesel"];

    function valuetext(value) {
        return {value};
      }

    const [branches, setBranches] = useState([]);
    const [carrs, setCarrs] = useState([]);
    const [fuell,setFuell] = useState([]);
    const [kia,setKia]=useState();
    const [toyo,setToyo]=useState();
    const [ford,setFord]=useState();
    const [dodge,setDodge]=useState();
    const [chevy,setChevy]=useState();
    const [cadillac,setCadillac]=useState();
    const [type,setType] = useState([]);
    const [r,setR]=useState();
    let branchid = [];

   
    
    

    useEffect(function(){
        axios.get("/api/branches/")
        .then(response => setBranches(response.data))


        axios.get("/api/cars/")
        .then(response => setCarrs(response.data))

        axios.get("/api/cartypes/")
        .then(response => setType(response.data))
    },[]);

    
   const onCheckout = e=>{
     licence= e.currentTarget.value;
     carrs.map((c)=>{ 
        if(c.LicencePlate===e.currentTarget.value){
          rentedcar = c.Manufacturer+" "+c.Model
        }
      })

     navigate("/checkout");
   }

    const handleChange = e => {
      setKia(e.target.checked);
      
    };

    const handleToyota = e => {
        setToyo(e.target.checked);
        
      };
    const handleFord = e => {
        setFord(e.target.checked);
        
      };
    const handleDodge= e => {
        setDodge(e.target.checked);
        
      };
      const handleChevy = e => {
        setChevy(e.target.checked);
        
      };
      const handleCadillac = e => {
        setCadillac(e.target.checked);
        
      }; 

       
   
        let d1 = new Date(pickupday);
        let d2 = new Date(dropoffday);
        let diff = d2.getTime()-d1.getTime();
        let finaldiff = diff/(1000*60*60*24);

        if (cartype === "Cars"){
            
        if (finaldiff>=30){
           if(finaldiff%30==0){
                prices=(finaldiff/3)*type.filter((item,index)=> item.Description==="Cars").map((t=>t.MonthlyCost))
           }else{
            let r30 = (finaldiff%30)
            prices= ((finaldiff - r30)/30)*type.filter((item,index)=> item.Description==="Cars").map((t=>t.MonthlyCost))
            let r7 = (r30%7) 
            prices = prices + ((r30-r7)/7)*type.filter((item,index)=> item.Description==="Cars").map((t=>t.WeeklyCost))
            prices =prices + (r7*type.filter((item,index)=> item.Description==="Cars").map((t=>t.DailyCost)))
           }
        } else if (finaldiff<30&& finaldiff>=7){
            
            let r7 = (finaldiff%7) 
            prices = ((finaldiff-r7)/7)*type.filter((item,index)=> item.Description==="Cars").map((t=>t.WeeklyCost))
            prices =prices + (r7*type.filter((item,index)=> item.Description==="Cars").map((t=>t.DailyCost)))
        } else{
            let r = (finaldiff%7)
            prices = (r*type.filter((item,index)=> item.Description==="Cars").map((t=>t.DailyCost)))
        }
    }else if (cartype === "SUVs"){
        if (finaldiff>=30){
            if(finaldiff%30==0){
                 prices=(finaldiff/3)*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.MonthlyCost))
            }else{
             let r30 = (finaldiff%30)
             prices= ((finaldiff - r30)/30)*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.MonthlyCost))
             let r7 = (r30%7) 
             prices = prices + ((r30-r7)/7)*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.DailyCost)))
            }
         } else if (finaldiff<30&& finaldiff>=7){
             
             let r7 = (finaldiff%7) 
             prices = ((finaldiff-r7)/7)*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.DailyCost)))
         } else{
             let r = (finaldiff%7)
             prices = (r*type.filter((item,index)=> item.Description==="SUVs").map((t=>t.DailyCost)))
             
         }
    }else if (cartype==="Trucks"){

        if (finaldiff>=30){
            if(finaldiff%30==0){
                 prices=(finaldiff/3)*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.MonthlyCost))
            }else{
             let r30 = (finaldiff%30)
             prices= ((finaldiff - r30)/30)*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.MonthlyCost))
             let r7 = (r30%7) 
             prices = prices + ((r30-r7)/7)*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.DailyCost)))
            }
         } else if (finaldiff<30&& finaldiff>=7){
             
             let r7 = (finaldiff%7) 
             prices = ((finaldiff-r7)/7)*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.DailyCost)))
         } else{
             let r = (finaldiff%7)
             prices = (r*type.filter((item,index)=> item.Description==="Trucks").map((t=>t.DailyCost)))
         }

    }else if (cartype==="Vans"){
        if (finaldiff>=30){
            if(finaldiff%30==0){
                 prices=(finaldiff/3)*type.filter((item,index)=> item.Description==="Vans").map((t=>t.MonthlyCost))
            }else{
             let r30 = (finaldiff%30)
             prices= ((finaldiff - r30)/30)*type.filter((item,index)=> item.Description==="Vans").map((t=>t.MonthlyCost))
             let r7 = (r30%7) 
             prices = prices + ((r30-r7)/7)*type.filter((item,index)=> item.Description==="Vans").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Vans").map((t=>t.DailyCost)))
            }
         } else if (finaldiff<30&& finaldiff>=7){
             
             let r7 = (finaldiff%7) 
             prices = ((finaldiff-r7)/7)*type.filter((item,index)=> item.Description==="Vans").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Vans").map((t=>t.DailyCost)))
         } else{
             let r = (finaldiff%7)
             prices = (r*type.filter((item,index)=> item.Description==="Vans").map((t=>t.DailyCost)))
         }


    }else if(cartype==="Luxury"){
        if (finaldiff>=30){
            if(finaldiff%30==0){
                 prices=(finaldiff/3)*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.MonthlyCost))
            }else{
             let r30 = (finaldiff%30)
             prices= ((finaldiff - r30)/30)*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.MonthlyCost))
             let r7 = (r30%7) 
             prices = prices + ((r30-r7)/7)*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.DailyCost)))
            }
         } else if (finaldiff<30&& finaldiff>=7){
             
             let r7 = (finaldiff%7) 
             prices = ((finaldiff-r7)/7)*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.WeeklyCost))
             prices =prices + (r7*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.DailyCost)))
         } else{
             let r = (finaldiff%7)
             prices = (r*type.filter((item,index)=> item.Description==="Luxury").map((t=>t.DailyCost)))
         }


    }
        totalPrice = prices;
        
        function Displaycars(){
            
            
            if(cartype==="Cars"){
                branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                
                return(
                    <div>
                        {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model ==="Forte"||i.Status===branchid.toString() && i.Model==="Camry" ).map((cc) => 

                        <Card sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent >
                        <Typography component="div" variant="h5" align="left">
                            {cc.Manufacturer}&nbsp;{cc.Model}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                        4-5 People  
                        </Typography>
                        <Typography variant="body2" align="left">
                        Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                        
                        
                        </CardContent>
                        <Button value={cc.LicencePlate} onClick={onCheckout} variant="carsbut" >Check Out</Button>
                        </Box>
                        <CardMedia
                        component="img"
                        sx={{ width: 300 }}
                        image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/CHEV_MALI_2016.png"
                        alt="Cars"
  
                            />
                             <Typography component="div" variant="h4" align="right">
                             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                             </Typography>
                        </Card>


                         )}
                    </div>
                    )
            } else if( cartype ==="SUVs"){
                if (toyo ==true){
                    branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                    return(
                        <div>
                            {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model==="RAV4" ).map((cc) => 
    
                            <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent >
                            <Typography component="div" variant="h5" align="left">
                                {cc.Manufacturer}&nbsp;{cc.Model}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                            4-5 People  
                            </Typography>
                            <Typography variant="body2" align="left">
                            Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                            
                            
                            </CardContent>
                            <Button value={cc.LicensePlate} onClick={onCheckout}variant="carsbut" >Check Out</Button>
                            </Box>
                            <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/CHEV_MALI_2016.png"
                            alt="Cars"
      
                                />
                                 <Typography component="div" variant="h4" align="right">
                                 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                                 </Typography>
                            </Card>
    
    
                             )}
                        </div>
                    )
    
                }     if (ford ==true){
                    branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                    return(
                        <div>
                            {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model==="Edge" ).map((cc) => 
    
                            <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent >
                            <Typography component="div" variant="h5" align="left">
                                {cc.Manufacturer}&nbsp;{cc.Model}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                            4-5 People  
                            </Typography>
                            <Typography variant="body2" align="left">
                            Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                            
                            
                            </CardContent>
                            <Button value={cc.LicensePlate} onClick={onCheckout}variant="carsbut" >Check Out</Button>
                            </Box>
                            <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/CHEV_MALI_2016.png"
                            alt="Cars"
      
                                />
                                 <Typography component="div" variant="h4" align="right">
                                 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                                 </Typography>
                            </Card>
    
    
                             )}
                        </div>
                    )
    
                }     
                
                branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                return(
                    <div>
                    {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model ==="RAV4"||i.Status===branchid.toString() && i.Model==="Edge" ).map((cc) => 

                    <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent >
                    <Typography component="div" variant="h5" align="left">
                        {cc.Manufacturer}&nbsp;{cc.Model}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                        4-7 People
                    </Typography>
                    <Typography variant="body2" align="left">
                    Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    
                    
                    </CardContent>
                    <Button value={cc.LicensePlate} onClick={onCheckout}variant="SUVsbut" >Check Out</Button>
                    </Box>
                    <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image="https://www.enterprise.ca/content/dam/global-vehicle-images/suvs/HYUN_SANT_FE_2013.png"
                    alt="SUVs"
                    

                        />

                            <Typography component="div" variant="h4" align="right">
                             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                             </Typography>
                            
                    </Card>


                     )}
                </div>
                        

                
                )
            
            }else if (cartype === "Trucks"){
                branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                return(
                    
                    <div>
                    {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model ==="F150"||i.Status===branchid.toString() && i.Model==="Colorado" ).map((cc) => 

                    <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent >
                    <Typography component="div" variant="h5" align="left">
                        {cc.Manufacturer}&nbsp;{cc.Model}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                        4-7 People
                    </Typography>
                    <Typography variant="body2" align="left">
                    Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    
                    
                    </CardContent>
                    <Button value={cc.LicensePlate} onClick={onCheckout}variant="Truucksbut" >Check Out</Button>
                    </Box>
                    <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image="https://www.enterprise.ca/content/dam/global-vehicle-images/trucks/FORD_F150_2018.png"
                    alt="Trucks"

                        />
                         <Typography component="div" variant="h4" align="right">
                             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                             </Typography>
                    </Card>


                     )}
                </div>


                    )
            } else if (cartype === "Vans"){
                branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);

                return(
                    
                    <div>
                    {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model ==="Grand Caravan"||i.Status===branchid.toString() && i.Model==="Sienna" ).map((cc) => 

                    <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent >
                    <Typography component="div" variant="h5" align="left">
                        {cc.Manufacturer}&nbsp;{cc.Model}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                        4-7 People
                    </Typography>
                    <Typography variant="body2" align="left">
                    Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    
                    
                    </CardContent>
                    <Button value={cc.LicensePlate} onClick={onCheckout}variant="Vansbut" >Check Out</Button>
                    </Box>
                    <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image="https://www.enterprise.ca/content/dam/global-vehicle-images/vans/DODG_GRAN_CARA_2013.png"
                    alt="Vans"

                        />

                            <Typography component="div" variant="h4" align="right">
                             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                             </Typography>
                    </Card>


                     )}
                </div>



                    )
            }else {
                branchid = branches.filter((item,index)=> item.PostalCode== branchlocation.slice(branchlocation.length - 6)).map((options) => options.BranchID);
                return(
                    

                    <div>
                    {carrs.filter((i,index)=> i.Status===branchid.toString() && i.Model ==="CTS" ).map((cc) => 

                    <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent >
                    <Typography component="div" variant="h5" align="left">
                        {cc.Manufacturer}&nbsp;{cc.Model}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                        4-7 People
                    </Typography>
                    <Typography variant="body2" align="left">
                    Fuel Type: {cc.FuelType}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Mileage: {cc.Mileage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    
                    
                    </CardContent>
                    <Button value={cc.LicensePlate} onClick={onCheckout}variant="Luxurybut" >Check Out</Button>
                    </Box>
                    <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/2019-cadillac-cts-luxury-sedan-angular-front.png"
                    alt="Luxury"

                        />
                         <Typography component="div" variant="h4" align="right">
                             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;${prices}
                             </Typography>
                    </Card>


                     )}
                </div>

                )
            }
            
        }


        return(
            


        <div>
            <section className="container-fluid allcarsheader">
                <h1 align="left">Choose a Vehicle</h1>
            </section >
            <section class="layoutcars">
                <div class="filterbar">
                <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardContent >
          <Typography component="div" variant="h6" align="left">
            Filters:
          </Typography>
          
          
            <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Manufacturer
            </Typography>
            <FormGroup>
             <FormControlLabel control={<Checkbox  onChange={handleChange}/>} label="Kia" />
             <FormControlLabel control={<Checkbox  onChange={handleToyota}/>} label="Toyota" />
             <FormControlLabel control={<Checkbox  onChange={handleFord}/>} label="Ford" />
             <FormControlLabel control={<Checkbox  onChange={handleDodge}/>} label="Dodge" />
             <FormControlLabel control={<Checkbox  onChange={handleChevy}/>} label="Chevy" />
             <FormControlLabel control={<Checkbox  onChange={handleCadillac}/>} label="Cadillac" />
            </FormGroup>
            <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            Fuel Type
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={fltype}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Fuel" />}
            />
          
        </CardContent>
        
            </Box>
            </Card>
                </div>
                <div class="allcars">
                    <Displaycars/>
                </div>
            </section>
        </div>
        )
    

}


export default Allcars;