// src/app/product/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../singleproduct/Single-product.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: string;
  quantity?: number;
}

export default function Singleproduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string }; // Access the dynamic id from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Or handle loading state here
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <Image src={product.image} alt={product.name} width={300} height={300} />
      </div>
      <div className={styles.productDetails}>
        <h2 className={styles.productPrice}>R.S {product.price}</h2>
        <p className={styles.productDate}>{product.createdAt}</p>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productQuantity}> {product.quantity} L</p>
      </div>
    </div>
  );
}
