export class Produto {
    id: number;
    codigo: string;
    nome: string;
    preco: string;
  
    constructor(codigo, nome, preco) {
      this.codigo = codigo;
      this.nome = nome;
      this.preco = preco;
    }
  }
  