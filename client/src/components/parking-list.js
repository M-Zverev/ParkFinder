import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchParkings } from '../http/parkingAPI';

const ParkingList = observer(() => {
    const { parking } = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            <h2 className="p-3">Все парковки</h2>
            <ListGroup variant="flush" id="parkingList">
                {parking.parkingLots.map((park) => (
                    <ListGroup.Item
                        key={park.id}
                        className="parking-list__item"
                        onClick={() => navigate(`/parking_details/${park.id}`)}
                    >
                        <img
                            src={process.env.REACT_APP_API_URL + park.img}
                            alt={park.name}
                            className="parking-list__img"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 className="parking-list__name">{park.name}</h3>
                            <p style={{ marginBottom: '10px' }}> {park.address} </p>
                            <p style={{ marginBottom: 0 }}> Доступно мест: {park.available_spots}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
});

export default ParkingList;
