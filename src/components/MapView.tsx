/* eslint import/no-webpack-loader-symtax: off */
//@ts-ignore
import { Map } from "!mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";


export const MapView = () => {

    const mapDivRef = useRef<HTMLDivElement>(null);
    const { userLocation, isLoading } = useContext(PlacesContext);
    const { setMap } = useContext(MapContext);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDivRef.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 9, // starting zoom
            });

            setMap(map);
        }
    }, [isLoading])

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <div ref={mapDivRef}
            style={{  width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }}
        >
            {
                userLocation?.join(', ')
            }

        </div>
    )
}
