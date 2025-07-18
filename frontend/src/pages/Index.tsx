import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  link: string;
  supermercado: string;
  tipo: string;
  grupo?: number;
}

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedProducts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/productos/grupos/');
        const data = await res.json();

        const primerosProductos = data
          .map((grupo: { grupo: number; productos: Product[] }) => ({
            ...grupo.productos[0],
            grupo: grupo.grupo,
          }))
          .filter(Boolean);

        setProducts(primerosProductos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {user ? `¡Bienvenido ${user.name}!` : '¡Bienvenido a Comprafácil!'}
          </h1>
          <p className="text-lg text-gray-600">
            Encuentra los mejores productos de supermercado al mejor precio
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Productos Destacados</h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} onClick={() => navigate(`/grupo/${product.grupo}`)} className="cursor-pointer">
                <ProductCard
                  product={{
                    id: product.id.toString(),
                    nombre: product.nombre,
                    imagen: product.imagen,
                    precio: product.precio,
                    supermercado: product.supermercado,
                    tipo: product.tipo,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
