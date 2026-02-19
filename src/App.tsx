import { useState, useEffect } from 'react' // Importante agregar useEffect
import './App.css'
import { Button } from './frontend/components/button/button'
import { NeuCard } from './frontend/components/NeuCard/NeuCard'
import { supabase } from '../src/backend/Conection/conection';
import { SupportDialog } from './frontend/components/SupportDialog/SupportDialog'

function App() {
  // 1. Estado para guardar los productos de la base de datos
  const [productos, setProductos] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // 2. Función para obtener los datos
  const obtenerProductos = async () => {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) {
      console.error("Error conectando:", error.message);
    } else {
      setProductos(data || []); // Guardamos los datos en el estado
    }
  };

  useEffect(() => {
    obtenerProductos();

    const intervalo = setInterval(() => {
      obtenerProductos();
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="parent">
      <div className="div1">
        <NeuCard><h1>Productos</h1></NeuCard>
      </div>

      <div className="div2">
        <NeuCard>
          <div className="button-vertical-container">
            <div className="login-form__help" onClick={() => setIsOpen(true)}>
              <Button variant="add" label="✚ Añadir" />
            </div>
    
            <div className="login-form__help" onClick={() => setIsOpen(true)}>
              <Button variant="update" label="✏️ Actualizar" />
            </div>
          </div>
        </NeuCard>
      </div>
      <SupportDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="div3">
        <NeuCard>
          <h2>Productos</h2>
        </NeuCard>
      </div>

      <div className="div4">
        <NeuCard>
          <div className="container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>{p.descripcion}</td>
                    <td>{p.estado ? "true" : "false"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}

export default App;