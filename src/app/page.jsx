"use client";
import { useContext } from "react";
import { CartContext } from "./cart-context";

const products = [
  { 
    id: 1, 
    name: "Premium Coffee Mug", 
    price: 150, 
    image: "/icons/coffee-mug.jpg",
    description: "Perfect for your morning coffee",
    category: "Kitchen"
  },
  { 
    id: 2, 
    name: "Leather Notebook", 
    price: 90, 
    image: "/icons/notebook.jpg",
    description: "High-quality leather bound journal",
    category: "Stationery"
  },
  { 
    id: 3, 
    name: "Wireless Headphones", 
    price: 1200, 
    image: "/icons/headphone.jpg",
    description: "Premium audio experience",
    category: "Electronics"
  },
  { 
    id: 4, 
    name: "Smart Watch", 
    price: 2500, 
    image: "/icons/smart-watch.jpg",
    description: "Track your fitness goals",
    category: "Electronics"
  },
];

export default function Home() {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // Add some visual feedback
    const button = document.querySelector(`[data-product-id="${product.id}"]`);
    if (button) {
      button.textContent = "Added!";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1000);
    }
  };

  return (
    <div className="container animate-fade-in">
      {/* Header */}
      <header className="py-6 md:py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mini Shop
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing products</p>
        </div>
      </header>

      {/* Desktop Cart Summary */}
      <div className="hidden md:block mb-8">
        <div className="card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H3m4 6v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Your Cart</p>
              <p className="text-sm text-gray-600">{cart.length} items</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">
              ฿{cart.reduce((sum, p) => sum + p.price, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="card p-6 animate-fade-in">
            <div className="flex flex-col h-full">
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-indigo-600">฿{product.price}</span>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                data-product-id={product.id}
                className="btn btn-primary w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <section className="mt-12 mb-8">
        <div className="card p-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-3">Special Offer</h2>
          <p className="mb-4 opacity-90">Get 20% off on your first order of ฿500 or more</p>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
