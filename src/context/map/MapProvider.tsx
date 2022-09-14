/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useEffect, useReducer } from "react";
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { IDirections } from "../../interfaces/directions";

export interface IMapState {
    isMapReady: boolean;
    map?: Map;
    markers?: Marker[];
}

const INITIAL_STATE: IMapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}
export const MapProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);


    useEffect(() => {
        state.markers?.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];


        for (const place of places) {
            const [lng, lat] = place.center;

            //create popup for each place
            const popup = new Popup().setHTML(`
                <h6>${place.text_es}</h6>
                <p>${place.place_name_es}</p>
            `);


            //create marker for each place
            const marker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!);

            newMarkers.push(marker);
        }

        dispatch({ type: 'SET_MARKERS', payload: newMarkers });

    }, [places])

    const setMap = (map: Map) => {
        new Marker({ color: 'red' }).setLngLat(map.getCenter()).addTo(map);

        dispatch({ type: 'SET_MAP', payload: map })
    }

    const getDirectionRoute = async (start: [number, number], end: [number, number]) => {
        const route = await directionsApi.get<IDirections>(`${start};${end}`);

        const { duration, distance, geometry } = route.data.routes[0];

        let kms = distance / 1000;
        kms = Math.round(kms * 100) / 100;

        const minutes = Math.round(duration / 60);

        const bounds = new LngLatBounds(start, start);

        for (const coord of geometry.coordinates) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        //center map between two points
        state.map?.fitBounds(bounds, { padding: 100 });

        //create polyline
        const DataSource: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: geometry.coordinates
                    }
                }]
            }
        }

        if(state.map?.getLayer('RouteString')){
            state.map?.removeLayer('RouteString');
            state.map?.removeSource('RouteString');
        }

        //add polyline to map
        state.map?.addSource('RouteString', DataSource);

        //style polyline
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint:{
                'line-color': 'green',
                'line-width': 3
            }
        })
    };



    return (
        <MapContext.Provider value={{
            ...state, setMap,
            //methods
            //methods
            getDirectionRoute
        }}

        >
            {
                children
            }

        </MapContext.Provider>
    )
}
