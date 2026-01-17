
import { Product, BookingService, Order } from './types';

const LACE_VARIANTS = {
  GOLD_ZARI: { 
    id: 'l1', 
    name: 'Golden Zari Lace', 
    price: 65, 
    image: 'https://images.unsplash.com/photo-1590736962380-4927582509bc?auto=format&fit=crop&q=60&w=200' 
  },
  SILVER_GOTA: { 
    id: 'l2', 
    name: 'Silver Gota Lace', 
    price: 55, 
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=60&w=200' 
  },
  COTTON_WHITE: { 
    id: 'l3', 
    name: 'Premium Cotton Lace', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1599708153386-62bd3f024039?auto=format&fit=crop&q=60&w=200' 
  },
  HEAVY_ZARDOSI: { 
    id: 'l4', 
    name: 'Heavy Zardosi Border', 
    price: 150, 
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=60&w=200' 
  },
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Phulkari Silk Suit',
    price: 1600,
    originalPrice: 2600,
    category: 'Suits',
    description: 'Masterfully hand-embroidered by Munna. Features heavy Phulkari dupatta on pure Banarasi silk base.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610030469668-93530c17b58f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594435212624-9bb44c3c7fca?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.GOLD_ZARI, LACE_VARIANTS.COTTON_WHITE],
    reviews: [{ id: 'r1', name: 'Simran K.', rating: 5, comment: 'Perfect Jalandhari fitting!', date: '2024-03-10' }]
  },
  {
    id: '2',
    name: 'Heritage Velvet Anarkali',
    price: 2300,
    originalPrice: 3300,
    category: 'Anarkali',
    description: 'Royal navy velvet with intricate Tilla work and heavy ghera. Perfect for high-end winter weddings.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.GOLD_ZARI, LACE_VARIANTS.HEAVY_ZARDOSI],
    reviews: []
  },
  {
    id: '3',
    name: 'Zardosi Mirror Sharara Set',
    price: 1800,
    originalPrice: 2800,
    category: 'Suits',
    description: 'Contemporary sharara silhouette with classic mirror work detailing. Designed for pre-wedding functions.',
    images: [
      'https://images.unsplash.com/photo-1594435212624-9bb44c3c7fca?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.SILVER_GOTA, LACE_VARIANTS.GOLD_ZARI],
    reviews: []
  },
  {
    id: '4',
    name: 'Bridal Heritage Lehenga',
    price: 8000,
    originalPrice: 9000,
    category: 'Bridal',
    description: 'The crowning jewel of Tanish Boutique. Personally tailored by Samsul Hoda (Munna) with real antique zari.',
    images: [
      'https://images.unsplash.com/photo-1595910129103-575261912c30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.HEAVY_ZARDOSI],
    reviews: []
  },
  {
    id: '5',
    name: 'Lucknowi Chikankari Organza',
    price: 2100,
    originalPrice: 3100,
    category: 'Suits',
    description: 'Ethereal pastel organza with authentic Chikankari handwork. Lightweight elegance.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.COTTON_WHITE, LACE_VARIANTS.SILVER_GOTA],
    reviews: []
  },
  {
    id: '6',
    name: 'Designer Zardosi Blouse',
    price: 900,
    originalPrice: 1900,
    category: 'Blouse & Saree',
    description: 'Exquisitely padded blouse with custom back embroidery. A signature Munna cut.',
    images: [
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.GOLD_ZARI],
    reviews: []
  },
  {
    id: '12',
    name: 'Handloom Silk Saree',
    price: 3200,
    originalPrice: 4200,
    category: 'Blouse & Saree',
    description: 'Pure handloom silk with temple borders. Includes custom-stitched blouse piece.',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93530c17b58f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595910129103-575261912c30?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: false,
    reviews: []
  },
  {
    id: '13',
    name: 'Floral Chiffon Anarkali',
    price: 1500,
    originalPrice: 2500,
    category: 'Anarkali',
    description: 'Flowy floral chiffon with delicate gold piping. Perfect for summer festivities.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    ],
    allowsLaces: true,
    laceOptions: [LACE_VARIANTS.GOLD_ZARI, LACE_VARIANTS.COTTON_WHITE],
    reviews: []
  }
];

export const SERVICES: BookingService[] = [
  {
    id: 's1',
    name: 'Designer Consult with Munna',
    duration: '45 mins',
    price: 'Free',
    description: 'Sit down with Samsul Hoda (Munna) to sketch your dream wedding outfit.'
  },
  {
    id: 's2',
    name: 'Home Measurement Service',
    duration: '30 mins',
    price: '₹200',
    description: 'We come to your doorstep in Jalandhar to take professional measurements.'
  }
];

// FIX: Added missing amountPaid and paymentType properties to MOCK_ORDERS to comply with Order interface
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-01',
    total: 2300,
    amountPaid: 2300,
    paymentType: 'Full',
    status: 'In Stitching',
    items: [
      { name: 'Heritage Velvet Anarkali', quantity: 1, price: 2300 }
    ]
  }
];
