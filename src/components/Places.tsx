import React, {useContext, useState} from 'react'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places';

export const Places = () => {

    const { places, isLoadingPlaces, userLocation} = useContext(PlacesContext);
    const { map, getDirectionRoute } = useContext(MapContext);
    const [activePlaceId, setActivePlaceId] = useState('');

    if(isLoadingPlaces){
        return(
            <div className="bg-warning px-2 py-2 mt-2">
                <h6 className="text-center">Loading places...</h6>
            </div>
        )
    }

    const flyToPlace = (place: Feature) =>{
        setActivePlaceId(place.id);
        const [lng, lat] = place.geometry.coordinates;
        map?.flyTo({
            center: [lng, lat],
            zoom:15,
        })

    }

    const getDirection = (place: Feature) =>{
        if(!userLocation) return;

        const [lng, lat ] =  place.center;

        getDirectionRoute(userLocation, [lng, lat]);

    }

    return (
        <ul className='list-group mt-3'>

            {
                places.map(place =>(
                    <li key={place.id} className={`list-group-item list-group-item-action ${(activePlaceId === place.id) && 'active'}`} onClick={()=>{ flyToPlace(place) }}> 
                        <h6><b>{place.text}</b></h6>
                        <p style={{ fontSize: '12px' }}>{place.place_name}</p>
                        <button className={` btn-sm ${(activePlaceId === place.id) ? 'btn btn-outline-light' : 'btn btn-primary '}`} 
                                onClick={()=>{ getDirection(place) }}>
                            
                            Go to place</button>
                    </li>
                ))
            }

        </ul>
    )
}
