import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    params:{
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoicmFmYWVsLWlkIiwiYSI6ImNsODBlcHVtOTA1Z2ozb28zcm12NXg0MDYifQ.wjS7h8YUzWOxNZO07zeNyA'
    }
})


export default searchApi;