'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CartItem, Shoe, Customization } from '@/lib/types';

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { shoe: Shoe; customization: Customization; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const generateItemId = (shoeId: string, customization: Customization): string => {
  return `${shoeId}-${customization.shoeSize}`;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { shoe, customization, quantity } = action.payload;
      const itemId = generateItemId(shoe.id, customization);
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + quantity };
        return { ...state, items: updatedItems };
      } else {
        const newItem: CartItem = {
          id: itemId,
          shoe,
          customization,
          quantity,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ).filter(item => item.quantity > 0), // Remove if quantity is 0
      };
    }
    case 'CLEAR_CART': {
      // Also clear session storage related to order
      sessionStorage.removeItem('orderDetails');
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};