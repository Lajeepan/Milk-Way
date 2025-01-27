"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Use useRouter from 'next/router'
import Image from "next/image";
import Styles from "./Single-product.module.css"; // Add styles for this page

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
  quantity: number;
}

export default function SingleProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter(); // Initialize useRouter
  const { id } = router.query; // Get the product ID from the URL params

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) { // Ensure the ID is available before fetching
        try {
          const res = await fetch(`/api/product/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch product details");
          }
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          setError("Error fetching product details. Please try again later.");
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchProduct();
  }, [id]); // Re-fetch when the ID changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.singleProductContainer}>
      <Image
        src={product.image || "/default-image.jpg"} // Fallback image
        alt={product.name}
        width={300}
        height={300}
        className={Styles.image}
      />
      <h1 className={Styles.name}>{product.name}</h1>
      <p className={Styles.description}>{product.description}</p>
      <p className={Styles.price}>Price: R.S {product.price}</p>
      <p className={Styles.quantity}>Available Quantity: {product.quantity}</p>
      <p className={Styles.createdAt}>
        Added on: {new Date(product.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
