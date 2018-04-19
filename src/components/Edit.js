import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: {},
            states : {},
            devices: [],
        };
        this.onChange = this.onChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:8080/get?id=' + this.props.match.params.id)
            .then(res => {
                this.setState({ device: res.data });
                console.log(this.state.device);
            });
    }

    onChange = (e) => {
        const state = this.state.device
        state[e.target.name] = e.target.value;
        this.setState({ device: state });
    }

    onStateChange = (e) => {
        const state = this.state.states
        state[e.target.name] = e.target.value;
        console.log("this is the data ",state)
        this.setState({ states: state });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('this are state object', this.state.states.length);
        const { name, states, updated, id } = this.state.device;
        let deviceobj = { name: '', states: [], _id: '' };

        
        const newstate = this.state.devices.map((device,i) => {
            return { [device.name] : device.val }
        })
        const updatedState = Object.keys(this.state.states).map((key) => {
                return {[key] : this.state.states[key] }
        })

        deviceobj.name = name;
        deviceobj.states.push(...(newstate));
        deviceobj.states.push(...(updatedState));
        deviceobj._id = this.props.match.params.id;
        
        console.log('checking passing data', updatedState)
        
        console.log(deviceobj);

        axios.put('http://localhost:8080/edit', { deviceobj })
            .then((result) => {
                this.props.history.push("/show/" + this.props.match.params.id)
        });
    }

    handleAddState = () => {
        this.setState({ devices: this.state.devices.concat([{ }]) });
    }

    deviceNameChange = (idx) => (evt) => {
        const newdevices = this.state.devices.map((device, didx) => {
            if (idx !== didx) return device;
            return { ...device, name: evt.target.value };
        });

        this.setState({ devices: newdevices });
    }
    
    deviceValChange = (idx) => (evt) => {
        const newdevices = this.state.devices.map((device, didx) => {
            if (idx !== didx) return device;
            return { ...device, val: evt.target.value };
        });

        this.setState({ devices: newdevices });
    }

    handleRemoveState = (idx) => () => {
        this.setState({ devices: this.state.devices.filter((s, didx) => idx !== didx) });
    }

    render() {
        if (this.state.device.states) {
            var stateList = this.state.device.states.map((state) => {
                return Object.keys(state).map((sensor, i) => {
                    return <tr key={i}>
                        <td>
                           <label> {sensor} </label>
                        </td>
                        <td>
                            <input type="text"
                             className="form-control"
                             placeholder={state[sensor]}
                             name={sensor}
                             onChange={this.onStateChange} />
                        </td>
                    </tr>
                })
            }
            )
        }
        return (
            <div>
                <Header />
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Device Sensors
                </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/show/${this.state.device._id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Device List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" value={this.state.device.name} onChange={this.onChange} />
                            </div>
                            <div className="form-group" style={{width : '50%'}}>
                                <label>States</label>
                                <table className="table">
                                    <tbody>
                                        {stateList}
                                        <tr>
                                            <td>
                                        {this.state.devices.map((device, idx) => (
                                        <div>
                                            <div className="form-group col-md-5">
                                                <input
                                                    type="text"
                                                    placeholder={`State #${idx + 1} name`}
                                                    value={device.name}
                                                    onChange={this.deviceNameChange(idx)}
                                                    className="form-control"
                                                />
                                                </div>
                                                <div className="form-group col-md-5">
                                                <input
                                                    type="text"
                                                    placeholder={`State #${idx + 1} Value`}
                                                    value={device.val}
                                                    onChange={this.deviceValChange(idx)}
                                                    className="form-control"
                                                />
                                                </div>
                                                <div className='form-group col-md-1'>
                                                <button type="button" onClick={this.handleRemoveState(idx)} className="btn btn-danger">-</button>
                                            </div>
                                        </div>

                                    ))}
                                    <div className='form-group'>
                                    <div className='form-group col-md-12'>
                                        <button type="button" onClick={this.handleAddState} className="btn btn-success">+</button>
                                    </div>
                                    </div>
                                    </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit" className="btn btn-info">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}

export default Edit;