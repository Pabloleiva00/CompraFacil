import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../components/Navbar';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  link: string;
  supermercado: string;
  tipo: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [groupProducts, setGroupProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/productos/grupos/`);
        const data = await res.json();
        const grupoEncontrado = data.find((g: any) => g.grupo === parseInt(id));
        if (!grupoEncontrado) throw new Error("Grupo no encontrado");
        setGroupProducts(grupoEncontrado.productos);
      } catch (error) {
        console.error("Error al cargar grupo:", error);
        setGroupProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleAddToCart = (link: string) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando grupo...</p>;
  }

  if (groupProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Grupo no encontrado</h1>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Comparativa en supermercados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupProducts.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-4 space-y-3">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="rounded w-full object-contain"
                />
                <h4 className="text-base font-semibold">{p.nombre}</h4>
                <p className="text-green-600 font-bold text-lg">${p.precio}</p>
                <p className="text-sm text-gray-500 capitalize">{p.supermercado}</p>
                <Button onClick={() => handleAddToCart(p.link)} className="w-full">
                  Ir al supermercado
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
