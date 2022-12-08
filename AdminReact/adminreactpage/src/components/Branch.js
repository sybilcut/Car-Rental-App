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
                <ModalHeader toggle={toggle}>Add New Branch</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="PhoneNumber">Phone Number</Label>
                            <Input
                              type="text"
                              name="PhoneNumber"
                              value={this.state.activeItem.PhoneNumber}
                              onChange={this.handleChange}
                              placeholder="Enter Phone Number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Province">Province</Label>
                            <Input 
                              type="text"
                              name="Province"
                              value={this.state.activeItem.Province}
                              onChange={this.handleChange}
                              placeholder="Enter Province"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="City">City</Label>
                            <Input 
                              type="text"
                              name="City"
                              value={this.state.activeItem.City}
                              onChange={this.handleChange}
                              placeholder="Enter City"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="PostalCode">Postal Code</Label>
                            <Input
                            type="text"
                            name="PostalCode"
                            value={this.state.activeItem.PostalCode}
                            onChange={this.handleChange}
                            placeholder="Enter Postal Code"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="StreetNumber">Street Number</Label>
                            <Input 
                              type="text"
                              name="StreetNumber"
                              value={this.state.activeItem.StreetNumber}
                              onChange={this.handleChange}
                              placeholder="Enter Street Number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="StreetName">Street Name</Label>
                            <Input 
                              type="text"
                              name="StreetName"
                              value={this.state.activeItem.StreetName}
                              onChange={this.handleChange}
                              placeholder="Enter Street Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="UnitNumber">Unit Number</Label>
                            <Input 
                              type="text"
                              name="UnitNumber"
                              value={this.state.activeItem.UnitNumber}
                              onChange={this.handleChange}
                              placeholder="Unit Number"
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