import React, {Component} from "react";
import {Button} from "react-bootstrap";
import { useState, setState } from "react";
import TextField from '@mui/material/TextField';
import {DataGrid} from '@mui/x-data-grid';

function Admin(props){

   

    return(
        <><div className="sidebar" style={{display:"flex", flexDirection:"column"}}>
          <Button onClick={()=>{props.setAdminTask('homeAdmin')}}>Home</Button>
          <Button onClick={()=>{props.setAdminTask('crud')}}>Direct DB Access</Button>
          <Button onClick={()=>{props.setAdminTask('processTransaction')}}>Process Transactions</Button>
          <Button onClick={()=>{props.setAdminTask('transferCar')}}>Transfer Car</Button>
          <Button onClick={()=>{props.setAdminTask('getTransactionsByBranch')}}>Find Transaction</Button>
          <Button onClick={()=>{props.setAdminTask('updateCarType')}}>Adjust Vehicle Class</Button>
        <Button onClick={()=>{props.setAdminTask('customFunc')}}> Custom </Button>
        </div>
        <div><SelectedAdminTab adminTask={props.adminTask}/></div>
        </>
    )

}

const HomeAdmin=()=>{

    return(
        <><h1>Home - Select a function</h1></>
        
    )
}

const Crud=()=>{

    return(
        <><h1>Crud</h1>
        <DataGrid/>
        <Button>Submit</Button>
        </>
    )
}

const ProcessTx=()=>{

    return(
        <><h1>ProcessTx</h1>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <Button>Submit</Button>
        </>
    )
}

const TransferCar=()=>{

    return(
        <><h1>TransferCar</h1>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <div><p>Text1</p><TextField></TextField></div>
        <Button>Submit</Button>
        </>
    )
}

const TxByBranch=()=>{

    return(
        <><h1>TxByBranch</h1>
        <div><p>BranchSelector</p><TextField></TextField></div>
        <Button>Submit</Button>
        </>
    )
}

const UpdateCarType=()=>{

    return(
        <><h1>UpdateCarType</h1>
        <div><p>CarTypeViewSelector</p><TextField></TextField></div>
        <Button>Submit</Button></>

    )
}

const Custom=()=>{

    return(
        <><h1>Costume</h1>
        </>
    )
}

const SelectedAdminTab=(props)=>{

    switch(props.adminTask){
        case 'Allcars':
            return (<HomeAdmin/>)
        case 'crud':
            return (<Crud/>)
        case 'processTransaction':
            return (<ProcessTx/>)
        case 'transferCar':
            return(<TransferCar/>)
        case 'getTransactionsByBranch':
            return(<TxByBranch/>)
        case 'updateCarType':
            return(<UpdateCarType/>)
        case 'customFunc':
            return(<Custom/>)
        default:
            return (<HomeAdmin/>)
    }

}




export {Admin};