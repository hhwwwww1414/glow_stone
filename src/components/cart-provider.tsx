"use client";

import {
  addCartItem,
  countCartItems,
  removeCartItem,
  updateCartQuantity
} from "@/lib/cart";
import type { CartItem } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type CartContextValue = {
  cartItems: CartItem[];
  favoriteSlugs: string[];
  cartCount: number;
  favoriteCount: number;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const cartKey = "glowstone.cart";
const favoritesKey = "glowstone.favorites";

function readStoredArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setCartItems(readStoredArray<CartItem>(cartKey, []));
      setFavoriteSlugs(readStoredArray<string>(favoritesKey, []));
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, hydrated]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(favoritesKey, JSON.stringify(favoriteSlugs));
    }
  }, [favoriteSlugs, hydrated]);

  const addToCart = useCallback((slug: string) => {
    setCartItems((items) => addCartItem(items, slug));
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCartItems((items) => removeCartItem(items, slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setCartItems((items) => updateCartQuantity(items, slug, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavoriteSlugs((slugs) =>
      slugs.includes(slug)
        ? slugs.filter((candidate) => candidate !== slug)
        : [...slugs, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favoriteSlugs.includes(slug),
    [favoriteSlugs]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      favoriteSlugs,
      cartCount: countCartItems(cartItems),
      favoriteCount: favoriteSlugs.length,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite
    }),
    [
      addToCart,
      cartItems,
      clearCart,
      favoriteSlugs,
      isFavorite,
      removeFromCart,
      toggleFavorite,
      updateQuantity
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return value;
}
