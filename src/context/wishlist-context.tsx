'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { Shoe } from '@/lib/types';

type WishlistState = {
  items: Shoe[];
};

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Shoe }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: Shoe }
  | { type: 'SET_WISHLIST'; payload: Shoe[] };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      if (state.items.find(item => item.id === action.payload.id)) {
        return state; // Item already in wishlist
      }
      const newItems = [...state.items, action.payload];
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      return { ...state, items: newItems };
    }
    case 'SET_WISHLIST': {
      return { ...state, items: action.payload };
    }
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        const items = JSON.parse(storedWishlist);
        if (Array.isArray(items)) {
          dispatch({ type: 'SET_WISHLIST', payload: items });
        }
      }
    } catch (error) {
      console.error("Could not parse wishlist from localStorage", error);
    }
  }, []);


  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};