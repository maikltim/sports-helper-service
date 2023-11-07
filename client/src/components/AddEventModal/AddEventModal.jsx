import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { fetchAddEvent } from '../../store/ducks/events/asyncFunction';
import { getDayEventsAC } from '../../store/ducks/events/actionCreators';
import tw from "twin.macro";
import styled from "styled-components";

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

function AddEventModal(props) {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { currentDayAvailTimes } = useSelector(state => state.events);
  const { date } = useSelector(state => state.date);
  const { id } = useParams();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eventNameInput = useRef();
  const eventDescriptionInput = useRef();
  const eventTimeInput = useRef();

  const addEventFunc = () => {
    dispatch(fetchAddEvent({
      name: eventNameInput.current.value,
      description: eventDescriptionInput.current.value,
      time: eventTimeInput.current.value,
      date,
      fieldId: id
    }));
    setShow(false);
    setTimeout(() => {
      dispatch(getDayEventsAC(date));
    }, 500);
  }

  return (
    <>
      <SubmitButton style={{ width: '170px' }} variant="primary" onClick={handleShow}>
        Добавить Ивент
      </SubmitButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Опишите новый ивент</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Название ивента</Form.Label>
            <Form.Control ref={eventNameInput} type="text" placeholder='"пример названия"' required />
            <br />
            <Form.Label>Описание ивента</Form.Label>
            <Form.Control ref={eventDescriptionInput} type="text" as="textarea" placeholder='"пример описания"' />
            <br />
            <Row>
              <Col>
                <Form.Label>Дата ивента</Form.Label>
                <Form.Control style={{ width: '150px' }} type="text" placeholder={date} readOnly />
              </Col>
              <Col>
                <Form.Label>Время начала ивента</Form.Label>
                <Form.Control ref={eventTimeInput} style={{ width: '150px' }} as="select">

                  {currentDayAvailTimes.map(el => <option key={uuidv4()}>{el}</option>)}

                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="success" onClick={addEventFunc}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEventModal;
