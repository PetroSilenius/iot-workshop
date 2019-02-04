import React, { Component } from 'react';
import Sensor from './types';
import {Table} from 'react-bootstrap';

interface State {
    data: Sensor[]
}

class SensorTable extends Component<{}, State> {
    state = {
        data: []
    };

    async fetchSensors() {
        const response = await fetch('/api/getsensors');
        const data: Sensor[] = await response.json();
        this.setState({data});
    }

    componentDidMount() {
        this.fetchSensors();
        setInterval(this.fetchSensors.bind(this), 3000);
    }

    formatDate(date: string) : string {
        return new Date(date).toLocaleString('fi-FI');
    }

    render() {
        const {data} = this.state;

        if (data.length === 0){
            return 'Ladataan...';
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Ensimmäinen päivitys</th>
                        <th>Viimeisin päivitys</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(({ name, firstonline, lastonline }) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{this.formatDate(firstonline)}</td>
                            <td>{this.formatDate(lastonline)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        );
    }
}

export default SensorTable;