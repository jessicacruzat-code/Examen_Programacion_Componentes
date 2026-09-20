import { Component } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import Producto from './Producto'

class ListaProductos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productos: [],
            carrito: []
        }
    }

    componentDidMount() {
        this.cargarProductos()
    }

    cargarProductos = async () => {
        try {
            const consulta = await getDocs(collection(db, 'productos'))

            const productosFirebase = consulta.docs.map((documento) => ({
                id: documento.id,
                ...documento.data()
            }))

            this.setState({
                productos: productosFirebase
            })

        } catch (error) {
            console.error('Error al cargar los productos:', error)
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
    disminuirCantidad = (producto) => {
        if (producto.cantidad > 1) {
            this.setState({
                carrito: this.state.carrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
            })
        } else {
            this.setState({
                carrito: this.state.carrito.filter(
                    (item) => item.id !== producto.id
                )
            })
        }
    }

    eliminarDelCarrito = (producto) => {
        this.setState({
            carrito: this.state.carrito.filter(
                (item) => item.id !== producto.id
            )
        })
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
                            <div className="carrito-lista">
                                {this.state.carrito.map((producto) => (
                                    <div className="carrito-item" key={producto.id}>

                                        <div>
                                            <strong>{producto.nombre}</strong>
                                            <p>
                                                ${(producto.precio * producto.cantidad)
                                                    .toLocaleString('es-CL')}
                                            </p>
                                        </div>

                                        <div className="controles-cantidad">

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => this.disminuirCantidad(producto)}
                                            >
                                                −
                                            </button>

                                            <span>{producto.cantidad}</span>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => this.agregarAlCarrito(producto)}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => this.eliminarDelCarrito(producto)}
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </div>
                                ))}
                            </div>

                        <h3>
                            Total: $
                            {this.calcularTotal().toLocaleString('es-CL')}
                        </h3>

                        <button
                            type="button"
                            className="btn btn-success mt-3"
                            onClick={() =>
                                this.props.continuarPedido(
                                    this.state.carrito,
                                    this.calcularTotal()
                                    )
                                }
                        >
                            Continuar pedido
                        </button>
                    </>
                )}
            </section>
        )
    }
}

export default ListaProductos