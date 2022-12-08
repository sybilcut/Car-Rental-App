import React, { Component } from "react";
//import the components that we will need for the page
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";


export default class CustomModal extends Component {
    //setup that we started back in App.js. allows the page to render correctly
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    //handles any changes to the values that could occur
    handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
        console.log(this.state);
    };
    //renders the visuals of the popup box.
    render() {
        //pass in the toggle and onSave values from App.js
        const { toggle, onSave } = this.props;
        return (
            //opens the window and sets the appropriate toggle
            //then the Title is added in
            //Next the Form Group creates the headers, input fields, and background text for name and email.
            //at the bottom the Save button is rendered inside of the footer
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Car</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="Manufacturer">Manufacturer</Label>
                            <Input
                              type="text"
                              name="Manufacturer"
                              value={this.state.activeItem.Manufacturer}
                              onChange={this.handleChange}
                              placeholder="Enter Manufacturer"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Model">Model</Label>
                            <Input 
                              type="text"
                              name="Model"
                              value={this.state.activeItem.Model}
                              onChange={this.handleChange}
                              placeholder="Enter Model"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="FuelType">Fuel Type</Label>
                            <Input 
                              type="text"
                              name="FuelType"
                              value={this.state.activeItem.FuelType}
                              onChange={this.handleChange}
                              placeholder="Enter Fuel Type"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Colour">Colour</Label>
                            <Input
                            type="text"
                            name="Colour"
                            value={this.state.activeItem.Colour}
                            onChange={this.handleChange}
                            placeholder="Enter Colour"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="LicencePlate">Licence Plate</Label>
                            <Input 
                              type="text"
                              name="LicencePlate"
                              value={this.state.activeItem.LicencePlate}
                              onChange={this.handleChange}
                              placeholder="Enter Licence Plate"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Status">Status</Label>
                            <Input 
                              type="text"
                              name="Status"
                              value={this.state.activeItem.Status}
                              onChange={this.handleChange}
                              placeholder="Enter Status"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Mileage">Mileage</Label>
                            <Input 
                              type="text"
                              name="Mileage"
                              value={this.state.activeItem.Mileage}
                              onChange={this.handleChange}
                              placeholder="Mileage"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}