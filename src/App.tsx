import { useState, useEffect } from 'react';
import './App.css';
import { Button } from './frontend/components/button/button';
import { NeuCard } from './frontend/components/NeuCard/NeuCard';
import { supabase } from '../src/backend/Conection/conection';
import { AddProductModal } from './frontend/components/AddProductModal/AddProductModal';
import { UpdateProductModal } from './frontend/components/UpdateProductModal/UpdateProductModal';
import { DeleteProductModal } from './frontend/components/DeleteProductModal/DeleteProductModal';
import { deleteProduct } from '../src/backend/Acctions/Delete/delete';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  estado: boolean;
}

function App() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Which product is currently selected?
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const obtenerProductos = async () => {
    // Solo mostramos productos activos (estado = true)
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('estado', true)
      .order('id', { ascending: true });

    if (error) {
      console.error("Error conectando:", error.message);
    } else {
      setProductos(data || []);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id);
        obtenerProductos();
      } catch (error) {
        alert('Hubo un error al eliminar el producto.');
      }
    }
  };

  // Filtrado de la tabla (búsqueda)
  const filteredProductos = productos.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.id.toString().includes(query) ||
      p.nombre.toLowerCase().includes(query) ||
      p.precio.toString().includes(query)
    );
  });

  return (
    <div className="parent">
      {/* SECCIÓN SUPERIOR - Título */}
      <div className="top-section">
        <NeuCard><h1 className="title-gradient">Gestión de Productos</h1></NeuCard>
      </div>

      {/* SECCIÓN MEDIA - Buscador y Botón Añadir en una sola Card limpia */}
      <div className="middle-section" style={{ gridTemplateColumns: '1fr' }}>
        <div className="main-content">
          <NeuCard>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>

              <div style={{ flex: '1', minWidth: '250px', display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Lista de Productos</h2>
                <div className="search-container" style={{ flex: '1' }}>
                  <input
                    type="text"
                    placeholder="🔍 Buscar por ID, Nombre o Precio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{ margin: 0, width: '100%', maxWidth: 'none' }}
                  />
                </div>
              </div>

              <div style={{ width: '180px' }} onClick={() => setIsAddOpen(true)}>
                <Button variant="add" label="✚ Añadir Nuevo" />
              </div>

            </div>
          </NeuCard>
        </div>
      </div>

      {/* MODALES */}
      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={obtenerProductos}
      />

      <UpdateProductModal
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={obtenerProductos}
        product={selectedProduct}
      />

      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
        productName={selectedProduct?.nombre}
      />

      {/* SECCIÓN INFERIOR - Tabla */}
      <div className="bottom-section">
        <NeuCard>
          <div className="container" style={{ overflowX: 'auto', width: '100%', padding: '0' }}>
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductos.map((p) => (
                  <tr key={p.id} className="table-row">
                    <td><span className="id-badge">#{p.id}</span></td>
                    <td className="fw-bold">{p.nombre}</td>
                    <td className="price-col">${p.precio.toFixed(2)}</td>
                    <td>{p.descripcion}</td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button className="action-btn update-btn" onClick={() => handleUpdateClick(p)}>
                        ✏️ Actualizar
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteClick(p)}>
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProductos.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      No se encontraron productos activos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}

export default App;