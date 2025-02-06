"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./Cart.module.css"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Milk 1L",
      price: 200.0,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20112644-MudHhWf0NCBqgcpcOsLEfEPyQjnlOc.png",
    },
    {
      id: 2,
      name: "Curd 1L",
      price: 500.0,
      quantity: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20112644-MudHhWf0NCBqgcpcOsLEfEPyQjnlOc.png",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping in this example
  const total = subtotal + shipping

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>

      {items.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <div className={styles.product}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={50}
              height={50}
              className={styles.productImage}
            />
            <span>{item.name}</span>
          </div>
          <div>RS {item.price.toFixed(2)}</div>
          <div>
            <input
              type="number"
              className={styles.quantity}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>RS {(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

    

      <div className={styles.cartTotal}>
        <h2 className={styles.cartTotalHeader}>Cart Total</h2>
        <div className={styles.cartTotalRow}>
          <span>Subtotal:</span>
          <span>RS {subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.cartTotalRow}>
          <span>Shipping:</span>
          <span>{shipping === 0 ? "Free" : `RS ${shipping.toFixed(2)}`}</span>
        </div>
        <div className={styles.cartTotalRow}>
          <span>Total:</span>
          <span>RS {total.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>Process to checkout</button>
      </div>
    </div>
  )
}

