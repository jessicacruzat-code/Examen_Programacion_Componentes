import { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

class Formulario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: '',
            correo: '',
            telefono: '',
            direccion: '',
            pedidoConfirmado: false
        }

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio.',
                email: 'Ingrese un correo electrónico válido.'
            }
        })
    }

    manejarCambio = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    manejarEnvio = async (event) => {
        event.preventDefault()

        if (!this.props.carrito || this.props.carrito.length === 0) {
            alert('Debe agregar al menos un producto antes de confirmar el pedido.')
            return
        }

        if (this.validator.allValid()) {
            try {
                await addDoc(collection(db, 'pedidos'), {
                    nombre: this.state.nombre,
                    correo: this.state.correo,
                    telefono: this.state.telefono,
                    direccion: this.state.direccion,
                    productos: this.props.carrito,
                    total: this.props.total
                })

                alert('Pedido guardado correctamente en Firestore.')

                this.setState({
                    nombre: '',
                    correo: '',
                    telefono: '',
                    direccion: '',
                    pedidoConfirmado: true
                })

                this.validator.hideMessages()
                this.forceUpdate()

            } catch (error) {
                console.error('Error al guardar el cliente:', error)
                alert('Ocurrió un error al guardar el cliente.')
            }

        } else {
            this.validator.showMessages()
            this.forceUpdate()
        }
    }

    render() {
        if (this.state.pedidoConfirmado) {
            return (
                <section>
                    <div className="formulario-cliente text-center">
                        <h2>Pedido realizado correctamente</h2>

                        <p className="mt-3">
                            Su pedido fue registrado correctamente.
                        </p>

                        <h3 className="mt-4">
                            Total: ${this.props.total.toLocaleString('es-CL')}
                        </h3>

                        <p className="mt-3">
                            Para realizar un nuevo pedido, vuelva a la Carta.
                        </p>
                    </div>
                </section>
            )
        }
        return (
            <section>
                <div className="presentacion">
                    <h2>Datos del cliente</h2>
                    <p>Complete sus datos para confirmar el pedido.</p>
                </div>

                <form
                    className="formulario-cliente"
                    onSubmit={this.manejarEnvio}
                >
                    <div className="campo-formulario mb-3">
                        <label
                            htmlFor="nombre"
                            className="form-label"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="form-control"
                            value={this.state.nombre}
                            onChange={this.manejarCambio}
                        />

                        {this.validator.message(
                            'nombre',
                            this.state.nombre,
                            'required'
                        )}
                    </div>

                    <div className="campo-formulario mb-3">
                        <label
                            htmlFor="correo"
                            className="form-label"
                        >
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="form-control"
                            value={this.state.correo}
                            onChange={this.manejarCambio}
                        />

                        {this.validator.message(
                            'correo',
                            this.state.correo,
                            'required|email'
                        )}
                    </div>

                    <div className="campo-formulario mb-3">
                        <label
                            htmlFor="telefono"
                            className="form-label"
                        >
                            Teléfono
                        </label>

                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="form-control"
                            value={this.state.telefono}
                            onChange={this.manejarCambio}
                        />

                        {this.validator.message(
                            'telefono',
                            this.state.telefono,
                            'required'
                        )}
                    </div>

                    <div className="campo-formulario mb-3">
                        <label
                            htmlFor="direccion"
                            className="form-label"
                        >
                            Dirección
                        </label>

                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            className="form-control"
                            value={this.state.direccion}
                            onChange={this.manejarCambio}
                        />

                        {this.validator.message(
                            'direccion',
                            this.state.direccion,
                            'required'
                        )}
                    </div>
                    <div className="resumen-pedido mt-4 mb-4">
                        <h3>Resumen del pedido</h3>

                        {this.props.carrito && this.props.carrito.length > 0 ? (
                            <>
                                {this.props.carrito.map((producto) => (
                                    <div
                                        key={producto.id}
                                        className="d-flex justify-content-between mb-2"
                                    >
                                        <span>
                                            {producto.nombre} × {producto.cantidad}
                                        </span>

                                        <span>
                                            ${(producto.precio * producto.cantidad)
                                                .toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                ))}

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <strong>Total</strong>

                                    <strong>
                                        ${this.props.total.toLocaleString('es-CL')}
                                    </strong>
                                </div>
                            </>
                        ) : (
                            <p>No hay productos en el pedido.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Confirmar pedido
                    </button>
                </form>
            </section>
        )
    }
}

export default Formulario