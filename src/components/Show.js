import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Panel, Button, Collapse, ListGroup, ListGroupItem, Table, Label } from 'react-bootstrap';
import Header from '../components/Header'

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: '',
            paramid: ''
        };
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ paramid: params.id });
        console.log("props id getting ", params.id);
        axios.get('http://localhost:8080/get?id=' + this.props.match.params.id)
            .then(res => {
                this.setState({ device: res.data });
                console.log(this.state.device);
            })
            .catch(err => {
                console.log(err);
            });
    }

    delete(id) {
        console.log(id);
        axios.delete('http://localhost:8080/remove', { data: { id: id } })
            .then((result) => {
                this.props.history.push("/")
            });
    };

    render() {
        console.log('this is the params', this.state.device);
        if (this.state.device.states) {
            var stateList = this.state.device.states.map((state) => {
                return Object.keys(state).map((sensor, i) => {
                    return <tr key={i}>
                        <td>
                                {sensor} :
                        </td>
                        <td>
                            <Label>
                                {state[sensor]}
                            </Label>
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
                                {this.state.device.name}
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> device List</Link></h4>


                            <Panel bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title componentclass="h3">{this.state.device.name}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div>
                                        <Button onClick={() => this.setState({ open: !this.state.open })} bsStyle="success" >
                                            States of the Device
                                        </Button>
                                        <Collapse in={this.state.open}>
                                            <div>
                                                <ListGroup>
                                                    <ListGroupItem>
                                                        <Table striped bordered condensed hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {stateList}
                                                            </tbody>
                                                        </Table>

                                                    </ListGroupItem>
                                                    <ListGroupItem> <span className="badge badge-secondary">Updated On</span>{this.state.device.updated}</ListGroupItem>
                                                </ListGroup>
                                            </div>
                                        </Collapse>
                                    </div>
                                </Panel.Body>
                            </Panel>

                            <Link to={`/edit/${this.state.device._id}`} className="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.device._id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;