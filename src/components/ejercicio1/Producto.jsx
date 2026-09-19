function Producto({ producto, agregarAlCarrito }) {
    return (
        <article className="producto card">
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