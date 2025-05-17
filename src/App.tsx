import Header from "./components/Header.js";
import Guitar from "./components/Guitar.js";
import useCart from "./hooks/useCart.js";

function App() {

  const {
    guitars,
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    totalPrice,
    isEmpty,
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeItem={removeItem}
        clearCart={clearCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalPrice={totalPrice}
        isEmpty={isEmpty}
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
