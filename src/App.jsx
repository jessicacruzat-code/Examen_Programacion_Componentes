import { useState } from 'react'
import './App.css'
import ListaProductos from './components/ejercicio1/ListaProductos'
import Formulario from './components/ejercicio2/Formulario'
import AccesoPersonal from './components/ejercicio3/AccesoPersonal'
function App() {
    const [moduloActivo, setModuloActivo] = useState('productos')

    const [pedido, setPedido] = useState({
        carrito: [],
        total: 0
    })

    const continuarPedido = (carrito, total) => {
        setPedido({
            carrito: carrito,
            total: total
        })

        setModuloActivo('formulario')
    }

    return (
        <div className="app">

            <header className="encabezado">
                <h1>Pub</h1>
                <p>Pedidos y reservas</p>
            </header>

            <nav className="navegacion">

                <button
                    className={moduloActivo === 'productos' ? 'activo' : ''}
                    onClick={() => setModuloActivo('productos')}
                >
                    Carta
                </button>

                <button
                    className={moduloActivo === 'formulario' ? 'activo' : ''}
                    onClick={() => setModuloActivo('formulario')}
                >
                    Datos del cliente
                </button>

                <button
                    className={moduloActivo === 'cuenta' ? 'activo' : ''}
                    onClick={() => setModuloActivo('cuenta')}
                >
                    Acceso personal
                </button>

            </nav>

            <main className="contenido">

                {moduloActivo === 'productos' && (
                    <>
                        <div className="presentacion">
                            <h2>Nuestra Carta</h2>
                            <p>
                                Seleccione los productos que desea agregar a su pedido.
                            </p>
                        </div>

                        <ListaProductos continuarPedido={continuarPedido} />
                    </>
                )}

                {moduloActivo === 'formulario' && (
                    <Formulario
                        carrito={pedido.carrito}
                        total={pedido.total}
                    />
                )}

                {moduloActivo === 'cuenta' && (
                    <AccesoPersonal />
                )}

            </main>

        </div>
    )
}

export default App