import React, { useEffect, useRef, useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const ParkingMap = observer(() => {
    const { parking } = useContext(Context);
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersRef = useRef([]);
    const navigate = useNavigate();

    // Инициализация карты
    useEffect(() => {
        if (!window.google || !mapRef.current) return;
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 47.2384, lng: 39.71795 },
            zoom: 12,
            mapTypeControl: false,
        });
    }, []);

    // Обновляем, когда изменяется parking.parkingLots
    useEffect(() => {
        if (!window.google || !mapInstance.current) return;

        const svgIcon =
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(
                '<?xml version="1.0" ?><svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C24 44 40 32 40 19C40 10.7157 32.8366 4 24 4C15.1634 4 8 10.7157 8 19C8 32 24 44 24 44Z" fill="#2F88FF" stroke="black" stroke-linejoin="round" stroke-width="4"/><path d="M21 14V30" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path d="M21 14H27C29.2091 14 31 15.7909 31 18V18C31 20.2091 29.2091 22 27 22H21V14Z" fill="#43CCF8" stroke="white" stroke-linejoin="round" stroke-width="4"/></svg>'
            );

        // Очистить старые маркеры
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Добавить новые маркеры
        parking.parkingLots.forEach((lot) => {
            const marker = new window.google.maps.Marker({
                position: { lat: lot.latitude, lng: lot.longitude },
                map: mapInstance.current,
                title: lot.name,
                icon: {
                    url: svgIcon,
                    scaledSize: new window.google.maps.Size(48, 48),
                },
            });

            marker.addListener('click', () => {
                navigate(`/parking_details/${lot.id}`); // Без перезагрузки страницы
                //window.location.href = `/parking_details/${lot.id}`; Обновляет страницу
            });

            markersRef.current.push(marker);
        });
    }, [parking.parkingLots]);

    return (
        <div
            ref={mapRef}
            id="map"
            style={{ width: '100%', height: '87vh', minHeight: 400, borderRadius: 12 }}
        />
    );
});

export default ParkingMap;
