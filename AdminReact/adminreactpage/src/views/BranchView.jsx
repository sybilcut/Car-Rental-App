import React, {Component} from "react";
import Modal from "../components/Cmodal";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { withRouter } from "react-router";


class BranchView extends Component{
    
    branchID = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];


    state = {
        activeItem: {
            ID: "",
            Manufacturer: "",
            Model: "",
            FuelType: "",
            Colour: "",
            LicencePlate: "",
            Status: "",
            Mileage: "",
        },

        studList: []
    };

    refreshList = () => {axios.get("/api/cars/").then((res) => this.setState({ studList: res.data})).catch((err) => console.log(err));};

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    // componentDidMount() {
    //     this.refreshList;
    // }

    createItem = () => {
        const item = {ID: "",
        Manufacturer: "",
        Model: "",
        FuelType: "",
        Colour: "",
        LicencePlate: "",
        Status: "",
        Mileage: ""};
        this.setState({ activeItem: item, modal: !this.state.modal});
    };

    handleSubmit = (item) => {
        this.toggle();
        if (item.BranchID){
            axios.put('/api/cars/$(item.ID)/', item)
            .then((res) => this.refreshList());
            return;
        }

        axios.post("/api/cars/", item)
        .then((res) => this.refreshList());
    };





    deleteItem = (item) => {
        axios.delete("/api/cars/" + item.ID).then(this.refreshList).catch((err) => console.log(err));
        //this.setState({ activeItem: item, modal: !this.state.modaldel });
        
    };

    editCar = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal});
    };


    
    renderItems = () => {
        const newItems = this.state.studList;
        return ( (
            <main className="content" >
            <div>
                <button onClick={this.refreshList} className="btn btn-primary mr-2">Refresh List</button>
                <button onClick={this.createItem} className="btn btn-success mr-2">Add Car</button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>CarID</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>FuelType</th>
                        <th>Color</th>
                        <th>Plate Number</th>
                        <th>Status</th>
                        <th>Mileage</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {newItems.map((item) => {
                        return(
                            <tr>
                                <td>{item.ID}</td>
                                <td>{item.Manufacturer}</td>
                                <td>{item.Model}</td>
                                <td>{item.FuelType}</td>
                                <td>{item.Colour}</td>
                                <td>{item.LicencePlate  }</td>
                                <td>{item.Status}</td>
                                <td>{item.Mileage}</td>
                                <td><button onClick={ () => this.editCar(item)}>Update Car</button></td>
                                <td><button color="danger" onClick={ () => this.deleteItem(item)}>Delete Car</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </main>
        ) );
    };

    
    
    

    render(){
        const branchid = this.branchID
        return(
            //YOUR CODE HERE
            
            <main>
            <div>
                <h1>Branch ID: {this.branchID}</h1>
                <div></div>
                <button onClick={this.setID} className="btn btn-primary mr-2">Manage Branch {branchid} Cars</button>
                <button onClick={this.setID} className="btn btn-primary mr-2">Manage Branch {branchid} Transactions</button>
                <ul className="list-group list-group-flush">
                    {this.renderItems()}
                </ul>

                
            </div>
            {this.state.modal ? (
                <Modal activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
                />
            ) : null}
            </main>
            
        )
    }

}

export {BranchView};