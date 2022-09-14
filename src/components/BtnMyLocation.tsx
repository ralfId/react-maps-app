import { useContext } from "react"
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
    const{map, isMapReady  } = useContext(MapContext);
    const{userLocation  } = useContext(PlacesContext);

    const GetMyLocation = () => {
        if(!isMapReady) throw new Error('Map is not ready');
        if(!userLocation) throw new Error('User location is not ready');
        map?.flyTo({
            center: userLocation,
            zoom: 14
        })
    }

    return (
        <button className="btn btn-primary"
            style={{ position: 'fixed', top: 20, left: 1000, zIndex: 999 }}
            onClick={GetMyLocation}
        >
            Get my location

        </button>
    )
}
