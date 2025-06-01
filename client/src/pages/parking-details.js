import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { createBooking } from '../http/bookingAPI';
import { fetchOneParking } from '../http/parkingAPI';

function toDatetimeLocal(date) {
    const pad = n => String(n).padStart(2, '0');
    return date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate()) + 'T' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes());
}

const ParkingDetails = observer(() => {
    const { id } = useParams();
    const { parking, user } = useContext(Context);
    const park = parking.getParkingLotById(Number(id));
    const navigate = useNavigate();

    const nowTime = new Date();
    const maxStartTime = new Date(nowTime.getTime() + 24 * 60 * 60 * 1000);
    const maxEndTime = new Date(maxStartTime + 24 * 60 * 60 * 1000);

    const [startTime, setStartTime] = useState(toDatetimeLocal(nowTime));
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);

    if (!park) {
        return <div>Парковка не найдена</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.isAuth) {
            navigate('/login');
            return;
        }

        if (new Date(endTime) - new Date(startTime) < 60 * 1000) {
            alert('Время окончания бронирования должно быть больше времени начала.');
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                user_id: user.user.id,
                parking_lot_id: park.id,
                start_time: startTime,
                end_time: endTime,
            };

            await createBooking(bookingData);
            const updatedParking = await fetchOneParking(park.id);
            parking.setParkingLot(updatedParking, park.available_spots);
            alert('Бронирование успешно создано!');

        } catch (e) {
            alert('Ошибка при бронировании: ' + (e.response?.data?.message || e.message));
        } finally {
            setLoading(false);
        }
    };

    const noSpots = park.available_spots <= 0;

    return (
        <Container className="pt-4">
            <Row className="details-container">
                <Col md={8}>
                    <h2>{park.name}</h2>
                    <img
                        src={process.env.REACT_APP_API_URL + park.img}
                        alt={park.name}
                        className="img-fluid my-3"
                        style={{ borderRadius: 16, maxHeight: 340, objectFit: 'cover' }}
                    />
                    <p style={{ fontWeight: 500 }}>  <span>Адрес:</span> {park.address}  </p>
                    <p> <span>Свободных мест:</span> {park.available_spots} / {park.total_spots} </p>
                </Col>
                <Col md={4} className="booking-form">
                    <h3 className="mb-4">Бронирование</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="startTime">
                            <Form.Label>Начало</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                min={toDatetimeLocal(nowTime)}
                                max={toDatetimeLocal(maxStartTime)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="endTime">
                            <Form.Label>Конец</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                min={toDatetimeLocal(nowTime)}
                                max={toDatetimeLocal(maxEndTime)}
                                required
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 btn btn-primary"
                            disabled={noSpots || loading}
                        >
                            {noSpots ? 'Нет свободных мест' : 'Забронировать'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});

export default ParkingDetails;
