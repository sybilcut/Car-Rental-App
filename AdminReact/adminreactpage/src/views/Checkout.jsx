import { Component } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Modalr from "../components/Modalr";
import Box from '@mui/material/Box';
import {pickupday,dropoffday} from "./Homeview";
import {loco2,branchaddress,locatecheck, branchlocation} from "./Locations";
import {branchlocation2} from "./Locations2";
import {totalPrice, rentedcar,licence} from "./Allcars";
import {useNavigate} from "react-router-dom";

function Checkout(props){
    
    const state = {
        activeItem: {
          ID: "",
          FirstName: "",
          LastName:"",
          DriversLicense:"",
          Email: "",
          Customer_Phone:"",
          DOB:"",
          GoldMember:"",
          Province:"",
          City:"",
          PostalCode:"",
          StreetNumber:"",
          StreetName:"",
          UnitNumber:"",
        },
        //a blank list where the entries from the database will be stored into later
        custList: []
      };


      const refreshList = () => {
        axios
        
          .get("/api/customers/")
         
          .then((res) => state.custList({ custList: res.data }))
   
          .catch((err) => console.log(err));
          
      };

      const toggle = () => {
        /*this.setState({ modal: !state.modal });*/
      };
      
      const returntoggle = () => {
        /*this.setState({ modalr: !state.modalr });*/
      };

      // NEEDS FIXING
      const handleSubmit = (item) => {
      axios
          .post("/api/customers/", item)
          .then((res) => this.refreshList());
      this.refreshList();

      }
      
      const handleReturnSubmit = (item) => {
        this.returntoggle();
        let c;
        
        const customerz = this.state.custList
        let vars = {DateFrom:pickupday.format('YYYY-MM-DD'), DateTo: dropoffday.format('YYYY-MM-DD'), DateReturned:'1990-01-01',TotalCost:totalPrice,LicensePlate:licence ,GoldMember:false, Customerid:c.ID, basis: "weekly"}
        customerz.map((c)=>{ 
          if(c.DriversLicense===item.DriversLicense){
            let customeRid = c.ID
            
            fetch(`/api/rentals/?branch=${vars.branchID}&car=${vars.carID}&license=${vars.LicensePlate}&datefrom=${vars.DateFrom}&dateto=${vars.DateTo}&basis=${vars.basis}`)
            props.setCurrentTab("Homeview")
          }
        })
        
        
      };

      
      

      const createItem = () => {
        const item = {ID: "", FirstName: "", LastName:"", DriversLicense:"", Email: "", Customer_Phone:"", DOB:"", GoldMember:"false", Province:"", City:"", PostalCode:"", StreetNumber:"", StreetName:"", UnitNumber:"" };
        /*this.setState({ activeItem: item, modal: !this.state.modal });*/
      };

      const createReturnItem = () => {
        const item = {ID: "", FirstName: "", LastName:"", DriversLicense:"", Email: "", Customer_Phone:"", DOB:"", GoldMember:"false", Province:"", City:"", PostalCode:"", StreetNumber:"", StreetName:"", UnitNumber:"" };
        /*this.setState({ activeItem: item, modalr: !this.state.modalr });*/
      };


      const postData = () =>{

      }

        return(
          
          <div>
            <section className="container-fluid allcarsheader">
                <h1 align="left">Checkout</h1>
            </section >
          <Box className="box"
         sx={{
            width: '77%',
            height: '98%',
            backgroundColor: '#eeeee4',
            borderRadius:'16px'
            
          }}>
            
            <p className="lol">Order Details</p>*/
            
            <button onClick={()=>{this.createItem()}} className="btn btn-success mr-2">New Customer</button>
            <button onClick={()=>{this.createReturnItem()}} className="btn btn-success mr-2">Returning Customer</button>
            <p className="r">Pick up date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pickupday.toString()}</p><br></br>
            <p className="r">Drop off date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dropoffday.toString()}</p><br></br>
            <p className="r">Pick up Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{branchaddress}</p><br></br>
            <p className="t">Drop off Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{branchlocation2}</p><br></br>
            <p className="l">Total Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPrice}</p><br></br>
            <p className="l">Vehicle:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rentedcar}</p>
            
            {this.state.modal ? (
          
          <Modal
            activeItem={state.activeItem}
            
            toggle={toggle}
            
            onSave={handleSubmit}
          />
        ): null}

        {this.state.modalr ? (
          
          <Modalr
         
            activeItem={state.activeItem}
         
            toggle={returntoggle}
            
            onSave={handleReturnSubmit}
          />
        ): null}
        
          </Box>
            </div>
          
        )
     }
  

export {Checkout};