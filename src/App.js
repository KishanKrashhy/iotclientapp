import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { Button, Collapse, Well, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devices: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/')
      .then(res => {
        this.setState({ devices: res.data })
        console.log(this.state.devices);
      })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">
                Devices
            </h3>
            </div>
            <div className="panel-body">
              <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New Device</Link></h4>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>States</th>
                    <th>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.devices.map(device =>
                    <tr key={device._id}>
                      <td><Link to={`/show/${device._id}`}>{device.name}</Link></td>
                      <td>
                        <div>
                          <Button bsStyle="primary" onClick={() => this.setState({ open: !this.state.open })}>
                            States
                          </Button>
                          <Collapse in={this.state.open}>
                            <div>
                              <ListGroup>
                                {device.states.map((state) => {
                                  return Object.keys(state).map((sensor, i) => {
                                    return <ListGroupItem key={i} bsStyle="info">
                                      {sensor} : {state[sensor]}
                                    </ListGroupItem>
                                
                                  })
                                })}
                              </ListGroup>
                            </div>
                          </Collapse>
                        </div>
                      </td>
                      <td>{device.updated}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
