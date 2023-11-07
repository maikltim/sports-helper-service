import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAcceptRequests } from '../../store/ducks/request/asyncFunction'
import { useDispatch } from 'react-redux'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import mapStyles from '../Map/mapStyles';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

Geocode.setLanguage("ru");

Geocode.setRegion("ru");

Geocode.setLocationType("ROOFTOP");

Geocode.enableDebug();


function RequestModal({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const latInput = useRef()
  const lngInput = useRef()
  const fieldTitleInput = useRef()
  const fieldContentInput = useRef()
  const markInfoInput = useRef()
  const addressInput = useRef()
  const mapContainerStyle = {
    width: "25vw",
    height: "35vh",
    alignItems: "center",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyles
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [marker, setMarker] = useState({ lat: "", lng: "" });
  const [center, setCenter] = useState({ lat: 59.93848, lng: 30.31248, })
  const [address, setAddress] = useState(data.fieldAddress);
  const dispatch = useDispatch()
  useEffect(() => {
    setMarker({ lat: data.lat, lng: data.lng });

  }, []);
  const onMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })

    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address)
      },
      (error) => {
        console.error(error);
      }
    )
  };
  console.log(address);
  const addFieldMarkHandler = () => {
    setShow(false)
    dispatch(fetchAcceptRequests(data._id, fieldTitleInput.current.value,
      fieldContentInput.current.value, addressInput.current.value, latInput.current.value, lngInput.current.value, markInfoInput.current.value))
  };
  return (
    <>
      <Button style={{ width: "170px" }} variant="success" onClick={handleShow}>
        Принять заявку
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Форма принятия заявки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>latitude</Form.Label>
            <Form.Control type="text" value={marker.lat} ref={latInput} disabled />
            <Form.Label>longtitude</Form.Label>
            <Form.Control type="text" value={marker.lng} ref={lngInput} disabled />
            <Form.Label>Описание метки</Form.Label>
            <Form.Control type="text" ref={markInfoInput} placeholder="описание метки на карте" required/>
            <br />
            <Form.Label>Название поля</Form.Label>
            <Form.Control type="text" ref={fieldTitleInput} defaultValue={data.fieldTitle} />
            <Form.Label>Описание поля</Form.Label>
            <Form.Control type="text" ref={fieldContentInput} defaultValue={data.fieldContent} />
            <Form.Label>Адрес поля</Form.Label>
            <Form.Control type="text" ref={addressInput} defaultValue={address} />
            <br />
            <Row></Row>
          </Form.Group>
          <>
            <div style={{ display: "flex" }}>
              <div>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                  options={options}
                  onClick={onMapClick}
                >
                  {marker.lat && (
                    <Marker
                      position={{
                        lat: marker.lat,
                        lng: marker.lng,
                      }}
                    />
                  )}
                </GoogleMap>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="success" onClick={addFieldMarkHandler}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestModal;
