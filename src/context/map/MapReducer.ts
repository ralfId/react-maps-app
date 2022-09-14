/* eslint import/no-webpack-loader-symtax: off */
//@ts-ignore
import { Map, Marker } from "!mapbox-gl";
import { IMapState } from "./MapProvider";

type MapActions = 
|   { type: 'SET_MAP'; payload: Map; }
|   { type: 'SET_MARKERS'; payload: Marker[]; }
|   { type: 'CLEAR_MARKERS';  }

export const MapReducer = (state: IMapState, action: MapActions) => {
    switch (action.type) {
        case 'SET_MAP':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };
        case 'SET_MARKERS':
            return{
                ...state,
                markers: action.payload
            }
        case 'CLEAR_MARKERS':
            return {
                ...state,
                markers: []
            }
        default:
            return state;
    }
}