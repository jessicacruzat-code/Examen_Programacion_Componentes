# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Examen Programación de Componentes

Aplicación desarrollada en React para la gestión de pedidos de un PUB.

El proyecto permite visualizar una carta de productos, agregar productos al carrito, registrar los datos del cliente, almacenar pedidos y administrar los productos mediante un acceso para el personal.

## Tecnologías utilizadas

- React
- Vite
- Bootstrap
- Simple React Validator
- Firebase Cloud Firestore
- Firebase Authentication
- Firebase Storage
- Apache Cordova
- Android Studio
- Gradle

## Ejercicio 1 - Productos y carrito

Se implementó una lista de productos utilizando componentes de React.

La aplicación incluye:

- Componente padre `ListaProductos`.
- Componente hijo `Producto`.
- Uso de `map()` para mostrar los productos.
- Comunicación entre componentes mediante props y callbacks.
- Uso de state y `this.setState()` para actualizar el carrito.
- Aumento y disminución de cantidades.
- Eliminación de productos del carrito.
- Cálculo automático del total del pedido.

Los productos de la carta son obtenidos desde Firebase Cloud Firestore y sus imágenes son almacenadas en Firebase Storage.

## Ejercicio 2 - Formulario y Firestore

Se implementó un formulario para registrar los datos del cliente.

El formulario solicita:

- Nombre.
- Correo electrónico.
- Teléfono.
- Dirección.

Los campos son validados mediante Simple React Validator.

Al confirmar el pedido, la aplicación almacena información en Firebase Cloud Firestore, incluyendo los datos del cliente, los productos seleccionados y el total del pedido.

## Ejercicio 3 - Bootstrap, Firebase y Android

Los formularios y componentes fueron estilizados utilizando Bootstrap.

Se implementó Firebase Authentication para controlar el acceso del personal.

Después de iniciar sesión, el personal puede administrar la carta agregando nuevos productos con:

- Nombre del producto.
- Precio.
- Imagen.

Los datos del producto son almacenados en Cloud Firestore y las imágenes son almacenadas en Firebase Storage.

Para generar la aplicación Android se utilizaron:

- Apache Cordova.
- Android Studio.
- Gradle.

Se generó una versión APK de la aplicación.

Para el proceso de firma y preparación del APK se utilizaron:

- Keytool para generar el keystore.
- Jarsigner durante el proceso de firma.
- Zipalign para alinear el APK.
- Apksigner para realizar y verificar la firma compatible con Android.

Finalmente, el APK firmado fue instalado y probado correctamente en un dispositivo Android físico.

## Ejecución del proyecto

Instalar las dependencias:

npm install

Ejecutar el proyecto en modo desarrollo:

npm run dev

Generar la versión de producción:

npm run build

## Despliegue

El código fuente del proyecto se encuentra almacenado en GitHub. (https://github.com/jessicacruzat-code/Examen_Programacion_Componentes.git)

La aplicación web se encuentra desplegada mediante Netlify.(https://examen-programacion-componentes.netlify.app/)
