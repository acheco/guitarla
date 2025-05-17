import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import {db} from "./data/db.js";
import {useEffect, useState} from "react";

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart
      ? JSON.parse(localStorageCart)
      : []
  }

  const [guitars] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {

    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (itemExists >= 0) { // Si el item existe en el carrito solo incrementamos la cantidad.
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }

  }

  function incrementQuantity(item) {
    const findItem = cart.findIndex((cartItem) => cartItem.id === item.id)
    const updatedCart = [...cart]
    updatedCart[findItem].quantity++
    setCart(updatedCart)
  }

  function decrementQuantity(item) {
    const findItem = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (cart[findItem].quantity === 1) {
      removeItem(item.id)
      return
    }

    const updatedCart = [...cart]
    updatedCart[findItem].quantity--
    setCart(updatedCart)
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>

      <Header
        cart={cart}
        removeItem={removeItem}
        clearCart={clearCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />)
            )}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
