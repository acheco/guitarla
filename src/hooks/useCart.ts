import {useEffect, useMemo, useState} from "react";
import {db} from "../data/db.js";
import {CartItem, Guitar} from "../types";

function useCart() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart
      ? JSON.parse(localStorageCart)
      : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item: Guitar) {

    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (itemExists >= 0) { // Si el item existe en el carrito solo incrementamos la cantidad.
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const newItem: CartItem = {...item, quantity: 1}
      setCart([...cart, newItem])
    }

  }

  function incrementQuantity(item: Guitar) {
    const findItem = cart.findIndex((cartItem) => cartItem.id === item.id)
    const updatedCart = [...cart]
    updatedCart[findItem].quantity++
    setCart(updatedCart)
  }

  function decrementQuantity(item: Guitar) {
    const findItem = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (cart[findItem].quantity === 1) {
      removeItem(item.id)
      return
    }

    const updatedCart = [...cart]
    updatedCart[findItem].quantity--
    setCart(updatedCart)
  }

  function removeItem(id: Number) {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])
  const isEmpty = useMemo(() => cart.length === 0, [cart])

  return {
    guitars: data,
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    totalPrice,
    isEmpty,
  }

}

export default useCart;
