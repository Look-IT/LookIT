import { MemoriesProvider } from "../contexts/MemoriesContext"
import MapViewScreen from "./MapViewScreen"

const HomeScreen = () => {
  return (
    <MemoriesProvider>
      <MapViewScreen/>
    </MemoriesProvider>
  )
}

export default HomeScreen;