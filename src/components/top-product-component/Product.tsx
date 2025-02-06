"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "./Product.module.css"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`); // Navigate to the single product page
  };

  return (
    <div>
      <h1 className={Styles.productHeader}>Products</h1>
      <div className={Styles.container}>
        {products.slice(0, 10).map((product) => ( // Only show the first 10 products
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)} // Navigate on click
            className={Styles.productCard}
          >
            <Image
              className={Styles.Image}
              src={product.image.startsWith("http") ? product.image : `/images/${product.image}`}
              alt={product.name}
              width={200}
              height={200}
            />
            <span className={Styles.Name}>{product.name}</span>
            <div className={Styles.bottom}>
              <span className={Styles.price}>R.S {product.price}</span>
              <span className={Styles.rating}>Rating: 4.5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
