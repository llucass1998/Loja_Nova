import type { Produto } from './types';

export const produtosMock: Produto[] = [
  {
    id: 1,
    nome: "Ninho com Morango",
    descricao: "Uma casca de chocolate nobre branco Sicao, recheada com creme de Ninho, geleia de morango artesanal e brigadeiro cremoso de Ninho. Finalizado com morangos inteiros e brigadeiros de Ninho. Aprox. 550g.",
    quant: 10,
    valor: 105.00,
    ativo: true,
    foto: ["/assets/ninho-morango.png"]
  },
  {
    id: 2,
    nome: "Kinder",
    descricao: "Uma casca de chocolate nobre ao leite Sicao, recheada com creme de Ninho, Nutella, barrinha Kinder e brigadeiro cremoso de Ninho. Finalizado com Kinder Bueno, brigadeiros trufados e brigadeiro de Ninho. Aprox. 500g.",
    quant: 10,
    valor: 115.00,
    ativo: true,
    foto: ["/assets/kinder.png"]
  },
  {
    id: 3,
    nome: "Ferrero Rocher",
    descricao: "Uma casca de chocolate nobre ao leite Sicao, recheada com creme Ferrero, Nutella e brigadeiro cremoso blend. Finalizado com brigadeiro, amendoim, avelãs e o delicioso Ferrero Rocher. Aprox. 450g.",
    quant: 10,
    valor: 110.00,
    ativo: true,
    foto: ["/assets/ferrero.png"]
  },
  {
    id: 4,
    nome: "Caribe",
    descricao: "Duas cascas de chocolate nobre ao leite Sicao, cravejadas do delicioso bombom CARIBE, finalizado com chocolate nobre ao leite, contendo dentro 1 bombom Caribe de 30g. Aprox. 460g.",
    quant: 10,
    valor: 110.00,
    ativo: true,
    foto: ["/assets/caribe.png"]
  },
  {
    id: 5,
    nome: "Caramelo Crock",
    descricao: "Casca de chocolate nobre blend Sicao, recheada com brigadeiro trufado cremoso, massa chocolatuda finalizada com brigadeiro trufado cremoso, acompanha calda extra cremosa. Aprox. 420g.",
    quant: 10,
    valor: 110.00,
    ativo: true,
    foto: ["/assets/caramelo.png"]
  },
  {
    id: 6,
    nome: "Ovomaltine Rocks",
    descricao: "Casca de chocolate nobre blend Sicao, recheado com brigadeiro trufado cremoso, creme de ovomaltine e finalizado com ovomaltine rocks. Aprox. 460g.",
    quant: 10,
    valor: 138.00,
    ativo: true,
    foto: ["/assets/ovomaltine.png"]
  }
];