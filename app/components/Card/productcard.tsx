import React from 'react';
import { Product } from '../../models/interfaces';

const ProductCard: React.FC<Product & { onAddToCart: () => void }> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  onAddToCart,
}) => {
  return (
    <li className="border rounded-lg shadow-md p-4 bg-white mt-2 flex flex-col justify-between transform transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:border-red-500">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-md mb-5"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Price:</strong> {price}€
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
      <button
        onClick={onAddToCart}
        className="bg-[#72050e] text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition mt-2"
      >
        Add to Cart
      </button>
    </li>
  );
};

export default ProductCard;
