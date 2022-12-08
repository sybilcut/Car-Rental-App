import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {Homeview} from '../views/Homeview.jsx';
import {Cars} from '../views/Cars.jsx';
import {Locations} from '../views/Locations.jsx';
import {Admin} from '../views/Admin.jsx';
import {Allcars} from '../views/Allcars.jsx';
import {Locations2} from '../views/Locations2.jsx';
import {Checkout} from '../views/Checkout.jsx';
import {Branches} from '../views/Branches.jsx';
import {BranchView} from '../views/BranchView.jsx';

export default function Navibar(props){
    
    return (
            <Router>
                <div>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Brand href="#">Car Rental</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse className="navbarScroll">
                            <Nav
                                className="justif-content-end"
                                style={{ width: '100%'}}
                                navbarScroll
                            >   
                               <Button onClick={()=>props.setCurrentTab('Homeview')}>Home</Button>
                               <Button onClick={()=>props.setCurrentTab('Cars')}>Browse Cars</Button>
                               <Button onClick={()=>props.setCurrentTab('Checkout')}>Rent a Car</Button>
                               
                               <Nav.Item  className="ms-auto" >
                                <NavDropdown align='end' title="Change View" id="navbarScrollingDropdown" >
                                <Button onClick={()=>props.setCurrentTab('Homeview')}>Customer</Button>
                                <Button onClick={()=>props.setCurrentTab('Admin')}>Admin</Button>
                                </NavDropdown>
                                </Nav.Item>
                                

                            </Nav>
                            
                                
                            

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    {/*<Routes>
                        <Route exact path="/cars" element={<Cars/>}/>
                            
                    
                        <Route exact path="/locations" element={<Locations/>}/>
                           
                        
                        <Route exact path="/locations2" element={<Locations2/>}/>

                        <Route exact path="/" element={<Homeview />}/>

                        <Route exact path="/admin" element={<Admin/>}/>

                        <Route exact path="/allcars" element={<Allcars/>}/>

                        <Route exact path="/checkout" element={<Checkout/>}/>
                        <Route exact path="/Branches" element={<Branches/>}/>
                        <Route exact path="/Branches/:BranchID" element={<BranchView/>}/> 
                        
    </Routes>*/}
                </div>
            </Router>
        )
}
