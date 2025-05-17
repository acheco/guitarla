import Logo from "./Logo.jsx";

export default function Header({cart, removeItem, clearCart, incrementQuantity, decrementQuantity, totalPrice, isEmpty}) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <Logo/>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito"/>
              <div id="carrito" className="bg-white p-3">
                {
                  isEmpty
                    ? (
                      <p className="text-center">El carrito esta vacío</p>
                    ) : (
                      <>
                        < table className="w-100 table">
                          <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            cart.length > 0 &&
                            cart.map((item) => (
                              <tr key={item.id}>
                                <td>
                                  <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra"/>
                                </td>
                                <td>SRV</td>
                                <td className="fw-bold">
                                  ${item.price}
                                </td>
                                <td className="flex align-items-start gap-4">
                                  <button
                                    type="button"
                                    onClick={() => decrementQuantity(item)}
                                    className="btn btn-dark"
                                  >
                                    -
                                  </button>
                                  {item.quantity}
                                  <button
                                    type="button"
                                    onClick={() => incrementQuantity(item)}
                                    className="btn btn-dark"
                                  >
                                    +
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      removeItem(item.id)
                                    }}
                                    className="btn btn-danger"
                                    type="button"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </table>
                        <p className="text-end">Total pagar: <span className="fw-bold">${totalPrice}</span>
                        </p>
                        <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                      </>
                    )
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
