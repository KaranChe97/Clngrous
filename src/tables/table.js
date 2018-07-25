import React, { Component } from 'react';
import Sensor from './sensor'; 
import TableHeader from './tableHeader';
import Drawer from './drawer';
import firebase from 'firebase';

class Table extends Component{
    constructor(){   // *** Table doesn't have any props ***
        super();
        this.state={
            items: []   // *** Initial state with empty item array ***
        };
    }
    componentWillMount(){
        const rootRef = firebase.database().ref('sensors'); // *** Sensor referance for 'sensor' ***
        rootRef.on('value',(snapshot) => {                  // *** Firebase values fetching ***
            var items = snapshot.val(); 
            let newState = [];
            for(let item in items){
                newState.push({    // *** Pushing new object of sensor details into newstate array ***
                    key: item,
                    name:items[item].name,
                    units: items[item].units,
                    threshold:items[item].threshold,
                    value: items[item].value,
                });
            }
            this.setState(
                {
                    items: newState     // *** setting the state with newState array values ***
                }
            )
        });
        console.log("Table componentwillmount");
    }
    reloadArray = () =>{
        this.setState = {
            items: this.state.items.splice(-1,1)
        }
    }

    render(){    
    return(
        <div className = "App-table container">
            <h3 className="sensor-heading"> Sensor Readings </h3>
             <TableHeader />    {/* *** Calls the table header component *** */}
            <div className="App-sensors"> 
            {/*  *** mapping all the sensors into <Sensor /> component *** */}
            {this.state.items.map((item) => {
                return(
                    <Sensor key = {item.key}  
                    id = {item.key}
                    name = {item.name} 
                    value = {item.value}
                    units = {item.units} 
                    threshold = {item.threshold}
                    />
                )
            })} 
            <br />
            <Drawer />  {/* *** calls the ADD SENSOR Component *** */}
            </div>
        </div>
    );
    }
}

export default Table;

