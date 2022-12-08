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

export let customeRid = [];
class Checkout extends Component{
    state = {
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

      

      componentDidMount() {
        this.refreshList();
      }

      refreshList = () => {
        axios
        
          .get("/api/customers/")
         
          .then((res) => this.setState({ custList: res.data }))
   
          .catch((err) => console.log(err));
          
      };

      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      
      returntoggle = () => {
        this.setState({ modalr: !this.state.modalr });
      };

      // NEEDS FIXING
      handleSubmit = (item) => {
      this.refreshList()
        this.toggle();
        
        axios
          .post("/api/customers/", item)
          .then((res) => this.refreshList());

      this.refreshList();

    

        
      }
      
      


      handleReturnSubmit = (item) => {
        const navigate = useNavigate();
        this.returntoggle();
        
        const customerz = this.state.custList
        customerz.map((c)=>{ 
          if(c.DriversLicense===item.DriversLicense){
            customeRid = c.ID
            
            axios
            .post("/api/rentals/", {DateFrom:pickupday.format('YYYY-MM-DD'), DateTo: dropoffday.format('YYYY-MM-DD'), DateReturned:"1990-01-01",TotalCost:totalPrice,LicensePlate:licence ,GoldMember:false, Customerid:c.ID})
            .then((res) => this.refreshList());
            navigate("/")
          }
        })
        
        
      };

      
      

      createItem = () => {
        const item = {ID: "", FirstName: "", LastName:"", DriversLicense:"", Email: "", Customer_Phone:"", DOB:"", GoldMember:"false", Province:"", City:"", PostalCode:"", StreetNumber:"", StreetName:"", UnitNumber:"" };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };

      createReturnItem = () => {
        const item = {ID: "", FirstName: "", LastName:"", DriversLicense:"", Email: "", Customer_Phone:"", DOB:"", GoldMember:"false", Province:"", City:"", PostalCode:"", StreetNumber:"", StreetName:"", UnitNumber:"" };
        this.setState({ activeItem: item, modalr: !this.state.modalr });
      };


      postData = () =>{

      }

    render(){
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
            
            <text className="lol">Order Details</text>
            
            <button onClick={this.createItem} className="btn btn-success mr-2">New Customer</button>
            <button onClick={this.createReturnItem} className="btn btn-success mr-2">Returning Customer</button>
            <text className="r">Pick up date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pickupday.toString()}</text><br></br>
            <text className="r">Drop off date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dropoffday.toString()}</text><br></br>
            <text className="r">Pick up Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{branchaddress}</text><br></br>
            <text className="t">Drop off Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{branchlocation2}</text><br></br>
            <text className="l">Total Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPrice}</text><br></br>
            <text className="l">Vehicle:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rentedcar}</text>
            
            {this.state.modal ? (
          
          <Modal
            activeItem={this.state.activeItem}
            
            toggle={this.toggle}
            
            onSave={this.handleSubmit}
          />
        ): null}

        {this.state.modalr ? (
          
          <Modalr
         
            activeItem={this.state.activeItem}
         
            toggle={this.returntoggle}
            
            onSave={this.handleReturnSubmit}
          />
        ): null}
        
          </Box>
            </div>
          
        )
     }
  }

export default Checkout;