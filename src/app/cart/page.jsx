"use client";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../cart-context";

export default function CartPage() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Your Cart</h1>
        <Link href="/" className="text-blue-500 font-semibold">
          Back
        </Link>
      </header>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cart.map((p, i) => (
            <div key={i} className="flex justify-between bg-white shadow rounded-xl p-3">
              <span>{p.name}</span>
              <span>฿{p.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>฿{total}</span>
          </div>
          <button className="w-full bg-green-600 text-white rounded-xl py-2 mt-4">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
