import React, {Component} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useNavigate} from "react-router-dom";

export let cartype = [];


function Cars (props){    

    const allCars =  (e) => {
        cartype = e.currentTarget.value;
        props.setCurrentTab('/allcars');
        console.log(e.currentTarget.value)
       
    }
    
        return(
            <div>
         <section className="container-fluid carshead">
            <h1 align="left" >All Rental Vehicles</h1>
         </section >
         <section className="layout1">
            <div className="Cars">
            <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Typography component="div" variant="h5" align="left">
            Cars
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            4-5 People
          </Typography>
          <Typography variant="body2" align="left">
          These sporty compact cars are great for the whole family, with 4 doors, 3-rear seats, room for 4 passengers, and 
          trunk space for at least 3 pieces of luggage.  The small-size Hyundai has a spacious interior, ABS and airbag safety features, and is one of our best small compact cars.
        </Typography>
          <Button value="Cars" variant="carsbut" onClick={allCars}>View All</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/CHEV_MALI_2016.png"
        alt="Cars"
        
      />
    </Card>

            </div>


            <div className="SUVs">

            <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Typography component="div" variant="h5" align="left">
            SUVs
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            4-7 People
          </Typography>
          <Typography variant="body2" align="left">
          A perfect sports utility vehicle for visitors wanting to explore the country while saving on the cost of fuel. 
          The midsize, 4-door SUV has a seating capacity for up to 7, luggage room for 3 suitcases, and plenty of power to navigate mountainous territory.
          </Typography>

          <Button value="SUVs" variant="suvsbut" onClick={allCars}>View All</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://www.enterprise.ca/content/dam/global-vehicle-images/suvs/HYUN_SANT_FE_2013.png"
        alt="Suvs"
        
      />
    </Card>
            </div>



            <div className="Trucks">

                
            <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Typography component="div" variant="h5" align="left">
            Trucks
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            4-5 People
          </Typography>
          <Typography variant="body2" align="left">
          Perfect work vehicles to meet your business and off-road needs. 
          These high ranking, full-size trucks combine power, efficiency, and convenience perfect for any diverse terrain.

          </Typography>
          
          <Button value="Trucks" variant="trucksbut" onClick={allCars}>View All</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://www.enterprise.ca/content/dam/global-vehicle-images/trucks/FORD_F150_2018.png"
        alt="Trucks"
        
      />
    </Card>

            </div>
            <div className="Vans">


            <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Typography component="div" variant="h5" align="left">
            Vans
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            2-7 People
          </Typography>
          <Typography variant="body2" align="left">
          Perfect for bigger groups while comfortably seating up to 7 passengers with 7 luggage and 4 doors. 
          Enjoy wheelchair access, left and right sliding doors, cruise control, and high-end safety features
          </Typography>
          <Button variant="vanssbut" value="Vans" onClick={allCars}>View All</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://www.enterprise.ca/content/dam/global-vehicle-images/vans/DODG_GRAN_CARA_2013.png"
        alt="Vans"
                />
            </Card>

            </div>
            <div className="Luxury">

            <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Typography component="div" variant="h5" align="left">
            Luxury
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            2-8 People
          </Typography>
          <Typography variant="body2" align="left">
          Looking for an upscale driving experience? Our luxury rental cars have plenty of power, modern technology, 
          and creature comforts, making them perfect for business travel or long trips.
          </Typography>
          <Button variant="luxurybut" value="Luxury" onClick={allCars}>View All</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://www.enterprise.ca/content/dam/global-vehicle-images/cars/2019-cadillac-cts-luxury-sedan-angular-front.png"
        alt="Luxury"
                />
            </Card>






            </div>
         </section>
        </div>


        );
    

};


export {Cars};