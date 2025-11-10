import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, loading } = useCart();

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(itemId);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center"
            >
              <img
                src={item.product.images[0] || 'https://via.placeholder.com/100'}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1 ml-4">
                <Link
                  to={`/products/${item.product._id}`}
                  className="text-lg font-semibold hover:text-primary"
                >
                  {item.product.name}
                </Link>
                <p className="text-gray-600">{item.product.brand}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  ${item.product.price}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity, -1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="px-4 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity, 1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold text-primary">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition mb-3">
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
