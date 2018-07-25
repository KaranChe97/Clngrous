import { Drawer, Form, Button, Col, Row, Icon,Input} from 'antd';
import React from 'react';
import firebase from 'firebase';
import Table from './table';

class DrawerForm extends React.Component {
  constructor(props){
    super(props);
                    // *** Initialize state with prop values ***
    this.state = {  
        id: this.props.id,
        name: this.props.name,
        units: this.props.units,
        threshold: this.props.threshold 
    };

    this.prevState = this.state;  // *** Maintaining the original state when cancelling *** Not in Use
                  // *** Event Handlers Binding for each input ***
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }
                  // *** Event Handlers ***
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

           // *** Removing the sensor from DOM and FireBase ***
    removeItem = (itemId) =>{   
    const itemRef = firebase.database().ref('sensors/'+itemId); 
    console.log("config:"+itemRef);
    itemRef.off();      // *** Disconnects the referance from state ***
    itemRef.remove(); 
   
    }

    showDrawer = () => {
        this.setState({
        visible: true,
        });           
    };

    onClose = () => {   // *** Cancelling & set the state to originals prevState again ***
    this.setState(
      {
        visible: false,
      }
    ); 
    }

    // *** Submit the entered data into newState array and updating the sensor values in Firebase ***
  handleSubmit = () =>{
      this.setState({
        visible:false,
      });
        const newRef = firebase.database().ref('sensors/'+this.state.id); // Sensor referance with id 
        if((this.state.name!=="")&&(this.state.units!=="")&&(this.state.threshold!=="")) {
        var newState = {                  // *** setting values from FORM inputs ***
            name : this.state.name,
            units: this.state.units,
            threshold: this.state.threshold,
        } 
        newRef.update(newState).then(this.setState({
            visible:false,
            name: newState.name,
            units: newState.units,
            threshold:newState.threshold
        })); //***  Updating new object to firebase with passed key ***
      } 
      this.clearForm();
 } 
 
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Icon type="setting" className = "configure" onClick={this.showDrawer} />
        <Drawer
          title="Configuration"
          width={320}
          placement="left"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" id="myForm" hideRequiredMark >
            <Row gutter={8}>
              <Col span={24}>
              <h5>Configure Sensor: {this.state.name} </h5>
                <Form.Item label="Sensor Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Edit sensor name' }],
                    onChange:this.handleChange})(<Input name = "name" placeholder= "sensor name"  />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter ={8}>
            <Col span={24}>
                <Form.Item label="Unit">
                  {getFieldDecorator('unit', {
                    rules: [{ required: true, message: 'Edit sensor unit' }],
                    onChange:this.handleChange})(<Input name= "units" placeholder="sensor unit" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Threshold">
                  {getFieldDecorator('Threshold', {
                    rules: [{ required: true, message: 'Edit Threshold value' }],
                    onChange:this.handleChange})(<Input name = "threshold" placeholder= "sensor Threshold"  />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#FFA500',
              borderRadius: '0 0 4px 4px',
            }}
          >

            <Button
              style={{
                marginRight: 8,
              }}
              onClick={()=>this.removeItem(this.state.id)}
              type = "danger"
            >
              Delete
            </Button>

            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
          
            <Button onClick = {this.handleSubmit} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const App = Form.create()(DrawerForm);
export default App;
