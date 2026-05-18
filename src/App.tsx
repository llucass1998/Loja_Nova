import { useState } from 'react';
import { produtosMock } from './dados';
import type { Produto } from './types';

// 1. Criamos um tipo específico para o Carrinho. 
// Ele pega tudo do 'Produto' e adiciona a propriedade 'quantidadePedido'
interface ItemCarrinho extends Produto {
  quantidadePedido: number;
}

function App() {
  // 2. Agora o nosso carrinho guarda itens do tipo 'ItemCarrinho'
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  // 3. A Nova Lógica Matemática
  const adicionarAoCarrinho = (produto: Produto) => {
    // Tenta encontrar o produto dentro do carrinho atual
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      // Se ele já existe, atualizamos a lista somando +1 na quantidade desse item específico
      const carrinhoAtualizado = carrinho.map((item) =>
        item.id === produto.id
          ? { ...item, quantidadePedido: item.quantidadePedido + 1 }
          : item // Se não for o item clicado, mantém como estava
      );
      setCarrinho(carrinhoAtualizado);
    } else {
      // Se for a primeira vez que clica nele, adiciona na lista com quantidade = 1
      setCarrinho([...carrinho, { ...produto, quantidadePedido: 1 }]);
    }
  };

  // 4. Recalculando os totais (agora multiplicamos o valor pela quantidade pedida)
  const totalItens = carrinho.reduce((total, item) => total + item.quantidadePedido, 0);
  const valorTotal = carrinho.reduce((total, item) => total + (item.valor * item.quantidadePedido), 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>Nandez Chocolates</h1>
        <div style={{ backgroundColor: '#e67e22', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {/* Atualizamos aqui para mostrar o 'totalItens' matemático */}
          🛒 {totalItens} itens | Total: R$ {valorTotal.toFixed(2)}
        </div>
      </div>
      
      {/* LISTA DE PRODUTOS */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {produtosMock.map((produto) => (
          <div key={produto.id} style={{ backgroundColor: '#fff', border: '1px solid #eee', padding: '15px', borderRadius: '8px', width: '300px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            
            <img 
              src={produto.foto[0]} 
              alt={produto.nome} 
              style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
            />
            
            <h2 style={{ fontSize: '1.3rem', margin: '0 0 10px 0', color: '#333' }}>{produto.nome}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', flexGrow: 1, lineHeight: '1.4' }}>{produto.descricao}</p>
            <h3 style={{ color: '#27ae60', fontSize: '1.5rem', margin: '15px 0' }}>R$ {produto.valor.toFixed(2)}</h3>
            
            <button 
              onClick={() => adicionarAoCarrinho(produto)}
              style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', width: '100%', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;