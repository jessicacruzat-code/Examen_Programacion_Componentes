import { useState } from 'react'
import './App.css'
import ListaProductos from './components/ejercicio1/ListaProductos'
import Formulario from './components/ejercicio2/Formulario'
import Usuario from './components/ejercicio3/Usuario'

function App() {
    const [moduloActivo, setModuloActivo] = useState('productos')

    return (
        <div className="app">

            <header className="encabezado">
                <h1>Programación de Componentes</h1>
                <p>Examen Final</p>
            </header>

            <nav className="navegacion">

                <button
                    className={moduloActivo === 'productos' ? 'activo' : ''}
                    onClick={() => setModuloActivo('productos')}
                >
                    Productos
                </button>

                <button
                    className={moduloActivo === 'formulario' ? 'activo' : ''}
                    onClick={() => setModuloActivo('formulario')}
                >
                    Formulario
                </button>

                <button
                    className={moduloActivo === 'usuario' ? 'activo' : ''}
                    onClick={() => setModuloActivo('usuario')}
                >
                    Usuario
                </button>

            </nav>

            <main className="contenido">

                {moduloActivo === 'productos' && (
                    <>
                        <div className="presentacion">
                            <h2>Ejercicio 1 - Productos y Carrito</h2>
                            <p>
                                Seleccione los productos que desea agregar al carrito.
                            </p>
                        </div>

                        <ListaProductos />
                    </>
                )}

                {moduloActivo === 'formulario' && (
                    <Formulario />
                )}

                {moduloActivo === 'usuario' && (
                    <Usuario />
                )}

            </main>

        </div>
    )
}

export default App