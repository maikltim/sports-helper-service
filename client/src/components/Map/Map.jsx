import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import tw from "twin.macro";
import styled from "styled-components";
import './Map.css';
import "@reach/combobox/styles.css";
import { fetchInitMarkers } from '../../store/ducks/markers/asyncFunction';
import { Link } from 'react-router-dom';
import mapStyles from './mapStyles';


const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
`;
const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles
};

const center = {
  lat: 59.938480,
  lng: 30.312480
};


function Map() {

  const dispatch = useDispatch();
  const { markers } = useSelector(state => state.map);

  useEffect(() => {
    dispatch(fetchInitMarkers());
  }, [dispatch]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    console.log(mapRef.current)
    console.log(lat, lng);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return "ERROR LOADING MAPS";
  if (!isLoaded) return "LOADING...";


  return (
    <Container>
      <HeroContainer>
        <Content>
          <div className="locate">
            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    panTo({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  },
                  () => null
                );
              }}>
              <img src="/images/compass.svg" alt="compass" />
            </button>
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onLoad={onMapLoad}>
            {markers.map(marker => <Marker key={marker._id}
              position={{
                lat: marker.lat,
                lng: marker.lng
              }}
              icon={{
                url: '/images/basketball.svg', // ???
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15)
              }}
              onClick={() => {
                setSelected((selected) => selected = { marker });
              }} />)}

            {selected ? (
              <InfoWindow position={{ lat: selected.marker.lat, lng: selected.marker.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <p>{selected.marker.info}</p>
                  <Link to={`/field/${selected.marker.field}`}>Подробнее</Link>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Content>
      </HeroContainer>
    </Container >

  );
};

export default Map;
