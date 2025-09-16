"use client";
import { useContext } from "react";
import { CartContext } from "../cart-context";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const updateQuantity = (productId, change) => {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      const newCart = [...cart];
      if (change > 0) {
        // Add another instance
        newCart.splice(productIndex, 0, cart[productIndex]);
      } else if (change < 0) {
        // Remove one instance
        newCart.splice(productIndex, 1);
      }
      setCart(newCart);
    }
  };

  // Group cart items by product ID for quantity display
  const groupedCart = cart.reduce((acc, item, index) => {
    const existing = acc.find(group => group.product.id === item.id);
    if (existing) {
      existing.quantity += 1;
      existing.indices.push(index);
    } else {
      acc.push({
        product: item,
        quantity: 1,
        indices: [index]
      });
    }
    return acc;
  }, []);

  return (
    <div className="container animate-fade-in">
      {/* Header */}
      <header className="py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">Your Cart</h1>
            <p className="text-gray-600">{cart.length} items total</p>
          </div>
          
          {/* Desktop back button */}
          <div className="hidden md:block">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H3m4 6v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {groupedCart.map((group, groupIndex) => (
              <div key={`${group.product.id}-${groupIndex}`} className="card p-4 md:p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={group.product.image || "/next.svg"} 
                      alt={group.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-lg truncate">{group.product.name}</h3>
                    <p className="text-gray-600 text-sm">{group.product.description || "Premium quality product"}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-indigo-600">฿{group.product.price}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(group.product.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-semibold">{group.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(group.product.id, 1)}
                          className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(group.indices[0])}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>฿{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>฿{Math.round(total * 0.07)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-indigo-600">฿{total + Math.round(total * 0.07)}</span>
              </div>
            </div>

            <button className="btn btn-primary w-full text-lg py-4">
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Secure checkout with SSL encryption
            </p>
          </div>

          {/* Recommended Products */}
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">You might also like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-full h-20 bg-gray-100 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Sample Product</p>
                  <p className="text-xs text-gray-600">฿99</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
