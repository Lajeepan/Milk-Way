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

  // Date formatting function
  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleAddToCart = () => {
    // Handle adding to cart logic
    console.log("Product added to cart");
  };

  const handleBuyNow = () => {
    // Handle the buy now logic (e.g., redirect to checkout)
    console.log("Proceeding to checkout");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <Image src={product.image} alt={product.name} width={400} height={300} />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{product.name}</h1>
          <h3 className={styles.productDescription}>{product.description}</h3>
          <div className={styles.priceQuantity}>
            <h3 className={styles.productPrice}>R.S {product.price}</h3>
            <h3 className={styles.productQuantity}>{product.quantity} L</h3>
          </div>
          <h3 className={styles.productDate}>{formattedDate}</h3>
          <div className={styles.buttonContainer}>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={styles.buyNowButton} onClick={()=> router.push(`/order`) }>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
