"use client";

import { useState } from "react";
import styles from "./Order.module.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Order failed");

      alert("Order placed successfully!");
      setFormData({ firstName: "", streetAddress: "", apartment: "", city: "", phoneNumber: "", email: "" });
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {["Name", "streetAddress", "apartment", "city", "phoneNumber", "email"].map((field) => (
        <div className={styles.field} key={field}>
          <label>{field.replace(/([A-Z])/g, " $1").toUpperCase()}*</label>
          <input type="text" name={field} value={formData[field as keyof typeof formData]} onChange={handleChange} required />
        </div>
      ))}
      <button type="submit" className={styles.button}>Place Order</button>
    </form>
  );
};

export default OrderForm;
