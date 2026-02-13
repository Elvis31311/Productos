import { useState } from 'react'
import './App.css'
import { Button } from '../src/components/button/button'
import { NeuCard } from '../src/components/NeuCard/NeuCard'
import './App.css'

function App() {
  const [productos] = useState([
    { id: 1, nombre: 'Laptop', precio: 1200, descripcion: 'Ultima generación' },
    { id: 2, nombre: 'PC', precio: 800, descripcion: 'de escritorio' }
  ]);

  return (
    <>
      <NeuCard>
        <center><h1>Productos</h1></center>
      </NeuCard>
    <div className='grid-container-products'>
      <NeuCard>
      <div className="container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </NeuCard>
      <NeuCard>
        <div className="card">
          <Button variant="add" label="Agregar Producto" />
          <Button variant="update" label="Editar" />
          <Button variant="delete" label="Borrar" /> 
        </div>
      </NeuCard>
    </div>
    </>
  )
}

export default App
