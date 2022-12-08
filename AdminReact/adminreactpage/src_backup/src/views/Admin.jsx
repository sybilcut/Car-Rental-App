import React, {Component} from "react";
import { useState } from "react";

const [loadedTask, setLoadedTask] = useState('homeAdmin');

class Admin extends Component{

    render(){
        <><div className="sidebar">
          <Button onClick={()=>setLoadedTask('homeAdmin')}>Home</Button>
          <Button onClick={()=>setLoadedTask('crud')}>Direct DB Access</Button>
          <Button onClick={()=>setLoadedTask('processTransaction')}>Process Transactions</Button>
          <Button onClick={()=>setLoadedTask('transferCar')}>Transfer Car</Button>
          <Button onClick={()=>setLoadedTask('getTransactionsByBranch')}>Find Transaction</Button>
          <Button onClick={()=>setLoadedTask('updateCarType')}>Adjust Vehicle Class</Button>
          <Button onClick={()=>setLoadedTask('customFunc')}>Client</Button>
        </div>
        <div><SelectedTab/></div>
        </>
    }

}

function SelectedTab(){

    switch(loadedTask){
        case 'homeAdmin':
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

function HomeAdmin(){

    return(
        <><h1>HomeAdmin</h1></>
    )
}

function Crud(){

    return(
        <><h1>Crud</h1></>
    )
}

function ProcessTx(){

    return(
        <><h1>ProcessTx</h1></>
    )
}

function TransferCar(){

    return(
        <><h1>TransferCar</h1></>
    )
}

function TxByBranch(){

    return(
        <><h1>TxByBranch</h1></>
    )
}

function UpdateCarType(){

    return(
        <><h1>UpdateCarType</h1></>
    )
}

function Custom(){

    return(
        <><h1>Costume</h1></>
    )
}


export default Admin;