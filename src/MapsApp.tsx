import { MapProvider } from "./context"
import { PlacesProvider } from "./context/places/PlacesProvider"
import { HomeScreen } from "./screens/HomeScreen"

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  )
}
