
export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    description: string;
    inStock: boolean;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      name: 'Leche Entera 1L',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
      price: 2.50,
      category: 'Lácteos',
      description: 'Leche entera fresca de alta calidad, rica en calcio y proteínas.',
      inStock: true
    },
    {
      id: '2',
      name: 'Pan Integral',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      price: 1.80,
      category: 'Panadería',
      description: 'Pan integral artesanal, elaborado con harina 100% integral.',
      inStock: true
    },
    {
      id: '3',
      name: 'Manzanas Rojas (1kg)',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
      price: 3.20,
      category: 'Frutas',
      description: 'Manzanas rojas frescas y crujientes, perfectas para cualquier momento.',
      inStock: true
    },
    {
      id: '4',
      name: 'Huevos Frescos (12 unidades)',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
      price: 4.50,
      category: 'Lácteos',
      description: 'Huevos frescos de gallinas criadas en libertad.',
      inStock: true
    },
    {
      id: '5',
      name: 'Arroz Blanco (1kg)',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
      price: 2.80,
      category: 'Granos',
      description: 'Arroz blanco de grano largo, ideal para cualquier comida.',
      inStock: true
    },
    {
      id: '6',
      name: 'Pollo Entero',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop',
      price: 8.90,
      category: 'Carnes',
      description: 'Pollo entero fresco, aproximadamente 1.5kg.',
      inStock: true
    },
    {
      id: '7',
      name: 'Tomates Frescos (1kg)',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
      price: 2.20,
      category: 'Verduras',
      description: 'Tomates frescos y jugosos, perfectos para ensaladas y salsas.',
      inStock: true
    },
    {
      id: '8',
      name: 'Yogur Natural (500ml)',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
      price: 1.95,
      category: 'Lácteos',
      description: 'Yogur natural sin azúcar añadida, rico en probióticos.',
      inStock: true
    }
  ];