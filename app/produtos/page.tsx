'use client';

import React from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';

export default function Produtos() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<Product[], Error>('api/products', fetcher);

  if (error) return <div className="error">Error loading data</div>;
  if (isLoading) return <div className="loading">Loading...</div>;
  if (!data) return <div className="no-data">No data!</div>;

  return (
    <main className="products-main">
      <h1 className="products-title">Products</h1>
      <ul className="products-list">
        {data.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="product-description">
              <strong>Description:</strong> {product.description}
            </p>
            {product.category && (
              <p className="product-category">
                <strong>Category:</strong> {product.category}
              </p>
            )}
            {product.rating && (
              <p className="product-rating">
                <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
