import React, { useState } from "react"
import './App.css';
import Navibar from './components/Navibar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Homeview,} from './views/Homeview';
import { Branches } from './views/Branches';
import { Checkout } from './views/Checkout';
import { Admin } from './views/Admin';
import { Allcars } from './views/Allcars';
import { Cars } from './views/Cars';



function App(){

    const [branches, setBranches] = useState([]);
    const [adminTask, setAdminTask] = useState('homeAdmin');
    const [currentTab, setCurrentTab] = useState('Homeview');
    const [value, setValue] = useState([" ", " "]);
    const [custList, setCustList] = useState({});


    function SelectedTab(props){

      switch(currentTab){
          case 'Homeview':
              return (<Homeview setCurrentTab={setCurrentTab} setValue={setValue}/>)
          case 'Cars':
              return (<Cars setCurrentTab={setCurrentTab}/>)
          case 'Checkout':
              return (<Checkout setCurrentTab={setCurrentTab} setCustList={setCustList} />)
          case 'Admin':
              return (<Admin setCurrentTab={setCurrentTab} setAdminTask={setAdminTask} adminTask = {adminTask}/>)
          case 'Allcars':
              return (<Allcars setCurrentTab={setCurrentTab}/>)
          default:
              return ("")
      }
    }
    
    return (
       <div className="App">
         <Navibar setCurrentTab={setCurrentTab}/>
         <SelectedTab/>
       </div>

      );
};




//closing statement
export default App;