import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar producto:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    window.open(product.link, '_blank');
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando producto...</p>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.tipo}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.nombre}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Producto del supermercado {product.supermercado}.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    ${product.precio.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Precio por unidad</p>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ir al supermercado
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Información del producto
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Tipo:</dt>
                  <dd className="text-gray-900 capitalize">{product.tipo}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">ID:</dt>
                  <dd className="text-gray-900">{product.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Supermercado:</dt>
                  <dd className="text-gray-900 capitalize">{product.supermercado}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;