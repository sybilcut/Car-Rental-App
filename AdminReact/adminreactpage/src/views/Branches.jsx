import React, {Component} from "react";
import Modal from "../components/Branch";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {Link} from 'react-router-dom';

var storeItem = [{BranchID: "",
    PhoneNumber: "",
    Province: "",
    City: "",
    PostalCode: "",
    StreetNumber: "",
    StreetName: "",
    UnitNumber: ""}];

class Branches extends Component{
    state = {
        activeItem: {
            BranchID: "",
            PhoneNumber: "",
            Province: "",
            City: "",
            PostalCode: "",
            StreetNumber: "",
            StreetName: "",
            UnitNumber: "",
        },

        studList: []
    };

    

    storeName = (item) => {
        storeItem[0] = item;
    };


    refreshList = () => {axios.get("/api/branches/").then((res) => this.setState({ studList: res.data})).catch((err) => console.log(err));};

    // componentDidMount() {
    //     this.refreshList;
    // }

    createItem = () => {
        const item = {BranchID: "",
        PhoneNumber: "",
        Province: "",
        City: "",
        PostalCode: "",
        StreetNumber: "",
        StreetName: "",
        UnitNumber: ""};
        this.setState({ activeItem: item, modal: !this.state.modal});
    };

    deleteItem = (item) => {
        axios.delete("/api/branches/" + item.BranchID).then(this.refreshList).catch((err) => console.log(err));
        //this.setState({ activeItem: item, modal: !this.state.modaldel });
        
    };

    

    //YOUR CODE HERE
    branchClick(){
        alert("clicked");
        
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
        this.toggle();
        if (item.BranchID){
            axios.put('/api/branches/$(item.BranchID)/', item)
            .then((res) => this.refreshList());
            return;
        }

        axios.post("/api/branches/", item)
        .then((res) => this.refreshList());
    };

    

    renderItems = () => {
        const newItems = this.state.studList;
        return ( (
            <main className="content" >
            <div>
                <button onClick={this.refreshList} className="btn btn-primary mr-2">Refresh List</button>
                <button onClick={this.createItem} className="btn btn-success mr-2">Add Branch</button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Phone Number</th>
                        <th>Province</th>
                        <th>City</th>
                        <th>Postal Code</th>
                        <th>Street Name</th>
                        <th>Street Number</th>
                        <th>Unit Number</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {newItems.map((item) => {
                        return(
                            <tr>
                                <td>{item.BranchID}</td>
                                <td>{item.PhoneNumber}</td>
                                <td>{item.Province}</td>
                                <td>{item.City}</td>
                                <td>{item.PostalCode}</td>
                                <td>{item.StreetName}</td>
                                <td>{item.StreetNumber}</td>
                                <td>{item.UnitNumber}</td>
                                <td><a href={'/Branches/'+item.BranchID}><button onClick={ () => this.storeName(item)}>Manage Branch</button></a></td>
                                <td><button color="danger" onClick={ () => this.deleteItem(item)}>Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </main>
        ) );
    };

    render(){
        return(
            //YOUR CODE HERE
            <main>
            <div>
                <h1>Branches</h1>
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

export { Branches};