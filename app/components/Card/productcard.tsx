import { Product } from '../../models/interfaces';
import React from 'react';

const ProductCard: React.FC<Product> = ({ id, title, price, description, category, image, rating }) => {
  return (
    <li className="border rounded-lg shadow-md p-4 bg-white mt-2 flex flex-col justify-between transform transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:border-red-500">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-md mb-5"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Price:</strong> ${price}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Description:</strong> {description}
      </p>
      {category && (
        <p className="text-gray-500 mb-2">
          <strong>Category:</strong> {category}
        </p>
      )}
      {rating && (
        <p className="text-gray-500">
          <strong>Rating:</strong> {rating.rate} ({rating.count} reviews)
        </p>
      )}
    </li>
  );
};

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-8">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ProductCard;
export { ProductList };
