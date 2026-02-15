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
      <div className="parent">
        <div className="div1">
          <NeuCard>
            <center><h1>Temas</h1></center>
          </NeuCard> 
        </div>

        <div className="div2">
          <NeuCard>
            {/* Envolvemos los botones en este div */}
            <div className="button-vertical-container">
              <Button variant="add" label="✚ Añadir" />
              <Button variant="update" label="✏️ Actualizar" />
              <Button variant="delete" label="🗑️ Eliminar" />
            </div>
          </NeuCard>
        </div>

        <div className="div3"> 
          <NeuCard>
            <center><h2>Lista de Productos</h2></center>
          </NeuCard>
        </div>

        <div className="div4"> 
          <NeuCard>
            <div className="container">
              <table className="product-table">
                <thead>
                  <tr>
                  <th>ID</th>
                  <th>Nombreee</th>
                  <th>Preciooo</th>
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
        </div>
      </div>
    </>
  )
}

export default App
