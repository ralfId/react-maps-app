import axios from 'axios';

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
    params:{
        access_token: 'pk.eyJ1IjoicmFmYWVsLWlkIiwiYSI6ImNsODBlcHVtOTA1Z2ozb28zcm12NXg0MDYifQ.wjS7h8YUzWOxNZO07zeNyA',
        language: 'es',
        annotations: 'distance',
        geometries: 'geojson',
        overview: 'full',
        steps: true,
        alternatives: false,
    }
})


export default directionsApi;