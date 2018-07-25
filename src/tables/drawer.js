import { Drawer, Form, Button, Col, Row, Input} from 'antd';
import React from 'react';
import firebase from 'firebase';
class DrawerForm extends React.Component {
  constructor(props){
    super(props);
                    // *** Initialize state with null values ***
    this.state = {  
      visible: false,
      name : "",
      units: "",
      threshold: "",
      value: [],  
    };
                  // *** Event Handlers Binding for each input ***
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.handleChangeThreshold = this.handleChangeThreshold.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }
                  // *** Event Handlers ***
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeUnit(event) {
    this.setState({units: event.target.value});
  }
  handleChangeThreshold(event) {
    this.setState({threshold: event.target.value});
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {   // *** Cancelling set the state to null again ***
    this.setState(
      {
        name: "",
        units:"",
        threshold:"",
        visible: false,
      }
    ); 
  }
  showName = () =>{   // *** For Developer referance Callback ***
    console.log(this.state.name);
    console.log(this.state.units);
  }
  handleSubmit = () =>{
      this.setState({
        visible:false,
      });
      const newRef = firebase.database().ref('sensors'); // *** Sensor referance ***
     if((this.state.name!=="")&&(this.state.units!=="")&&(this.state.threshold!=="")) {
        var newState = {                  // *** setting values from FORM inputs ***
          name : this.state.name,
          units: this.state.units,
          threshold: this.state.threshold,
          value: [0],
      }
        newRef.push(newState).then(this.onClose);
      }

                // *** Pushing new object to firebase ***
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Add Sensor
        </Button>
        <Drawer
          title="Add new Sensor"
          width={320}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark >
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="sensor Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Enter sensor name' }],
                    onChange:this.handleChangeName.bind(this)})(<Input placeholder= "sensor name"  />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter ={8}>
            <Col span={24}>
                <Form.Item label="Unit">
                  {getFieldDecorator('unit', {
                    rules: [{ required: true, message: 'Enter sensor unit' }],
                    onChange:this.handleChangeUnit })(<Input id= "unit" placeholder="sensor unit" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Threshold">
                  {getFieldDecorator('Threshold', {
                    rules: [{ required: true, message: 'Enter Threshold value' }],
                    onChange:this.handleChangeThreshold})(<Input placeholder= "sensor Threshold"  />)}
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
              background: '#4BB543',
              borderRadius: '0 0 4px 4px',
            }}
          >
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
