import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Comercio {
  id: number;
  supermercado: string;
  direccion: string;
}

const Comercios: React.FC = () => {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);

  const [showMap, setShowMap] = useState(false);
  const [selectedDireccion, setSelectedDireccion] = useState<string | null>(null);
  const [comercioCoords, setComercioCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  // Icono de marcador Leaflet
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setUserCoords(null)
    );
  }, []);

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/comercios');
        const data = await res.json();
        setComercios(data);
      } catch (err) {
        console.error('Error al cargar comercios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComercios();
  }, []);

  const handleOpenMap = async (direccion: string) => {
    setShowMap(true);
    setMapLoading(true);
    setSelectedDireccion(direccion);
    setComercioCoords(null);
  
    try {
      const res = await fetch(`http://127.0.0.1:8000/comercios/geocode?direccion=${encodeURIComponent(direccion)}`);
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
  
      const data = await res.json();
  
      if (data.lat && data.lon) {
        setComercioCoords({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
      } else {
        console.warn('Coordenadas inválidas para dirección:', direccion);
      }
    } catch (err) {
      console.error('Error obteniendo coordenadas:', err);
    } finally {
      setMapLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Listado de Comercios</h1>
        <p className="text-gray-600 mb-6">Haz clic en "Ver ubicación" para ver la dirección en el mapa.</p>

        {loading ? (
          <p className="text-center text-gray-500">Cargando comercios...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Supermercado</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Dirección</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comercios.map((comercio) => (
                  <tr key={comercio.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{comercio.supermercado}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{comercio.direccion}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenMap(comercio.direccion)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Ver ubicación
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Mapa */}
        {showMap && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Ubicación: {selectedDireccion}</h2>
                <button
                  onClick={() => setShowMap(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ✕
                </button>
              </div>
              <div style={{ height: '400px', width: '100%' }} className="p-4">
                {mapLoading || !comercioCoords ? (
                  <p className="text-center text-gray-600">Cargando ubicación...</p>
                ) : (
                  <MapContainer
                    center={[comercioCoords.lat, comercioCoords.lon]}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[comercioCoords.lat, comercioCoords.lon]} icon={markerIcon}>
                      <Popup>Comercio</Popup>
                    </Marker>
                    {userCoords && (
                      <Marker position={[userCoords.lat, userCoords.lon]} icon={markerIcon}>
                        <Popup>Tu ubicación</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Comercios;
