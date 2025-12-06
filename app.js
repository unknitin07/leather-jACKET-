import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Home, Grid, Menu, X, ChevronLeft, ChevronRight, Star, Plus, Minus, Search, MapPin, CreditCard, Package, Clock, Shield, Truck, Award, Check } from 'lucide-react';

const LeatherJacketShop = () => {
  const [currentPage, setCurrentPage] = useState('splash');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [imageIndex, setImageIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Classic Biker Jacket',
      category: 'Biker',
      price: 599,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
        'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'
      ],
      description: 'Premium genuine leather biker jacket with asymmetric zipper closure',
      features: ['100% Genuine Leather', 'YKK Zippers', 'Quilted Shoulders', 'Inner Pockets'],
      colors: ['Black', 'Brown', 'Tan'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      isNew: true,
      isSale: false
    },
    {
      id: 2,
      name: 'Vintage Bomber',
      category: 'Bomber',
      price: 549,
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'
      ],
      description: 'Classic bomber style with ribbed cuffs and premium leather construction',
      features: ['Soft Leather', 'Ribbed Cuffs', 'Side Pockets', 'Comfort Fit'],
      colors: ['Black', 'Brown'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isNew: false,
      isSale: true
    },
    {
      id: 3,
      name: 'Executive Classic',
      category: 'Classic',
      price: 679,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
      ],
      description: 'Sophisticated classic cut perfect for formal and casual occasions',
      features: ['Premium Grade', 'Tailored Fit', 'Multiple Pockets', 'Lifetime Warranty'],
      colors: ['Black', 'Brown', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: true,
      isSale: false
    },
    {
      id: 4,
      name: 'Racer Edition',
      category: 'Biker',
      price: 629,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80'
      ],
      description: 'Racing-inspired design with premium leather and performance features',
      features: ['Racing Stripes', 'Ventilation', 'Protection Pads', 'Slim Fit'],
      colors: ['Black', 'Red'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: false,
      isSale: false
    }
  ];

  const addToCart = (product, size, color) => {
    const cartSize = size || selectedSize;
    const cartColor = color || selectedColor;
    setCartItems([...cartItems, { ...product, size: cartSize, color: cartColor, quantity: 1, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(cartItems.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const AnimatedSticker = ({ type }) => {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => setPulse(p => !p), 1000);
      return () => clearInterval(interval);
    }, []);

    if (type === 'new') {
      return (
        <div className={`transition-all duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <div className="text-xs font-bold text-black">NEW</div>
          </div>
        </div>
      );
    }

    if (type === 'sale') {
      return (
        <div className={`transition-all duration-300 ${pulse ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
            <div className="text-xs font-bold text-white">SALE</div>
          </div>
        </div>
      );
    }

    if (type === 'premium') {
      return (
        <div className={`transition-all duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
          <Award className="w-8 h-8 text-amber-400" strokeWidth={2} />
        </div>
      );
    }

    if (type === 'success') {
      return (
        <div className="animate-bounce">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>
      );
    }

    return null;
  };

  const SplashScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-black flex flex-col items-center justify-center p-8">
      <div className="animate-fade-in">
        <div className="mb-8 text-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-4">
            LUXE
          </div>
          <div className="text-xl text-zinc-400 tracking-widest">LEATHER</div>
        </div>
        
        <div className="mb-8 flex justify-center">
          <AnimatedSticker type="premium" />
        </div>

        <p className="text-zinc-400 text-center mb-12 max-w-xs leading-relaxed">
          Premium handcrafted leather jackets for the modern gentleman
        </p>

        <button
          onClick={() => setCurrentPage('home')}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-24">
      <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setShowMenu(true)} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-zinc-300" />
          </button>
          <div className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            LUXE
          </div>
          <button onClick={() => setCurrentPage('cart')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors relative">
            <ShoppingCart className="w-6 h-6 text-zinc-300" />
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-black flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-3 inline-block">
            <AnimatedSticker type="premium" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Premium Leather<br />Craftsmanship
          </h1>
          <p className="text-zinc-300 mb-6 text-sm">
            Handcrafted jackets that define your style
          </p>
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Shop Jackets
          </button>
        </div>
      </div>

      <div className="px-5 py-8">
        <h2 className="text-2xl font-bold text-white mb-5">Shop by Style</h2>
        <div className="grid grid-cols-3 gap-3">
          {['Biker', 'Bomber', 'Classic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCurrentPage('products')}
              className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-2xl hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 hover:scale-105 active:scale-95 border border-zinc-700"
            >
              <div className="text-white font-semibold text-sm">{cat}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <button className="text-amber-400 text-sm font-medium">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product-detail');
              }}
              className="flex-shrink-0 w-64 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="relative h-64">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && (
                  <div className="absolute top-3 right-3">
                    <AnimatedSticker type="new" />
                  </div>
                )}
                {product.isSale && (
                  <div className="absolute top-3 right-3">
                    <AnimatedSticker type="sale" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 left-3 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="text-xs text-amber-400 font-medium mb-1">{product.category}</div>
                <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">${product.price}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-zinc-400">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Why Choose Us</h2>
        <div className="space-y-4">
          {[
            { icon: Shield, title: '100% Genuine Leather', desc: 'Premium quality guaranteed' },
            { icon: Award, title: 'Lifetime Warranty', desc: 'We stand behind our craft' },
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $500' },
            { icon: CreditCard, title: 'Secure Payments', desc: 'Your data is protected' }
          ].map((feature, i) => (
            <div key={i} className="flex gap-4 p-4 bg-gradient-to-r from-zinc-800/30 to-transparent rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-white font-semibold mb-1">{feature.title}</div>
                <div className="text-sm text-zinc-400">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-24">
      <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('home')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-300" />
          </button>
          <h1 className="text-xl font-bold text-white">All Jackets</h1>
        </div>
      </div>

      <div className="px-5 py-4 flex gap-2 overflow-x-auto">
        {['All', 'Biker', 'Bomber', 'Classic'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium hover:bg-amber-500 hover:text-black transition-colors whitespace-nowrap"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="px-5 py-4 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentPage('product-detail');
            }}
            className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="flex gap-4 p-4">
              <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && (
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">
                      NEW
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-amber-400 font-medium mb-1">{product.category}</div>
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-zinc-400">{product.rating}</span>
                    </div>
                    <span className="text-xs text-zinc-500">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">${product.price}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, selectedSize, selectedColor);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-24">
        <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentPage('products')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-zinc-300" />
            </button>
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-zinc-300'}`}
              />
            </button>
          </div>
        </div>

        <div className="relative h-96">
          <img
            src={selectedProduct.images[imageIndex]}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          {selectedProduct.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === imageIndex ? 'bg-amber-500 w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-amber-400 font-medium mb-2">{selectedProduct.category}</div>
              <h1 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-white font-semibold">{selectedProduct.rating}</span>
                </div>
                <span className="text-sm text-zinc-400">({selectedProduct.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">${selectedProduct.price}</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-zinc-400 mb-3">Select Size</div>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-zinc-400 mb-3">Select Color</div>
            <div className="flex gap-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedColor === color
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-zinc-400 mb-3">Key Features</div>
            <div className="space-y-2">
              {selectedProduct.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-zinc-300">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-zinc-400 mb-3">Description</div>
            <p className="text-zinc-300 text-sm leading-relaxed">{selectedProduct.description}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                addToCart(selectedProduct, selectedSize, selectedColor);
                setCurrentPage('cart');
              }}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
            >
              Add to Cart
            </button>
            <button className="px-6 bg-zinc-800 text-white font-semibold py-4 rounded-xl hover:bg-zinc-700 transition-all active:scale-95">
              Buy Now
            </button>
          </div>
        </div>

        <div className="px-5 py-6 border-t border-zinc-800">
          <h3 className="text-xl font-bold text-white mb-4">Similar Products</h3>
          <div className="space-y-4">
            {products.filter(p => p.id !== selectedProduct.id).slice(0, 2).map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setImageIndex(0);
                }}
                className="flex gap-4 p-3 bg-zinc-800/30 rounded-xl"
              >
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{product.name}</h4>
                  <div className="text-amber-400 font-bold">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-32">
      <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('home')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-300" />
          </button>
          <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
          <div className="ml-auto text-sm text-zinc-400">{cartCount} items</div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 px-5">
          <ShoppingCart className="w-20 h-20 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
          <p className="text-zinc-400 text-center mb-6">Add some premium jackets to get started</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-xl"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="px-5 py-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.cartId} className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl p-4 border border-zinc-700/50">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                    <div className="text-xs text-zinc-400 mb-2">
                      {item.size} · {item.color}
                    </div>
                    <div className="text-lg font-bold text-amber-400">${item.price}</div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="self-start p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-zinc-300" />
                    </button>
                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-zinc-300" />
                    </button>
                  </div>
                  <div className="text-xl font-bold text-white">${item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 p-5 max-w-[420px] mx-auto">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-zinc-800">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );

  const CheckoutPage = () => {
    const [step, setStep] = useState(1);

    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-24">
        <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('cart')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-zinc-300" />
            </button>
            <h1 className="text-xl font-bold text-white">Checkout</h1>
          </div>
        </div>

        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-amber-500' : 'bg-zinc-800'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
              <input type="text" placeholder="Full Name" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <input type="tel" placeholder="Phone" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <input type="text" placeholder="Address Line 1" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <input type="text" placeholder="Address Line 2" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
                <input type="text" placeholder="ZIP Code" className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl mt-6">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <input type="text" placeholder="Card Number" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <input type="text" placeholder="Cardholder Name" className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
                <input type="text" placeholder="CVV" className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-amber-500 focus:outline-none" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 text-white font-semibold py-4 rounded-xl">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl">Review Order</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Review</h2>
              <div className="bg-zinc-800/30 rounded-xl p-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-xs text-zinc-400">{item.size} · {item.color} × {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-white font-semibold">${item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-800/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>${cartTotal}</span></div>
                <div className="flex justify-between text-zinc-400"><span>Shipping</span><span className="text-green-400">Free</span></div>
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-zinc-700"><span>Total</span><span>${cartTotal}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 text-white font-semibold py-4 rounded-xl">Back</button>
                <button onClick={() => {setCurrentPage('confirmation'); setCartItems([]);}} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl">Place Order</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ConfirmationPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex flex-col items-center justify-center px-5">
      <div className="mb-8"><AnimatedSticker type="success" /></div>
      <h1 className="text-3xl font-bold text-white mb-3 text-center">Order Confirmed!</h1>
      <p className="text-zinc-400 text-center mb-8">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
      <div className="w-full bg-zinc-800/30 rounded-2xl p-6 mb-8">
        <div className="text-center mb-4">
          <div className="text-sm text-zinc-400 mb-1">Order Number</div>
          <div className="text-2xl font-bold text-amber-400">#ORD-{Date.now().toString().slice(-6)}</div>
        </div>
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Estimated delivery: 3-5 business days</span>
        </div>
      </div>
      <div className="w-full space-y-3">
        <button onClick={() => setCurrentPage('home')} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl">Continue Shopping</button>
        <button onClick={() => setCurrentPage('profile')} className="w-full bg-zinc-800 text-white font-semibold py-4 rounded-xl">Track Order</button>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pb-24">
      <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-40 px-5 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('home')} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-300" />
          </button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
        </div>
      </div>
      <div className="px-5 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">John Doe</h2>
            <p className="text-zinc-400">john.doe@email.com</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { icon: Package, label: 'My Orders', badge: '3' },
            { icon: Heart, label: 'Wishlist', badge: wishlist.length.toString() },
            { icon: MapPin, label: 'Addresses' },
            { icon: CreditCard, label: 'Payment Methods' },
            { icon: Shield, label: 'Support & FAQ' }
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-amber-400" />
                <span className="text-white font-medium">{item.label}</span>
              </div>
              {item.badge && <div className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">{item.badge}</div>}
            </button>
          ))}
        </div>
        <button className="w-full mt-8 py-4 bg-red-500/10 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-colors">Log Out</button>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 z-50 max-w-[420px] mx-auto">
      <div className="flex justify-around items-center py-3">
        {[
          { icon: Home, label: 'Home', page: 'home' },
          { icon: Grid, label: 'Shop', page: 'products' },
          { icon: Heart, label: 'Wishlist', page: 'wishlist', badge: wishlist.length },
          { icon: ShoppingCart, label: 'Cart', page: 'cart', badge: cartCount },
          { icon: User, label: 'Profile', page: 'profile' }
        ].map((item) => (
          <button key={item.page} onClick={() => setCurrentPage(item.page)} className="flex flex-col items-center gap-1 relative">
            <div className={`p-2 rounded-xl transition-colors ${currentPage === item.page ? 'bg-amber-500/20' : ''}`}>
              <item.icon className={`w-6 h-6 ${currentPage === item.page ? 'text-amber-400' : 'text-zinc-400'}`} />
              {item.badge > 0 && (
                <div className="absolute top-0 right-0 w-5 h-5 bg-amber-500 rounded-full text-xs font-bold text-black flex items-center justify-center">{item.badge}</div>
              )}
            </div>
            <span className={`text-xs ${currentPage === item.page ? 'text-amber-400 font-medium' : 'text-zinc-400'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const SideMenu = () => (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div onClick={() => setShowMenu(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className={`absolute left-0 top-0 bottom-0 w-80 bg-zinc-900 transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">LUXE</div>
            <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-zinc-800 rounded-lg"><X className="w-6 h-6 text-zinc-300" /></button>
          </div>
        </div>
        <div className="p-5 space-y-2">
          {['Home', 'Shop', 'New Arrivals', 'Best Sellers', 'About Us', 'Contact'].map((item) => (
            <button key={item} onClick={() => {setShowMenu(false); if (item === 'Home') setCurrentPage('home'); if (item === 'Shop') setCurrentPage('products');}} className="w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">{item}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[420px] h-screen bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto">
          {currentPage === 'splash' && <SplashScreen />}
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'products' && <ProductsPage />}
          {currentPage === 'product-detail' && <ProductDetailPage />}
          {currentPage === 'cart' && <CartPage />}
          {currentPage === 'checkout' && <CheckoutPage />}
          {currentPage === 'confirmation' && <ConfirmationPage />}
          {currentPage === 'profile' && <ProfilePage />}
        </div>
        {currentPage !== 'splash' && currentPage !== 'confirmation' && <BottomNav />}
        <SideMenu />
      </div>
    </div>
  );
};

export default LeatherJacketShop;
