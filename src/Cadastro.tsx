import { useState } from 'react';

export function Cadastro({ aoVoltar, aoCadastrar }: { aoVoltar: () => void, aoCadastrar: () => void }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');

  const salvarUsuario = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const novoUsuario = { 
      nome, 
      email, 
      senha, 
      data_nascimento: dataNascimento, 
      endereco 
    };

    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario)
      });

      if (resposta.ok) {
        alert('Usuário cadastrado com sucesso no banco de dados! 🎉');
        aoCadastrar(); // Avisa a loja que o usuário agora está "logado"
        aoVoltar();    // Fecha a tela de cadastro e volta para a vitrine
      } else {
        alert('Ops! Ocorreu um erro ao cadastrar.');
      }
    } catch {
      alert('Erro de conexão. Verifique se o seu servidor Node.js está ligado!');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Criar Nova Conta</h2>
      
      <form onSubmit={salvarUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input required type="text" placeholder="Seu Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} style={estiloInput} />
        <input required type="email" placeholder="Seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={estiloInput} />
        <input required type="password" placeholder="Crie uma Senha" value={senha} onChange={(e) => setSenha(e.target.value)} style={estiloInput} />
        <input required type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} style={estiloInput} />
        <input required type="text" placeholder="Seu Endereço Completo" value={endereco} onChange={(e) => setEndereco(e.target.value)} style={estiloInput} />

        <button type="submit" style={{ padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' }}>
          Finalizar Cadastro
        </button>
      </form>

      <button onClick={aoVoltar} style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#7f8c8d', border: 'none', cursor: 'pointer', marginTop: '15px', textDecoration: 'underline' }}>
        Cancelar e voltar para a loja
      </button>
    </div>
  );
}

// Estilo padrão para as caixinhas de texto
const estiloInput = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};