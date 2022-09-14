import { useContext, useRef } from 'react'
import { PlacesContext } from '../context';
import { Places } from './Places';

export const SearchContainer = () => {

    const debounceSearch = useRef<NodeJS.Timeout>();
    const { searchPlace } = useContext(PlacesContext);

    const onQueryChanged = (event:any)=>{
        if(debounceSearch.current){
            clearTimeout(debounceSearch.current);
        }

        debounceSearch.current = setTimeout(()=>{
            searchPlace(event.target.value);
        }, 1000);
    }

    return (
        <div className="search-container">
            <input type="text" className="form-control" placeholder="Search a place..." onChange={ onQueryChanged }/>
            <Places/>
        </div>
    )
}
