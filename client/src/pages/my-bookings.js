import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchActiveBookings } from '../http/bookingAPI';
import { Container, ListGroup, Spinner, Row, Col } from 'react-bootstrap';

const MyBookings = observer(() => {
    const { user } = useContext(Context);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.user.id) {
            fetchActiveBookings(user.user.id)
                .then(setBookings)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user.user.id]);

    if (loading) return <Spinner animation="grow" />;
    if (!bookings.length) return (
        <Container className="pt-4">
            <h2 className="mb-4 text-center my-bookings__title">Мои бронирования</h2>
            <p className="text-center" style={{ fontSize: 24 }}>У Вас нет бронирований</p>
        </Container>
    );

    return (
        <Container className="pt-4">
            <h2 className="mb-5 my-bookings__title">Мои бронирования</h2>
            <Row className="justify-content-center">
                <Col md={8} lg={7} xl={6} className="my-bookings__list-col">
                    <ListGroup variant="flush">
                        {bookings.map(booking => (
                            <ListGroup.Item key={booking.id} className="my-bookings__item">
                                <img
                                    src={process.env.REACT_APP_API_URL + booking.ParkingLot.img}
                                    alt={booking.ParkingLot.name}
                                    className="my-bookings__img"
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <h3 className="my-bookings__name">{booking.ParkingLot.name}</h3>
                                    <p className="my-bookings__address">{booking.ParkingLot.address}</p>
                                    <div className="my-bookings__dates">
                                        <span>С <b>{formatDateTime(booking.start_time)}</b></span>
                                        <span>по <b>{formatDateTime(booking.end_time)}</b></span>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
});

function formatDateTime(dt) {
    return new Date(dt).toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

export default MyBookings;
