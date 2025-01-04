'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import ProductCard from '../components/Card/productcard';

export default function Produtos() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

  const [search, setSearch] = useState<string>(''); // Estado para o texto de busca
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Estado para os produtos filtrados

  // Filtrar os produtos com base no valor de search e data
  useEffect(() => {
    if (data) {
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  if (error) return <div className="text-red-500 text-center mt-4">Error loading data</div>;
  if (isLoading) return <div className="text-red-500 text-center mt-4">Loading...</div>;
  if (!data || data.length === 0) return <div className="text-gray-500 text-center mt-4">No data available!</div>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {/* Input para pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o valor de search
          placeholder="Search for products..."
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-red-300"
        />
      </div>

      {/* Renderização dos produtos filtrados */}
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
          />
        ))}
      </ul>
    </main>
  );
}
