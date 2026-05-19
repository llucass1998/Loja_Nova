import { useState } from 'react';
import { produtosMock } from './dados';
import { Cadastro } from './Cadastro';
import type { Produto } from './types';

// 1. Criamos um tipo específico para o Carrinho. 
// Ele pega tudo do 'Produto' e adiciona a propriedade 'quantidadePedido'
interface ItemCarrinho extends Produto {
  quantidadePedido: number;
}

function App() {
  // Estados limpos e organizados (sem duplicatas)
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  // 3. A Nova Lógica Matemática com trava de usuário logado
  const adicionarAoCarrinho = (produto: Produto) => {
    // TRAVA: Bloqueia a compra se o usuário não tiver uma conta
    if (!usuarioLogado) {
      alert("Você precisa criar uma conta para adicionar itens ao carrinho!");
      setMostrarCadastro(true); // Abre o formulário automaticamente
      return; // Interrompe a execução aqui
    }

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

  // 4. Recalculando os totais baseados na quantidade do pedido
  const totalItens = carrinho.reduce((total, item) => total + item.quantidadePedido, 0);
  const valorTotal = carrinho.reduce((total, item) => total + (item.valor * item.quantidadePedido), 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>Nandez Chocolates</h1>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          {/* Alterna o botão de criar conta pelo aviso de logado */}
          {!usuarioLogado ? (
            <button 
              onClick={() => setMostrarCadastro(true)}
              style={{ padding: '10px 15px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              👤 Criar Conta
            </button>
          ) : (
            <div style={{ padding: '10px 15px', color: '#27ae60', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              ✅ Você está logado!
            </div>
          )}
          
          <div style={{ backgroundColor: '#e67e22', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            🛒 {totalItens} itens | Total: R$ {valorTotal.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* ALTERNA ENTRE AS TELAS DA APLICAÇÃO */}
      {mostrarCadastro ? (
        
        // Passamos as duas funções necessárias para o controle do componente de Cadastro
        <Cadastro 
          aoVoltar={() => setMostrarCadastro(false)} 
          aoCadastrar={() => setUsuarioLogado(true)} 
        />
        
      ) : (
        
        // Mostra a vitrine tradicional de doces
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {produtosMock.map((produto) =>
            produto.ativo ? (
              <div key={produto.id} style={{ width: '260px', backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
                <img src={produto.foto[0]} alt={produto.nome} style={{ width: '100%', height: '160px', objectFit: 'contain' }} />
                <h3 style={{ margin: '10px 0 6px 0' }}>{produto.nome}</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', height: '44px', overflow: 'hidden' }}>{produto.descricao}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <strong>R$ {produto.valor.toFixed(2)}</strong>
                  <button onClick={() => adicionarAoCarrinho(produto)} style={{ padding: '8px 10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Adicionar</button>
                </div>
              </div>
            ) : null
          )}
        </div>

      )}

    </div>
  );
}

export default App;