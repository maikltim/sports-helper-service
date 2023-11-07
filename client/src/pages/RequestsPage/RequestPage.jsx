import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchInitRequests, fetchDeleteRequests } from '../../store/ducks/request/asyncFunction'
import RequestModal from '../../components/RequestModal/RequestModal';
import tw from "twin.macro";
import styled from "styled-components";
import { Button } from "react-bootstrap";

function RequestPage() {
  const dispatch = useDispatch()
  let { requests } = useSelector(state => state.requests)

  useEffect(() => {
    dispatch(fetchInitRequests())
  }, [dispatch])

  const deleteRequestHandler = (e) => {
    const { id } = e.target
    dispatch(fetchDeleteRequests(id))
  }

  const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
`;

  return (
    <Container>
      <ul>
        {requests?.map(el =>
          <li style={{ margin: '30px', }} key={el._id}>
            <span>Lat: {el.lat}</span>
            {' '}
            <span>Lng: {el.lng}</span>
            {' '}
            <p>Название: {el.fieldTitle}</p>
            <p>Описание: {el.fieldContent}</p>
            <RequestModal data={el} />
            {' '}
            <Button variant='danger' onClick={deleteRequestHandler} id={el._id}>Отклонить заявку</Button>
            <hr />
          </li>)}
      </ul>
    </Container>
  )
}

export default RequestPage;
