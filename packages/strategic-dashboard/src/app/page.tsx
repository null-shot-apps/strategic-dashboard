'use client';

import { useState } from 'react';

// Mock data
const RESTAURANTS = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5 },
  { id: 2, name: 'Burger Barn', cuisine: 'American', rating: 4.2 },
  { id: 3, name: 'Sushi Station', cuisine: 'Japanese', rating: 4.8 },
  { id: 4, name: 'Taco Town', cuisine: 'Mexican', rating: 4.3 },
];

const MENU_ITEMS: Record<number, Array<{ id: number; name: string; price: number }>> = {
  1: [
    { id: 101, name: 'Margherita Pizza', price: 12.99 },
    { id: 102, name: 'Pepperoni Pizza', price: 14.99 },
    { id: 103, name: 'Veggie Pizza', price: 13.99 },
    { id: 104, name: 'Garlic Bread', price: 5.99 },
  ],
  2: [
    { id: 201, name: 'Classic Burger', price: 9.99 },
    { id: 202, name: 'Cheese Burger', price: 10.99 },
    { id: 203, name: 'Bacon Burger', price: 12.99 },
    { id: 204, name: 'Fries', price: 3.99 },
  ],
  3: [
    { id: 301, name: 'California Roll', price: 8.99 },
    { id: 302, name: 'Salmon Nigiri', price: 11.99 },
    { id: 303, name: 'Tuna Sashimi', price: 13.99 },
    { id: 304, name: 'Miso Soup', price: 4.99 },
  ],
  4: [
    { id: 401, name: 'Beef Tacos', price: 8.99 },
    { id: 402, name: 'Chicken Tacos', price: 7.99 },
    { id: 403, name: 'Veggie Burrito', price: 9.99 },
    { id: 404, name: 'Nachos', price: 6.99 },
  ],
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Page = 'home' | 'menu' | 'cart' | 'checkout' | 'confirmation';

export default function QuickBite() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const addToCart = (item: { id: number; name: string; price: number }) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('confirmation');
    setTimeout(() => {
      setCart([]);
      setCustomerName('');
      setDeliveryAddress('');
      setPhoneNumber('');
    }, 100);
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      backgroundColor: '#ff6b35',
      color: 'white',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '28px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    cartButton: {
      backgroundColor: 'white',
      color: '#ff6b35',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    restaurantGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    },
    restaurantCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    menuItem: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    button: {
      backgroundColor: '#ff6b35',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px',
    },
    backButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    cartItem: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '10px',
    },
    quantityButton: {
      backgroundColor: '#ff6b35',
      color: 'white',
      border: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '4px',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      marginBottom: '15px',
      outline: 'none',
    },
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>🍔 QuickBite</div>
            <button
              style={styles.cartButton}
              onClick={() => setCurrentPage('cart')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </header>
        <div style={styles.content}>
          <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>
            Choose a Restaurant
          </h1>
          <div style={styles.restaurantGrid}>
            {RESTAURANTS.map(restaurant => (
              <div
                key={restaurant.id}
                style={styles.restaurantCard}
                onClick={() => {
                  setSelectedRestaurant(restaurant.id);
                  setCurrentPage('menu');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
                  {restaurant.name}
                </h2>
                <p style={{ color: '#666', marginBottom: '5px' }}>
                  🍽️ {restaurant.cuisine}
                </p>
                <p style={{ color: '#ff6b35', fontWeight: '600' }}>
                  ⭐ {restaurant.rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Menu Page
  if (currentPage === 'menu' && selectedRestaurant) {
    const restaurant = RESTAURANTS.find(r => r.id === selectedRestaurant);
    const menuItems = MENU_ITEMS[selectedRestaurant] || [];

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>🍔 QuickBite</div>
            <button
              style={styles.cartButton}
              onClick={() => setCurrentPage('cart')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Restaurants
          </button>
          <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>
            {restaurant?.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            {restaurant?.cuisine} • ⭐ {restaurant?.rating}
          </p>
          <div style={styles.menuGrid}>
            {menuItems.map(item => (
              <div key={item.id} style={styles.menuItem}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '24px', color: '#ff6b35', fontWeight: '700', marginBottom: '10px' }}>
                  ${item.price.toFixed(2)}
                </p>
                <button
                  style={styles.button}
                  onClick={() => addToCart(item)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cart Page
  if (currentPage === 'cart') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo} onClick={() => setCurrentPage('home')} style={{ ...styles.logo, cursor: 'pointer' }}>
              🍔 QuickBite
            </div>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
          <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>
            Your Cart
          </h1>
          {cart.length === 0 ? (
            <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginTop: '60px' }}>
              Your cart is empty. Add some delicious items!
            </p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', marginBottom: '5px', color: '#333' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '18px', color: '#ff6b35', fontWeight: '600' }}>
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={styles.quantityControls}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <span style={{ fontSize: '18px', color: '#666', marginLeft: '20px' }}>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                marginTop: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '700', color: '#333' }}>
                  <span>Total:</span>
                  <span style={{ color: '#ff6b35' }}>${getTotalPrice()}</span>
                </div>
                <button
                  style={{ ...styles.button, marginTop: '20px', fontSize: '18px', padding: '15px' }}
                  onClick={() => setCurrentPage('checkout')}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Checkout Page
  if (currentPage === 'checkout') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo} onClick={() => setCurrentPage('home')} style={{ ...styles.logo, cursor: 'pointer' }}>
              🍔 QuickBite
            </div>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('cart')}
          >
            ← Back to Cart
          </button>
          <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>
            Checkout
          </h1>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '600px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <form onSubmit={handlePlaceOrder}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter your name"
              />

              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter delivery address"
              />

              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter phone number"
              />

              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '6px',
                marginBottom: '20px',
              }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>
                  Order Summary
                </h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{
                  borderTop: '2px solid #dee2e6',
                  marginTop: '15px',
                  paddingTop: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#333',
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#ff6b35' }}>${getTotalPrice()}</span>
                </div>
              </div>

              <button
                type="submit"
                style={{ ...styles.button, fontSize: '18px', padding: '15px' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation Page
  if (currentPage === 'confirmation') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>🍔 QuickBite</div>
          </div>
        </header>
        <div style={styles.content}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '60px 40px',
            maxWidth: '600px',
            margin: '60px auto',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
            <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
              Order Confirmed!
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
              Thank you for your order. Your delicious food is on its way!
            </p>
            <button
              style={{ ...styles.button, maxWidth: '300px', margin: '0 auto', fontSize: '18px', padding: '15px' }}
              onClick={() => setCurrentPage('home')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
            >
              Order Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}



