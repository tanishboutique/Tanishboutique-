
import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import BookingCalendar from './components/BookingCalendar';
import AIStylist from './components/AIStylist';
import MeasurementForm from './components/MeasurementForm';
import Account from './components/Account';
import Cart from './components/Cart';
import FloatingCoco from './components/FloatingCoco';
import PaymentQR from './components/PaymentQR';
import { PRODUCTS as INITIAL_PRODUCTS, MOCK_ORDERS } from './constants';
import { Product, CartItem, View, Review, Order, LaceOption } from './types';
import { SearchX, Sparkles, Scissors, ShieldCheck, CreditCard, Phone, MapPin, Award } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product, laceMeters?: number, selectedLace?: LaceOption) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedLace?.id === selectedLace?.id && 
        item.laceMeters === laceMeters
      );
      
      if (existingIndex > -1) {
        return prev.map((item, idx) => 
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, laceMeters: laceMeters || 0, selectedLace }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateDate = (uniqueId: string, date: string) => {
    const [id, index] = uniqueId.split('-');
    setCart(prev => prev.map((item, idx) => 
      (idx === parseInt(index) && item.id === id) ? { ...item, requestedDate: date } : item
    ));
  };

  const handleUpdateLaces = (uniqueId: string, meters: number) => {
    const [id, index] = uniqueId.split('-');
    setCart(prev => prev.map((item, idx) => 
      (idx === parseInt(index) && item.id === id) ? { ...item, laceMeters: meters } : item
    ));
  };

  const handleRemoveFromCart = (uniqueId: string) => {
    const [id, index] = uniqueId.split('-');
    setCart(prev => prev.filter((item, idx) => !(idx === parseInt(index) && item.id === id)));
  };

  const handleUpdateQuantity = (uniqueId: string, delta: number) => {
    const [id, index] = uniqueId.split('-');
    setCart(prev => prev.map((item, idx) => {
      if (idx === parseInt(index) && item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = async (isAdvance: boolean) => {
    if (cart.length === 0) return;
    setIsProcessingPayment(true);
    
    const calculateItemTotal = (item: CartItem) => {
      const baseTotal = item.price * item.quantity;
      const laceTotal = (item.laceMeters || 0) * (item.selectedLace?.price || 0);
      return baseTotal + laceTotal;
    };

    const totalAmount = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);
    const amountToPayNow = isAdvance ? Math.ceil(totalAmount / 2) : totalAmount;
    const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      total: totalAmount,
      amountPaid: amountToPayNow,
      paymentType: isAdvance ? '50% Advance' : 'Full',
      status: 'Processing',
      items: cart.map(item => ({ 
        name: item.name, 
        quantity: item.quantity, 
        price: item.price,
        requestedDate: item.requestedDate,
        laceMeters: item.laceMeters,
        selectedLace: item.selectedLace
      }))
    };

    // Prepare WhatsApp Message
    let message = `Hello Tanish Boutique! 🌸 I just placed an order on the app.\n\n`;
    message += `*Order ID:* ${orderId}\n`;
    message += `*Payment Type:* ${isAdvance ? '50% Advance' : 'Full Payment'}\n`;
    message += `*Amount Paid:* ₹${amountToPayNow}\n`;
    if (isAdvance) {
      message += `*Balance Remaining:* ₹${totalAmount - amountToPayNow}\n`;
    }
    message += `*Total Order Value:* ₹${totalAmount}\n\n`;
    message += `*Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} (Qty: ${item.quantity})`;
      if (item.selectedLace && item.laceMeters) {
        message += `\n  - Custom Lace: ${item.selectedLace.name} (${item.laceMeters}m)`;
      }
      if (item.requestedDate) {
        message += `\n  - Required by: ${item.requestedDate}`;
      }
      message += `\n`;
    });
    message += `\nPlease confirm my stitching schedule! 🙏`;

    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsProcessingPayment(false);
    setIsCartOpen(false);
    setCurrentView(View.Account);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // WhatsApp Redirect
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919878789036?text=${encodedMessage}`, '_blank');
  };

  const handleAddReview = (productId: string, newReview: Omit<Review, 'id' | 'date'>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const review: Review = {
          ...newReview,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString().split('T')[0]
        };
        return { ...p, reviews: [review, ...p.reviews] };
      }
      return p;
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentView !== View.Shop) {
      setCurrentView(View.Shop);
    }
  };

  const getQuantityInCart = (productId: string) => {
    return cart.filter(item => item.id === productId).reduce((acc, item) => acc + item.quantity, 0);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch (currentView) {
      case View.Home:
        return (
          <div className="space-y-24 pb-24 animate-in fade-in duration-700">
            <section className="relative h-[90vh] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594435212624-9bb44c3c7fca?auto=format&fit=crop&q=80&w=1920" 
                className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105"
                alt="Master Designer Munna at Work"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <div className="mb-6 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                   <Scissors size={18} className="text-pink-400" />
                   <span className="text-xs tracking-[0.4em] font-black uppercase">Tailored by Samsul Hoda (Munna)</span>
                </div>
                <h2 className="text-7xl md:text-9xl font-light serif italic mb-8 drop-shadow-2xl text-white">Tanish Boutique</h2>
                <p className="text-lg md:text-2xl max-w-2xl font-light italic mb-10 text-stone-200">"Authentic Jalandhari craftsmanship in every thread."</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button onClick={() => setCurrentView(View.Shop)} className="px-12 py-5 bg-pink-600 text-white text-xs tracking-widest uppercase font-black hover:bg-pink-700 transition-all shadow-2xl">Browse Collection</button>
                  <button onClick={() => setCurrentView(View.Booking)} className="px-12 py-5 border-2 border-white text-white text-xs tracking-widest uppercase font-black hover:bg-white hover:text-stone-900 transition-all backdrop-blur-sm">Book Fitting Session</button>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-r from-pink-50 to-white border border-pink-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-pink-900 font-black tracking-tight uppercase text-2xl italic">App Launch Offer!</h3>
                    <p className="text-pink-600 text-sm font-medium">Automatic ₹1000 Discount + Free Stitching Consult with Munna.</p>
                  </div>
                </div>
                <button onClick={() => setCurrentView(View.Shop)} className="px-8 py-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full group-hover:bg-pink-600 transition-colors">Shop Now</button>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center mb-20">
                <span className="text-pink-600 font-black text-xs uppercase tracking-[0.5em] mb-4">Designer Gallery</span>
                <h2 className="text-5xl font-light serif italic text-stone-900">The Signature Selection</h2>
                <div className="w-24 h-[2px] bg-stone-200 mt-8"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {products.slice(0, 8).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onAddReview={handleAddReview} quantityInCart={getQuantityInCart(product.id)} />
                ))}
              </div>
            </section>

            <section className="bg-stone-50 py-32 border-y border-stone-200 overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-10">
                  <div className="inline-flex items-center gap-3 text-pink-600 font-black text-xs uppercase tracking-[0.4em]">
                    <ShieldCheck size={18} /> Direct Merchant Payment
                  </div>
                  <h3 className="text-6xl font-light serif italic text-stone-900">Secure Ordering</h3>
                  <p className="text-stone-600 font-light leading-relaxed text-xl italic max-w-xl">"Trust is the finest garment we wear. For every custom order, you pay directly to our verified merchant terminal. No middlemen, just authentic care."</p>
                  
                  <div className="flex flex-col sm:flex-row gap-12 pt-8 border-t border-stone-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-stone-900 font-black text-xs uppercase tracking-widest">
                        <CreditCard size={16} className="text-pink-600" /> UPI Integrated
                      </div>
                      <p className="text-stone-500 text-sm">Pay via GPay, PhonePe or Paytm using our official Bob Merchant QR code.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-stone-900 font-black text-xs uppercase tracking-widest">
                        <Phone size={16} className="text-pink-600" /> Designer Direct
                      </div>
                      <p className="text-stone-500 text-sm">WhatsApp Munna for fitting queries: <span className="text-pink-600 font-bold">+91 9878789036</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 relative group">
                  <div className="absolute -inset-10 bg-pink-100 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative z-10 scale-110 rotate-2 group-hover:rotate-0 transition-transform duration-700">
                     <PaymentQR />
                     <div className="mt-6 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Scan to pay Tanish Boutique</p>
                     </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case View.Shop:
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-20 text-center space-y-4">
              <h2 className="text-6xl font-light serif italic text-stone-900">Boutique Collection</h2>
              <p className="text-stone-400 text-sm tracking-[0.3em] uppercase font-black italic">Curated Excellence by Munna's Studio</p>
              <div className="w-24 h-1 bg-pink-600 mx-auto mt-8"></div>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onAddReview={handleAddReview} quantityInCart={getQuantityInCart(product.id)} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                <SearchX className="text-stone-300 mx-auto mb-6" size={64} />
                <h3 className="text-2xl serif italic mb-4">No matching designer pieces</h3>
                <button onClick={() => setSearchQuery('')} className="px-10 py-4 bg-stone-900 text-white text-[10px] tracking-widest uppercase font-bold hover:bg-pink-600 shadow-xl transition-all">Clear Filters</button>
              </div>
            )}
          </div>
        );
      case View.Booking: return <BookingCalendar />;
      case View.Stylist:
        return (
          <div className="bg-[#fcfbf7] min-h-[85vh] py-16 px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-light serif italic text-pink-800">Chat with Coco</h2>
              <p className="text-stone-500 text-sm mt-4 tracking-[0.3em] uppercase font-black italic">Feline Style Wisdom by Tanish Boutique</p>
            </div>
            <AIStylist />
          </div>
        );
      case View.Measurements: return <MeasurementForm />;
      case View.Account: return <Account orders={orders} onNavigate={setCurrentView} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-200 selection:text-pink-900">
      <div className="bg-stone-950 text-white text-[9px] py-3 px-4 text-center font-black tracking-[0.5em] uppercase relative">
        <div className="flex items-center justify-center gap-8">
          <Sparkles size={12} className="text-pink-500 animate-pulse" />
          <span>AUTHENTIC PUNJABI TAILORING | MASTER CRAFTSMAN MUNNA | ₹1000 OFF CODE: TANISH1000</span>
          <Sparkles size={12} className="text-pink-500 animate-pulse" />
        </div>
      </div>

      <Header currentView={currentView} onNavigate={setCurrentView} cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} searchQuery={searchQuery} onSearch={handleSearch} />
      
      <main className="flex-grow">{renderContent()}</main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={handleRemoveFromCart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onUpdateDate={handleUpdateDate}
        onUpdateLaces={handleUpdateLaces}
        onCheckout={handleCheckout} 
        isProcessing={isProcessingPayment} 
      />

      <FloatingCoco onClick={() => setCurrentView(View.Stylist)} />

      <footer className="bg-stone-100 border-t border-stone-200 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div className="flex flex-col">
                <h3 className="text-3xl tracking-[0.2em] font-black text-stone-900 uppercase">TANISH</h3>
                <span className="text-[10px] tracking-[0.5em] text-pink-600 font-bold">BOUTIQUE</span>
              </div>
              <p className="text-stone-500 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-black">Jalandhar's premier atelier for custom Punjabi silhouettes. Led by Samsul Hoda (Munna).</p>
            </div>
            
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">Navigation</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                <li><button onClick={() => setCurrentView(View.Shop)} className="hover:text-pink-600 transition-colors">Suits & Sarees</button></li>
                <li><button onClick={() => setCurrentView(View.Measurements)} className="hover:text-pink-600 transition-colors">Sizing Guide</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">Support</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                <li><button onClick={() => setCurrentView(View.Stylist)} className="hover:text-pink-600 transition-colors">Coco Assistant</button></li>
                <li><a href="tel:+919878789036" className="hover:text-pink-600 transition-colors">Direct Support</a></li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-600 mb-8">Munna's Studio</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-stone-400 mt-1 flex-shrink-0" />
                  <p className="text-[10px] text-stone-800 font-black uppercase tracking-widest leading-relaxed">Shop No. 75, Sidhu Estate, Talhan Road, Dakoha, Jalandhar</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-stone-400 flex-shrink-0" />
                  <p className="text-xl font-black text-stone-900">+91 9878789036</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center opacity-50">
            <p className="text-[9px] text-stone-400 tracking-[0.4em] uppercase font-black">
              &copy; 2024 Tanish Boutique. Master Designer Samsul Hoda (Munna).
            </p>
            <div className="flex gap-8 mt-6 md:mt-0">
               <span className="text-[9px] text-stone-400 font-black uppercase tracking-widest flex items-center gap-2">
                 <Award size={10} /> Heritage Quality Guaranteed
               </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
