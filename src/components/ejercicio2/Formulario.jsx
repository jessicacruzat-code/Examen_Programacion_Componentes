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
            direccion: ''
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

        if (this.validator.allValid()) {
            try {
                await addDoc(collection(db, 'clientes'), {
                    nombre: this.state.nombre,
                    correo: this.state.correo,
                    telefono: this.state.telefono,
                    direccion: this.state.direccion
                })

                alert('Cliente guardado correctamente en Firestore.')

                this.setState({
                    nombre: '',
                    correo: '',
                    telefono: '',
                    direccion: ''
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
        return (
            <section>
                <div className="presentacion">
                    <h2>Ejercicio 2 - Formulario de Cliente</h2>
                    <p>Complete los datos del cliente.</p>
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

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Guardar cliente
                    </button>
                </form>
            </section>
        )
    }
}

export default Formulario