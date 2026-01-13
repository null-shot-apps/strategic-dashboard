'use client';

import { useState } from 'react';

// Mock data
const RESTAURANTS = [
  { 
    id: 1, 
    name: 'Pizza Palace', 
    cuisine: 'Italian', 
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: '🍕'
  },
  { 
    id: 2, 
    name: 'Burger Barn', 
    cuisine: 'American', 
    rating: 4.2,
    deliveryTime: '30-40 min',
    deliveryFee: 1.99,
    image: '🍔'
  },
  { 
    id: 3, 
    name: 'Sushi Station', 
    cuisine: 'Japanese', 
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 3.99,
    image: '🍣'
  },
  { 
    id: 4, 
    name: 'Taco Town', 
    cuisine: 'Mexican', 
    rating: 4.3,
    deliveryTime: '25-35 min',
    deliveryFee: 2.49,
    image: '🌮'
  },
];

const MENU_ITEMS: Record<number, Array<{ id: number; name: string; price: number; description: string; image: string }>> = {
  1: [
    { id: 101, name: 'Margherita Pizza', price: 12.99, description: 'Fresh mozzarella, tomatoes, basil', image: '🍕' },
    { id: 102, name: 'Pepperoni Pizza', price: 14.99, description: 'Classic pepperoni with extra cheese', image: '🍕' },
    { id: 103, name: 'Veggie Pizza', price: 13.99, description: 'Bell peppers, mushrooms, olives', image: '🍕' },
    { id: 104, name: 'Garlic Bread', price: 5.99, description: 'Toasted with garlic butter', image: '🥖' },
  ],
  2: [
    { id: 201, name: 'Classic Burger', price: 9.99, description: 'Beef patty, lettuce, tomato, pickles', image: '🍔' },
    { id: 202, name: 'Cheese Burger', price: 10.99, description: 'Double cheese, special sauce', image: '🍔' },
    { id: 203, name: 'Bacon Burger', price: 12.99, description: 'Crispy bacon, cheddar, BBQ sauce', image: '🍔' },
    { id: 204, name: 'Fries', price: 3.99, description: 'Crispy golden fries', image: '🍟' },
  ],
  3: [
    { id: 301, name: 'California Roll', price: 8.99, description: 'Crab, avocado, cucumber', image: '🍣' },
    { id: 302, name: 'Salmon Nigiri', price: 11.99, description: 'Fresh salmon over rice', image: '🍣' },
    { id: 303, name: 'Tuna Sashimi', price: 13.99, description: 'Premium tuna slices', image: '🍣' },
    { id: 304, name: 'Miso Soup', price: 4.99, description: 'Traditional Japanese soup', image: '🍜' },
  ],
  4: [
    { id: 401, name: 'Beef Tacos', price: 8.99, description: 'Seasoned beef, salsa, cilantro', image: '🌮' },
    { id: 402, name: 'Chicken Tacos', price: 7.99, description: 'Grilled chicken, fresh toppings', image: '🌮' },
    { id: 403, name: 'Veggie Burrito', price: 9.99, description: 'Black beans, rice, guacamole', image: '🌯' },
    { id: 404, name: 'Nachos', price: 6.99, description: 'Cheese, jalapeños, sour cream', image: '🧀' },
  ],
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Page = 'home' | 'menu' | 'cart' | 'checkout' | 'confirmation';

export default function QuickBite() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const addToCart = (item: { id: number; name: string; price: number; image: string }) => {
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
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      padding: '16px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e8e8e8',
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '26px',
      fontWeight: '700',
      cursor: 'pointer',
      color: '#1a1a1a',
      letterSpacing: '-0.5px',
    },
    cartButton: {
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '24px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    content: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 24px',
    },
    hero: {
      marginBottom: '40px',
    },
    heroTitle: {
      fontSize: '42px',
      fontWeight: '800',
      marginBottom: '12px',
      color: '#1a1a1a',
      letterSpacing: '-1px',
    },
    heroSubtitle: {
      fontSize: '18px',
      color: '#666',
      fontWeight: '400',
    },
    restaurantGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    },
    restaurantCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #f0f0f0',
    },
    restaurantImageContainer: {
      backgroundColor: '#f8f8f8',
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '80px',
      borderBottom: '1px solid #f0f0f0',
    },
    restaurantInfo: {
      padding: '20px',
    },
    restaurantName: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#1a1a1a',
      letterSpacing: '-0.3px',
    },
    restaurantMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '14px',
      color: '#666',
      marginBottom: '12px',
    },
    restaurantMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    },
    menuItem: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease',
      border: '1px solid #f0f0f0',
    },
    menuImageContainer: {
      backgroundColor: '#f8f8f8',
      height: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '70px',
      borderBottom: '1px solid #f0f0f0',
    },
    menuItemInfo: {
      padding: '20px',
    },
    menuItemName: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '6px',
      color: '#1a1a1a',
    },
    menuItemDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '12px',
      lineHeight: '1.5',
    },
    menuItemPrice: {
      fontSize: '24px',
      color: '#000000',
      fontWeight: '800',
      marginBottom: '12px',
    },
    button: {
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      padding: '14px 24px',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease',
    },
    backButton: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: '2px solid #e8e8e8',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    },
    cartItem: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #f0f0f0',
    },
    cartItemContent: {
      display: 'flex',
      gap: '16px',
      alignItems: 'start',
    },
    cartItemImage: {
      fontSize: '48px',
      flexShrink: 0,
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: '16px',
    },
    quantityButton: {
      backgroundColor: '#f5f5f5',
      color: '#1a1a1a',
      border: 'none',
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      transition: 'all 0.2s ease',
    },
    input: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      border: '2px solid #e8e8e8',
      borderRadius: '12px',
      marginBottom: '16px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      fontFamily: 'inherit',
    },
    totalCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      marginTop: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
    },
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>QuickBite</div>
            <button
              style={styles.cartButton}
              onClick={() => setCurrentPage('cart')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333333';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>🛒</span>
              <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </button>
          </div>
        </header>
        <div style={styles.content}>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>
              Food delivery to your door
            </h1>
            <p style={styles.heroSubtitle}>
              Order from the best local restaurants
            </p>
          </div>
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
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <div style={styles.restaurantImageContainer}>
                  {restaurant.image}
                </div>
                <div style={styles.restaurantInfo}>
                  <h2 style={styles.restaurantName}>
                    {restaurant.name}
                  </h2>
                  <div style={styles.restaurantMeta}>
                    <div style={styles.restaurantMetaItem}>
                      <span>⭐</span>
                      <span style={{ fontWeight: '600' }}>{restaurant.rating}</span>
                    </div>
                    <div style={styles.restaurantMetaItem}>
                      <span>🕐</span>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div style={styles.restaurantMetaItem}>
                      <span>🚚</span>
                      <span>${restaurant.deliveryFee}</span>
                    </div>
                  </div>
                  <div style={styles.badge}>
                    {restaurant.cuisine}
                  </div>
                </div>
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
            <div style={styles.logo} onClick={() => setCurrentPage('home')}>QuickBite</div>
            <button
              style={styles.cartButton}
              onClick={() => setCurrentPage('cart')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333333';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>🛒</span>
              <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </button>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('home')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e8e8e8';
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
              {restaurant?.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '15px', color: '#666' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⭐</span>
                <span style={{ fontWeight: '600' }}>{restaurant?.rating}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🕐</span>
                <span>{restaurant?.deliveryTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🚚</span>
                <span>${restaurant?.deliveryFee} delivery</span>
              </div>
              <div style={styles.badge}>
                {restaurant?.cuisine}
              </div>
            </div>
          </div>
          <div style={styles.menuGrid}>
            {menuItems.map(item => (
              <div 
                key={item.id} 
                style={styles.menuItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <div style={styles.menuImageContainer}>
                  {item.image}
                </div>
                <div style={styles.menuItemInfo}>
                  <h3 style={styles.menuItemName}>
                    {item.name}
                  </h3>
                  <p style={styles.menuItemDescription}>
                    {item.description}
                  </p>
                  <p style={styles.menuItemPrice}>
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    style={styles.button}
                    onClick={() => addToCart(item)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333333';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
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
            <div style={styles.logo} onClick={() => setCurrentPage('home')}>
              QuickBite
            </div>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('home')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e8e8e8';
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
            Your Cart
          </h1>
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
              <p style={{ fontSize: '20px', color: '#666', marginBottom: '12px', fontWeight: '600' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '16px', color: '#999' }}>
                Add some delicious items to get started
              </p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartItemContent}>
                    <div style={styles.cartItemImage}>
                      {item.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: '#1a1a1a' }}>
                            {item.name}
                          </h3>
                          <p style={{ fontSize: '16px', color: '#666' }}>
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#999',
                            border: 'none',
                            padding: '8px',
                            cursor: 'pointer',
                            fontSize: '20px',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                        >
                          ✕
                        </button>
                      </div>
                      <div style={styles.quantityControls}>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, -1)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, 1)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        >
                          +
                        </button>
                        <span style={{ fontSize: '18px', color: '#1a1a1a', marginLeft: 'auto', fontWeight: '700' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={styles.totalCard}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                    <span>Subtotal</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                    <span>Delivery Fee</span>
                    <span>${selectedRestaurant ? RESTAURANTS.find(r => r.id === selectedRestaurant)?.deliveryFee.toFixed(2) : '0.00'}</span>
                  </div>
                  <div style={{ borderTop: '2px solid #f0f0f0', marginTop: '16px', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '800', color: '#1a1a1a' }}>
                      <span>Total</span>
                      <span>${(parseFloat(getTotalPrice()) + (selectedRestaurant ? RESTAURANTS.find(r => r.id === selectedRestaurant)?.deliveryFee || 0 : 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  style={{ ...styles.button, fontSize: '16px', padding: '16px' }}
                  onClick={() => setCurrentPage('checkout')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333333';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
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
    const deliveryFee = selectedRestaurant ? RESTAURANTS.find(r => r.id === selectedRestaurant)?.deliveryFee || 0 : 0;
    const subtotal = parseFloat(getTotalPrice());
    const total = subtotal + deliveryFee;

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo} onClick={() => setCurrentPage('home')}>
              QuickBite
            </div>
          </div>
        </header>
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setCurrentPage('cart')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e8e8e8';
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
            Checkout
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '800px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>
                Delivery Information
              </h2>
              <form onSubmit={handlePlaceOrder}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a', fontSize: '14px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="John Doe"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                />

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a', fontSize: '14px' }}>
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="123 Main St, Apt 4B"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                />

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a', fontSize: '14px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="(555) 123-4567"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                />

                <div style={{
                  backgroundColor: '#f8f8f8',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  marginTop: '24px',
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1a1a1a' }}>
                    Order Summary
                  </h3>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                      <span style={{ color: '#666' }}>
                        <span style={{ marginRight: '8px' }}>{item.image}</span>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontWeight: '600', color: '#1a1a1a' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '16px', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', color: '#666' }}>
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#666' }}>
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: '800', color: '#1a1a1a' }}>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ ...styles.button, fontSize: '16px', padding: '16px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333333';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Place Order • ${total.toFixed(2)}
                </button>
              </form>
            </div>
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
            <div style={styles.logo}>QuickBite</div>
          </div>
        </header>
        <div style={styles.content}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '80px 40px',
            maxWidth: '600px',
            margin: '80px auto',
            textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
          }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#000000', 
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              fontSize: '60px',
            }}>
              ✓
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
              Order Confirmed!
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>
              Thank you for your order.
            </p>
            <p style={{ fontSize: '16px', color: '#999', marginBottom: '40px' }}>
              Your delicious food is being prepared and will arrive soon! 🚚
            </p>
            <button
              style={{ ...styles.button, maxWidth: '280px', margin: '0 auto', fontSize: '16px', padding: '16px' }}
              onClick={() => setCurrentPage('home')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333333';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'scale(1)';
              }}
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













