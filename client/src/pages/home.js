import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import markerImg from '../assets/marker.png';
import parkingSignImg from '../assets/parking_sign.png';
import bookingImg from '../assets/booking.png';
import parkingBg from '../assets/parking.jpg';

const Home = () => {
    return (
        <>
            <section
                className="search-section text-center text-white d-flex align-items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${parkingBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 700,
                }}
            >
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-4" style={{ fontWeight: 700, fontSize: '2.8rem' }}>
                        Найдите парковку быстро и легко
                    </h1>
                    <Link to="/parking" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="primary"
                            size="lg"
                            className="mt-3 px-5 py-3"
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                borderRadius: '2rem',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            }}
                        >
                            Найти парковки
                        </Button>
                    </Link>
                </Container>
            </section>

            <section id="about" className="py-5">
                <Container>
                    <h1 className="mb-5 text-center"  style={{ fontSize: '50px' }} >Как это работает</h1>
                    <Row className="text-center">
                        <Col md={4}>
                            <img src={parkingSignImg} alt="Auth" className="img-fluid mb-3" style={{ maxHeight: 100 }} />
                            <h2>Шаг 1</h2>
                            <h4>Войдите или зарегистрируйтесь в аккаунт.</h4>
                        </Col>
                        <Col md={4}>
                            <img src={markerImg} alt="Parking" className="img-fluid mb-3" style={{ maxHeight: 100 }} />
                            <h2>Шаг 2</h2>
                            <h4>Выберите подходящее парковочное место из предложенных вариантов.</h4>
                        </Col>
                        <Col md={4}>
                            <img src={bookingImg} alt="Booking" className="img-fluid mb-3" style={{ maxHeight: 100 }} />
                            <h2>Шаг 3</h2>
                            <h4>Забронируйте выбранную парковку.</h4>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Home;
