import React, { Component } from 'react';
import ConfigIcon from './configDrawer';
import firebase from 'firebase';

class sensor extends Component{
    constructor(props){
        super(props);
        this.state = {           // *** setting the props value from table to local state ***
            id: props.id,       // *** React key is special props so add new id with same key ***
            name: props.name,
            value: props.value,
            units:props.units,
            threshold: props.threshold,
        }
    }

    componentWillMount=()=>{
            this.rootRef = firebase.database().ref('sensors/'+this.state.id).on('value',snap => {  // *** Sensor Listener for every changes ***
            var array = snap.val().value.length;
            this.setState({
              name: snap.val().name,
              units: snap.val().units,
              threshold: snap.val().threshold,
              value: snap.val().value[array-1],
            });
          })  
          console.log("Sensor compoentWill Mount")        
        }

        componentWillUnmount(){
            console.log("Sensor unmounted");
            firebase.database().ref('sensors/'+this.state.id).off('value',this.rootRef);
        }
    
                            // *** render Part ***
render(){
    const styles = { // *** Inline stylesheet ***
        cursor: 'pointer'
    }
    return(
        <div>
            <table className="table-bordered" >
            <tbody>
            <tr>      
                <td style= {styles}> 
                <ConfigIcon id={this.state.id} name= {this.state.name}  units = {this.state.units} threshold = {this.state.threshold} />
                {this.state.name} 
                </td>   
                <td className="value">{this.state.value}</td>       
                <td style= {styles}>{this.state.units}</td>        
                <td style= {styles}>{this.state.threshold}</td>        
                <td> 
                    <select>
                        <option>Raw</option>
                        <option>graph</option>
                    </select>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    );
};
}
export default sensor;

