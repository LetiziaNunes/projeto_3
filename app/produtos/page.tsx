'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import ProductCard from '../components/Card/productcard';

export default function Produtos() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/deisishop/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: cart }),
      });

      if (!response.ok) throw new Error('Failed to complete purchase');

      setCart([]);
      alert('Purchase successful!');
    } catch (error) {
      console.error(error);
      alert('Error processing purchase. Please try again.');
    }
  };

  const totalValue = cart.reduce((sum, product) => sum + product.price, 0).toFixed(2);

  if (error) return <div className="text-red-500 text-center mt-4">Error loading data</div>;
  if (isLoading) return <div className="text-red-500 text-center mt-4">Loading...</div>;
  if (!data || data.length === 0) return <div className="text-gray-500 text-center mt-4">No data available!</div>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products..."
        className="border p-2 rounded w-full mb-6"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            rating={product.rating}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((product, index) => (
                <li
                  key={`€{product.id}-€{index}`}
                  className="border rounded-lg shadow-md p-4 bg-white flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-bold">{product.title}</h3>
                  <p className="text-gray-600">{product.price}€</p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-[#72050e] text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition mt-2"
                  >
                    Remove from Cart
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-lg font-semibold">
              Total: {totalValue}€
            </div>
            <button
              onClick={handlePurchase}
              className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 transition mt-6"
            >
              Purchase
            </button>
          </>
        )}
      </div>
    </main>
  );
}
