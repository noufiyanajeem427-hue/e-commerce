export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  viewsToday?: number;
  discountPercentage?: number;
  inStock: boolean;
  stockLeft?: number;
  totalStock?: number;
  description: string;
  isTrending?: boolean;
  isHighestViewed?: boolean;
  colors?: string[];
  sizes?: string[];
  activeViewers?: number;
  deliveryEst?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  iconName: string;
  color: string;
}

export interface CategoryBox {
  id: string;
  title: string;
  subtitle: string;
  bannerBg: string;
  products: Product[];
}

export interface FlashDeal {
  id: string;
  title: string;
  product: Product;
  discountBadge: string;
  stockSoldPercent: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  purchasedProduct: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type Currency = "USD" | "EUR" | "GBP" | "INR";
