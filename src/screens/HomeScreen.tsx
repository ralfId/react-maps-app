import { MapView, ReactLogo, SearchContainer } from "../components"
import { BtnMyLocation } from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView/>
            <BtnMyLocation/>
            <ReactLogo/>
            <SearchContainer/>
        </div>
    )
}
