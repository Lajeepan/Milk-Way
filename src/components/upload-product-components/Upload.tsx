import { useState } from 'react';
import Image from 'next/image';
import styles from './Upload.module.css';

interface Product {
  name: string;
  price: number;
  image: string;
  createdAt?: Date;
  description?: string;
  quantity?: number;
}

interface ApiResponse {
  product?: Product;
  error?: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    description: '',
    createdAt: new Date(),
    quantity: 0,
  });
  const [preview, setPreview] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setPreview(result); // Base64 string
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: product }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error(result.error);
        alert('Error adding product');
      } else {
        const result: ApiResponse = await response.json();
        console.log('Product added:', result.product);
        alert('Product added successfully');
        // Optionally, reset the form or handle additional UI changes
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addProductForm}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
        className={styles.inputField}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
        required
        className={styles.inputField}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        className={styles.inputField}
      />
      {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        className={styles.inputField}
      />
      <input
        type="date"
        placeholder="Created At"
        value={product.createdAt ? product.createdAt.toISOString().split('T')[0] : ''}
        onChange={(e) => setProduct({ ...product, createdAt: new Date(e.target.value) })}
        className={styles.inputField}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={product.quantity || ''}
        onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value, 10) })}
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Add Product</button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}
