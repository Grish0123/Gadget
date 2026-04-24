export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  originalPrice?: number;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Rose Glow Bouquet",
    price: 4200,
    category: "Flowers",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80",
    description: "A soft pastel bouquet designed for warm celebrations and thoughtful gifting.",
  },
  {
    id: 2,
    name: "Airbuds Pro 2",
    price: 3599,
    originalPrice: 5500,
    featured: true,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Premium wireless earbuds with a compact case, clean sound, and a standout launch discount.",
  },
  {
    id: 3,
    name: "Velvet Celebration Cake",
    price: 5800,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
    description: "A rich signature cake with layered cream filling and a festive finish.",
  },
  {
    id: 4,
    name: "Signature Gift Box",
    price: 6400,
    category: "Gifting",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
    description: "A curated box with chocolates, candles, and a handwritten note card.",
  },
  {
    id: 5,
    name: "Blush Candle Set",
    price: 2900,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
    description: "Three scented candles crafted to bring a calm and romantic evening mood.",
  },
  {
    id: 6,
    name: "Midnight Date Hamper",
    price: 7200,
    category: "Experiences",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
    description: "A complete date-night hamper with treats, glassware, and styled essentials.",
  },
];
