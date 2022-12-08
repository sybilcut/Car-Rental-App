import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Homeview from '../views/Homeview';
import Cars from '../views/Cars';
import Locations from '../views/Locations';
import Admin from '../views/Admin';
import Allcars from '../views/Allcars';
import Locations2 from '../views/Locations2';
import Checkout from '../views/Checkout';
import Branches from '../views/Branches';
import BranchView from '../views/BranchView';

export default class Navibar extends Component {
    
    render() {
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
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                                <Nav.Link as={Link} to="/cars">Cars</Nav.Link>
                               
                               <Nav.Item  className="ms-auto" >
                                <NavDropdown align='end' title="Login" id="navbarScrollingDropdown" >
                                    <NavDropdown.Item  as={Link} to="/">Customer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>
                                </NavDropdown>
                                </Nav.Item>
                                

                            </Nav>
                            
                                
                            

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route exact path="/cars" element={<Cars/>}/>
                            
                    
                        <Route exact path="/locations" element={<Locations/>}/>
                           
                        
                        <Route exact path="/locations2" element={<Locations2/>}/>

                        <Route exact path="/" element={<Homeview/>}/>

                        <Route exact path="/admin" element={<Admin/>}/>

                        <Route exact path="/allcars" element={<Allcars/>}/>

                        <Route exact path="/checkout" element={<Checkout/>}/>
                        <Route exact path="/Branches" element={<Branches/>}/>
                        <Route exact path="/Branches/:BranchID" element={<BranchView/>}/> 
                        
                    </Routes>
                </div>
            </Router>
        )
    }
}
