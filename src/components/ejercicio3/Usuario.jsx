import { Component } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../../firebase/firebase'

class Usuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            correo: '',
            contrasena: '',
            mensaje: '',
            archivo: null,
            mensajeArchivo: ''
        }
    }

    manejarCambio = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                mensaje: 'Usuario creado correctamente.'
            })

        } catch (error) {
            console.error('Error al crear usuario:', error)

            let mensajeError = 'No fue posible crear el usuario.'

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

    seleccionarArchivo = (event) => {
        this.setState({
            archivo: event.target.files[0],
            mensajeArchivo: ''
        })
    }

    subirArchivo = async () => {
        if (!this.state.archivo) {
            this.setState({
                mensajeArchivo: 'Debe seleccionar un archivo.'
            })
            return
        }

        try {
            const referenciaArchivo = ref(
                storage,
                `archivos/${this.state.archivo.name}`
            )

            await uploadBytes(
                referenciaArchivo,
                this.state.archivo
            )

            this.setState({
                archivo: null,
                mensajeArchivo: 'Archivo subido correctamente a Firebase Storage.'
            })

        } catch (error) {
            console.error('Error al subir archivo:', error)

            this.setState({
                mensajeArchivo: 'No fue posible subir el archivo.'
            })
        }
    }

    render() {
        return (
            <section>
                <div className="presentacion">
                    <h2>Ejercicio 3 - Usuario</h2>
                    <p>
                        Firebase Authentication y Firebase Storage.
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

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Crear usuario
                    </button>

                    {this.state.mensaje && (
                        <div
                            className="alert alert-info mt-3"
                            role="alert"
                        >
                            {this.state.mensaje}
                        </div>
                    )}
                </form>

                <div className="formulario-cliente mt-4">
                    <h3 className="mb-3">
                        Firebase Storage
                    </h3>

                    <div className="mb-3">
                        <label
                            htmlFor="archivo"
                            className="form-label"
                        >
                            Seleccionar archivo
                        </label>

                        <input
                            type="file"
                            className="form-control"
                            id="archivo"
                            onChange={this.seleccionarArchivo}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.subirArchivo}
                    >
                        Subir archivo
                    </button>

                    {this.state.mensajeArchivo && (
                        <div
                            className="alert alert-info mt-3"
                            role="alert"
                        >
                            {this.state.mensajeArchivo}
                        </div>
                    )}
                </div>
            </section>
        )
    }
}

export default Usuario