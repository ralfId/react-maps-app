import { Feature } from "../../interfaces/places";
import { IPlaceState } from "./PlacesProvider"

type PlacesActions =
    { type: 'setUserLocation', payload: [number, number] } |
    { type: 'setPlaces', payload: Feature[] } |
    { type: 'setLoadingPlaces' }

export const placesReducer = (state: IPlaceState, action: PlacesActions): IPlaceState => {
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: [],
            }
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        default:
            return state;
    }
}