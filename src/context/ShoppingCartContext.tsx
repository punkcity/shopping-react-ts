/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false); //To control display of the cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    return item?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    //If item doesnt exist in cart, add it. If it exists, increase quantity
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        //Item NOT found in cart
        return [...currItems, { id: id, quantity: 1 }]; //All items in cart + new item
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            //This is the item we want to update
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            //Not our item, return it as is
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      //If only 1 quantity left in the cart, just remove the item!
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        //Use filter method to return ALL items that DONT match our ID
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            //This is the item we want to update
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            //Not our item, return it as is
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
