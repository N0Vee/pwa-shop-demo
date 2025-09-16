"use client";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cart-context";

const products = [
  { id: 1, name: "Coffee Mug", price: 150, image: "/icons/coffee-mug.jpg" },
  { id: 2, name: "Notebook", price: 90, image: "/icons/notebook.jpg" },
  { id: 3, name: "Headphones", price: 1200, image: "/icons/headphone.jpg" },
];

export default function Home() {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (p) => setCart([...cart, p]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Mini Shop</h1>
        <Link href="/cart" className="text-blue-500 font-semibold">
          Cart ({cart.length})
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
            <img src={p.image} alt={p.name} className="w-24 h-24 mb-3" />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-gray-500 mb-2">฿{p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="bg-blue-600 text-white rounded-xl px-4 py-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
