import React, { useEffect, useState } from "react";
import "./Timeline.css";
import { Link, useHistory } from 'react-router-dom'
import { Chrono } from "react-chrono";
import { useDispatch, useSelector } from "react-redux";
import { getDayEventsAC } from '../../store/ducks/events/actionCreators';
import { Card } from 'react-bootstrap';
import tw from "twin.macro";
import styled from "styled-components";
import { fetchJoinEvent, fetchLeaveEvent } from '../../store/ducks/events/asyncFunction';

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

function Timeline() {

  const { eventsData } = useSelector(state => state.events);
  const { date } = useSelector(state => state.date);
  const { id, allUsers, logged } = useSelector(state => state.users)

  const dispatch = useDispatch()
  const history = useHistory()
  const joinEventHandler = (e) => {
    if (logged) {
      dispatch(fetchJoinEvent(e.target.id, id))
    } else {
      history.push('/signin')
    }
  }
  const leaveEventHandler = (e) => {
    dispatch(fetchLeaveEvent(e.target.id, id))
  }
  return (
    <>
      {eventsData.length > 0 &&
        <div className="Timeline">
          <div style={{ width: "100%", height: "800px" }}>
            <Chrono
              mode="HORIZONTAL"

              itemWidth={1340 / eventsData.length}
              cardHeight={400}
              allowDynamicUpdate
              items={eventsData}
            >
              {eventsData?.map((el) => {
                return <div key={performance.now()}>
                  <p>{el.title}</p>
                  <p>{el.cardTitle}</p>
                  <p>{el.cardText}</p>
                  <p>{el.cardDetailedText}</p>
                  <ul>Участники: {el.party.map(e => <li key={performance.now()}><Link to={`/profile/${allUsers.find(el => el._id == e)._id}`}>{allUsers.find(el => el._id == e).nickname}</Link></li>)}</ul>
                  {!el.party.includes(id)
                    ? <SubmitButton style={{ width: '170px' }} id={el.id} onClick={joinEventHandler}>Присоединиться</SubmitButton>
                    : <SubmitButton style={{ width: '170px' }} id={el.id} onClick={leaveEventHandler}>Отказаться от участия</SubmitButton>
                  }</div>
              })}
              <div className="chrono-icons" key={performance.now()}>
                {eventsData?.map(() => {
                  return <img key={performance.now()} src="/images/basketball.svg" alt="" />
                })}
              </div>
            </Chrono>
          </div>
        </div >
      }
      {eventsData.length < 1 &&
        <div style={{ marginLeft: '500px', marginBottom: '50px' }}>
          <p className='FieldPage__Description-sc-1a6m6x3-13' style={{ fontSize: '24px' }}>НА СЕГОДНЯ ИВЕНТОВ ЕЩË НЕТ</p>
        </div>}
    </>
  );
}

export default Timeline;
