import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers/getUserLocation";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { searchApi } from "../../apis";
import { Feature, IPlacesResponse } from "../../interfaces/places";

export interface IPlaceState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: IPlaceState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then(coords => dispatch({ type: 'setUserLocation', payload: coords }))
    }, [])

const searchPlace = async (query: string ): Promise<Feature[]>=>{
    if(query.length <= 0 ){
        dispatch({ type: 'setPlaces', payload: [] });
        return []
        }; //TODO: Limpiar el state de los lugares

    if(!state.userLocation) throw new Error('No se ha podido obtener la ubicación del usuario');

    dispatch({type: 'setLoadingPlaces'});

    const req = await searchApi.get<IPlacesResponse>(`${query}.json`, {
        params:{
            proximity: state.userLocation.join(','),
        }
    })

    dispatch({type: 'setPlaces', payload: req.data.features});
    
    return req.data.features;
}

    return (
        <PlacesContext.Provider value={{
            ...state,

            //Methods
            searchPlace
        }}>
            {
                children
            }
        </PlacesContext.Provider>
    )
}
