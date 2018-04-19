import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            devices: [{ name: '' }],
            states: {},
            updated: '',
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, states, updated, devices } = this.state;
        let obj = { name: '', states: [] };
        devices.map((device) => {
            states[device.name] = '';
        })
        obj.name = name;
        obj.states.push(states);
        console.log(`these are states ${states}`);
        console.log(this.state)
        axios.post('http://localhost:8080/add', { name: obj.name, states: obj.states })
            .then((result) => {
                this.props.history.push("/")
            });
    }

    handleAddState = () => {
        this.setState({ devices: this.state.devices.concat([{ name: '' }]) });
    }

    deviceNameChange = (idx) => (evt) => {
        const newdevices = this.state.devices.map((device, didx) => {
            if (idx !== didx) return device;
            return { ...device, name: evt.target.value };
        });

        this.setState({ devices: newdevices });
    }

    handleRemoveState = (idx) => () => {
        this.setState({ devices: this.state.devices.filter((s, didx) => idx !== didx) });
    }

    render() {
        const { name, states, updated, id, devices } = this.state;
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                New Device
                </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Device List</Link></h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">name</label>
                                    <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                                </div>
                                <label htmlFor="title">Sensor States:</label>
                                <div className="form-row">

                                    {devices.map((device, idx) => (
                                        <div key={idx}>
                                            <div className="form-group col-md-11">
                                                <input
                                                    type="text"
                                                    placeholder={`State #${idx + 1} name`}
                                                    value={device.name}
                                                    onChange={this.deviceNameChange(idx)}
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
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;