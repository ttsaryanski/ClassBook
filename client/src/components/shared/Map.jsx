import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    const position = [42.6361839, 23.3697986];

    return (
        <MapContainer
            center={position}
            zoom={17} // Увеличение за по-добра видимост
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
                <Popup>
                    Software University
                    <br /> София, България
                </Popup>
            </Marker>
        </MapContainer>
    );
}
