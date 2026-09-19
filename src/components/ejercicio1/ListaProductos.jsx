import { Component } from 'react'
import Producto from './Producto'

class ListaProductos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productos: [
                { id: 1, nombre: 'Notebook', precio: 599990 },
                { id: 2, nombre: 'Teclado', precio: 29990 },
                { id: 3, nombre: 'Mouse', precio: 19990 }
            ],
            carrito: []
        }
    }

    agregarAlCarrito = (producto) => {
        const productoExistente = this.state.carrito.find(
            (item) => item.id === producto.id
        )

        if (productoExistente) {
            this.setState({
                carrito: this.state.carrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            })
        } else {
            this.setState({
                carrito: [
                    ...this.state.carrito,
                    { ...producto, cantidad: 1 }
                ]
            })
        }
    }

    calcularTotal = () => {
        return this.state.carrito.reduce(
            (total, producto) =>
                total + producto.precio * producto.cantidad,
            0
        )
    }

    render() {
        return (
            <section>
                <h2>Productos</h2>

                <div className="lista-productos">
                    {this.state.productos.map((producto) => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                            agregarAlCarrito={this.agregarAlCarrito}
                        />
                    ))}
                </div>

                <h2>Carrito</h2>

                {this.state.carrito.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <>
                        <ul>
                            {this.state.carrito.map((producto) => (
                                <li key={producto.id}>
                                    {producto.nombre} - Cantidad: {producto.cantidad}
                                    {' - $'}
                                    {(producto.precio * producto.cantidad)
                                        .toLocaleString('es-CL')}
                                </li>
                            ))}
                        </ul>

                        <h3>
                            Total: $
                            {this.calcularTotal().toLocaleString('es-CL')}
                        </h3>
                    </>
                )}
            </section>
        )
    }
}

export default ListaProductos