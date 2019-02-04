import React, { Component } from 'react';
import SensorTable from './SensorTable';
import { Container, Row, Col, Card} from 'react-bootstrap';
import ReadingTable from "./ReadingTable";

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Card className={"mb-4"}>
              <Card.Title>Sensorit</Card.Title>
              <Card.Body>
                <SensorTable/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className={"mb-4"}>
                <Card.Title>Mittaukset</Card.Title>
              <Card.Body>
                <ReadingTable/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
