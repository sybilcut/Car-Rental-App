import React, { Input, Label, useState, setState, Text, Button} from "react"
import logo from './logo.svg';
import './App.css';
import Admin from './views/Admin.jsx';


function App() {

  const [savedData, setSavedData] = useState({})
  const [editCar, setEditCar] = useState({})
  const [savedTest, setSavedTest] = useState("")
  const [submission, setSubmission] = useState({"manufacturer": "",
                                                "model": "",
                                                "fuelType": "",
                                                "colour": "",
                                                "licencePlate": "",
                                                "status": "",
                                                "mileage": -1})

  const Populate = async () => {
    let temp = savedData;
    for (let i=1;i<5;i++){
      await fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/stocks/client.php?id=${i}}`)
        .then((response)=> response.text())
        .then((rettext)=> JSON.parse(rettext))
        .then((retjson)=> {
          temp.push(retjson);
          setSavedData(temp);
    })}}

  const GrabCar = async (num) => {
    await fetch(`/visualapi/carview/${num}/`)
        .then((response)=> response.text())
        .then((rettext)=> JSON.parse(rettext))
        .then((retjson)=> console.log(retjson))
  }
  
  const DeleteCar = async (num) => {
    await fetch(`/visualapi/carview/${num}/`, 
                {
                  method: 'DELETE', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
  }

  const MoveCar = async (num) => {
    await fetch(`/move/`, {
                  method: 'POST', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ carID:1, branchID:10 })
                }
              )
  }

  const GetCarsByStatus = async (num) => {
    await fetch(`/branch/?branch=${num}`, {
                  method: 'GET', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
          .then((response)=> response.text())
          .then((rettext)=> JSON.parse(rettext))
          .then((retjson)=> console.log(retjson))
  }
  

  const handleSubmit = (obj) =>{
    console.log(obj)

  }


  function CreateForm(){
    
   return (
    <form onSubmit={handleSubmit()}>
      <label>Manufacturer:
        <input type="text" value={""} onChange={(e) => {submission.manufacturer = e.target.value}}/>
      </label>
      <label>Model:
        <input type="text" value={""} onChange={(e) => {submission.model = e.target.value}}/>
      </label>
      <label>FuelType:
        <input type="text" value={""} onChange={(e) => {submission.fuelType = e.target.value}}/>
      </label>
      <label>Colour:
        <input type="text" value={""} onChange={(e) => {submission.colour = e.target.value}}/>
      </label>
      <label>LicencePlate:
        <input type="text" value={""} onChange={(e) => {submission.licencePlate = e.target.value}}/>
      </label>
      <label>Status:
        <input type="text" value={""} onChange={(e) => {submission.status = e.target.value}}/>
      </label>
      <label>Mileage:
        <input type="text" value={""} onChange={(e) => {submission.mileage = e.target.value}}/>
      </label>
    </form>
  );
  }

  function EditForm(props){
    GetCarsByStatus(props.status);

    return (
      <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={handleSubmit(submission)}>
       <label>Manufacturer:
         <input type="text" defaultValue={""} onChange={(e) => {submission.manufacturer = e.target.value}}/>
       </label>
       <label>Model:
         <input type="text" defaultValue={""} onChange={(e) => {submission.model = e.target.value}}/>
       </label>
       <label>FuelType:
         <input type="text" defaultValue={""} onChange={(e) => {submission.fuelType = e.target.value}}/>
       </label>
       <label>Colour:
         <input type="text" defaultValue={""} onChange={(e) => {submission.colour = e.target.value}}/>
       </label>
       <label>LicencePlate:
         <input type="text" defaultValue={""} onChange={(e) => {submission.licencePlate = e.target.value}}/>
       </label>
       <label>Status:
         <input type="text" defaultValue={""} onChange={(e) => {submission.status = e.target.value}}/>
       </label>
       <label>Mileage:
         <input type="text" defaultValue={""} onChange={(e) => {submission.mileage = e.target.value}}/>
       </label>
       <input type="submit" value="Submit" />
     </form>
   );
   }

  function Contents(){
    return(
      <><Text>{savedData.text}</Text></>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <Admin/>
      </header>
    </div>
  );
}

export default App;
