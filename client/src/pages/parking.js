import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ParkingList from '../components/parking-list';
import ParkingMap from '../components/parking-map';

const Parking = () => {
    return (
        <Container fluid className="pt-4">
            <Row>
                <Col md={2}>
                    <ParkingList />
                </Col>
                <Col md={10}>
                    <ParkingMap />
                </Col>
            </Row>
        </Container>
    );
};

export default Parking;
