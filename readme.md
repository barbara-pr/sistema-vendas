# Sistema de Vendas

Este é um sistema simples de vendas desenvolvido com HTML, CSS, JavaScript no frontend, e Node.js com SQLite no backend. O objetivo principal é registrar vendas de produtos de forma prática, com uma interface amigável e uma base de dados local.

## 📌 Objetivo

Criar um sistema de vendas funcional com funcionalidades básicas de cadastro de vendas, usando tecnologias acessíveis e com foco na prática de conceitos de desenvolvimento web fullstack.

---

## 👤 Persona

**Nome:** Rafael  
**Idade:** 39 anos  
**Profissão:** Dono de pequeno comércio  
**Necessidades:**  
- Registrar as vendas diárias rapidamente  
- Consultar os valores vendidos em diferentes dias  
- Ter uma solução simples sem necessidade de sistemas complexos

---

## 🛠️ Funcionalidades

- Registro de vendas (quantidade, preço e data)
- Armazenamento dos dados em um banco SQLite
- Integração frontend/backend
- Estilo simples e responsivo para fácil utilização

---

## 💻 Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- SQLite3

---

## 📊 Modelo Entidade-Relacionamento (MER)

| Entidade | Atributos                                     |
| -------- | -------------------------------------------- |
| **Tecido** (PK `id_tecido`) | `nome` (string), `segmento` (string)     |
| **Venda** (PK `id_venda`)   | `id_tecido` (FK), `quantidade` (decimal), `preco_por_metro` (decimal), `data_venda` (date) |

## 📊 Diagrama UML

### Atores
- **Vendedor**

### Casos de Uso
- Registrar venda
- Consultar relatório de vendas (quantidade e valor total por segmento, data, tecido)
- Gerar relatório por segmento (quantidade vendida de cada tecido por segmento)

## 🎯 Requisitos Funcionais (RF)

- **RF01 – Registrar vendas:**  
  O sistema deve permitir o cadastro de uma venda, informando tecido, quantidade, preço por metro e data da venda.

- **RF02 – Consultar vendas:**  
  O sistema deve exibir uma lista de vendas registradas, com possibilidade de filtro por data, segmento ou tecido.

---

## ⚙️ Requisitos Não Funcionais (RNF)

- **RNF01 – Geração de relatório em PDF:**  
  O sistema deve permitir que os relatórios de vendas consultados possam ser exportados em formato PDF.

- **RNF02 – Interface responsiva:**  
  O sistema deve funcionar adequadamente em dispositivos móveis e desktops, garantindo boa usabilidade.
