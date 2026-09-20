import { useEffect, useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/firebase'

function Producto({ producto, agregarAlCarrito }) {
    const [urlImagen, setUrlImagen] = useState('')

    useEffect(() => {
        const cargarImagen = async () => {
            try {
                const referenciaImagen = ref(storage, producto.imagen)
                const url = await getDownloadURL(referenciaImagen)

                setUrlImagen(url)
            } catch (error) {
                console.error('Error al cargar la imagen:', error)
            }
        }

        cargarImagen()
    }, [producto.imagen])

    return (
        <article className="producto card">

            {urlImagen && (
                <img
                    src={urlImagen}
                    className="card-img-top"
                    alt={producto.nombre}
                />
            )}

            <div className="card-body">
                <h3 className="card-title h5">
                    {producto.nombre}
                </h3>

                <p className="card-text">
                    Precio: ${producto.precio.toLocaleString('es-CL')}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={() => agregarAlCarrito(producto)}
                >
                    Agregar al carrito
                </button>
            </div>
        </article>
    )
}

export default Producto