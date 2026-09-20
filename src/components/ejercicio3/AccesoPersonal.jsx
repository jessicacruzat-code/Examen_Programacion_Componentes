import { Component } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../firebase/firebase'

class AccesoPersonal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            correo: '',
            contrasena: '',
            mensaje: '',
            sesionIniciada: false,
            nombreProducto: '',
            precioProducto: '',
            imagenProducto: null
        }
    }

    manejarCambio = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    seleccionarImagen = (event) => {
        this.setState({
            imagenProducto: event.target.files[0]
        })
    }

    guardarProducto = async (event) => {
        event.preventDefault()

        if (
            !this.state.nombreProducto ||
            !this.state.precioProducto ||
            !this.state.imagenProducto
        ) {
            this.setState({
                mensaje: 'Debe completar el nombre, precio e imagen del producto.'
            })
            return
        }

        try {
            const nombreArchivo = `${Date.now()}-${this.state.imagenProducto.name}`

            const referenciaImagen = ref(
                storage,
                `productos/${nombreArchivo}`
            )

            await uploadBytes(
                referenciaImagen,
                this.state.imagenProducto
            )

            await addDoc(collection(db, 'productos'), {
                nombre: this.state.nombreProducto,
                precio: Number(this.state.precioProducto),
                imagen: `productos/${nombreArchivo}`
            })

            this.setState({
                nombreProducto: '',
                precioProducto: '',
                imagenProducto: null,
                mensaje: 'Producto agregado correctamente.'
            })

        } catch (error) {
            console.error('Error al guardar el producto:', error)

            this.setState({
                mensaje: 'No fue posible agregar el producto.'
            })
        }
    }

    crearUsuario = async (event) => {
        event.preventDefault()

        try {
            const credencial = await createUserWithEmailAndPassword(
                auth,
                this.state.correo,
                this.state.contrasena
            )

            console.log('Usuario creado:', credencial.user)

            this.setState({
                correo: '',
                contrasena: '',
                mensaje: 'Cuenta creada correctamente.'
            })

        } catch (error) {
            console.error('Error al crear usuario:', error)

            let mensajeError = 'No fue posible crear la cuenta.'

            if (error.code === 'auth/email-already-in-use') {
                mensajeError = 'El correo electrónico ya está registrado.'
            }

            if (error.code === 'auth/invalid-email') {
                mensajeError = 'El correo electrónico no es válido.'
            }

            if (error.code === 'auth/weak-password') {
                mensajeError = 'La contraseña debe tener al menos 6 caracteres.'
            }

            this.setState({
                mensaje: mensajeError
            })
        }
    }
    iniciarSesion = async () => {
        try {
            const credencial = await signInWithEmailAndPassword(
                auth,
                this.state.correo,
                this.state.contrasena
            )

            console.log('Sesión iniciada:', credencial.user)

            this.setState({
                mensaje: 'Sesión iniciada correctamente.',
                sesionIniciada: true
            })

        } catch (error) {
            console.error('Error al iniciar sesión:', error)

            this.setState({
                mensaje: 'Correo electrónico o contraseña incorrectos.'
            })
        }
    }
    render() {
        return (
            <section>
                <div className="presentacion">
                    <h2>Acceso del personal</h2>
                    <p>
                        Ingrese sus credenciales para acceder al sistema.
                    </p>
                </div>

                <form
                    className="formulario-cliente"
                    onSubmit={this.crearUsuario}
                >
                    <div className="mb-3">
                        <label
                            htmlFor="correoUsuario"
                            className="form-label"
                        >
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            id="correoUsuario"
                            name="correo"
                            value={this.state.correo}
                            onChange={this.manejarCambio}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="contrasena"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            name="contrasena"
                            value={this.state.contrasena}
                            onChange={this.manejarCambio}
                            minLength="6"
                            required
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.iniciarSesion}
                        >
                            Iniciar sesión
                        </button>

                    </div>

                    {this.state.mensaje && (
                        <div
                            className="alert alert-info mt-3"
                            role="alert"
                        >
                            {this.state.mensaje}
                        </div>
                    )}
                </form>

                {this.state.sesionIniciada && (
                    <div className="formulario-cliente mt-4">
                        <h3>Administrar productos</h3>
                        <p>Agregue nuevos productos a la carta.</p>

                        <form onSubmit={this.guardarProducto}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Nombre del producto
                                </label>

                                <input
                                    type="text"
                                    name="nombreProducto"
                                    className="form-control"
                                    value={this.state.nombreProducto}
                                    onChange={this.manejarCambio}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Precio
                                </label>

                                <input
                                    type="number"
                                    name="precioProducto"
                                    className="form-control"
                                    value={this.state.precioProducto}
                                    onChange={this.manejarCambio}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Imagen del producto
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={this.seleccionarImagen}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Agregar producto
                            </button>

                        </form>
                    </div>
                )}

            </section>
        )
    }
}

export default AccesoPersonal