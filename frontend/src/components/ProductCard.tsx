import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Product {
  id: number | string;
  nombre: string;
  precio: number;
  imagen: string;
  link: string;
  supermercado: string;
  tipo: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-3">
            <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {product.nombre}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.tipo}</p>
        </CardContent>
        <CardFooter className="pt-0 px-4 pb-4">
        <div className="w-full">
            <p className="text-lg font-bold text-green-600">${product.precio.toFixed(2)}</p>
        </div>
        </CardFooter>
    </Card>
    </Link>

  );
};

export default ProductCard;
