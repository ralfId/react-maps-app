/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { MapsApp } from './MapsApp';
//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoicmFmYWVsLWlkIiwiYSI6ImNsODBlcHVtOTA1Z2ozb28zcm12NXg0MDYifQ.wjS7h8YUzWOxNZO07zeNyA';


if(!navigator.geolocation){
  alert('Your browser not support Geolocation');
  throw new Error('Your browser not support Geolocation')
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);


