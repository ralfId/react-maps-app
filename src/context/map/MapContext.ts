/* eslint import/no-webpack-loader-symtax: off */

import { createContext } from "react"
//@ts-ignore
import { Map, Marker } from "!mapbox-gl";

interface IMapContextProps{
    isMapReady: boolean;
    map?: Map;
    markers?: Marker[];
    getDirectionRoute: (start: [number, number], end: [number, number]) => void;

    //functions
    setMap: (map: Map) => void;
}

export const MapContext = createContext({}  as IMapContextProps )   