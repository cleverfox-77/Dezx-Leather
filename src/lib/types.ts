export type Shoe = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
  category: string; // Made category mandatory
  stock?: number;
};

export type Customization = {
  shoeSize: number | null;
};

export type CartItem = {
  id: string; // A unique ID combining shoe ID and customizations
  shoe: Shoe;
  quantity: number;
  customization: Customization;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Order = {
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  advance: number;
  bkashTransactionId?: string;
};