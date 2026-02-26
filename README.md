# 🤖 AI Automation Orchestrator - DIO Copilot Exercise

Este projeto é uma API de orquestração de automação construída em Node.js, desenvolvida como parte do exercício **"Usando IA Como Copiloto para Criar Novas Features"** da Digital Innovation One (DIO).

O projeto simula um fluxo de orquestração de jobs (estilo n8n/Zapier) onde cada tarefa enviada é "enriquecida" com metadados gerados por inteligência artificial.

## 🚀 Funcionalidades

- **Orquestração de Jobs**: Endpoint preparado para receber tarefas e payloads complexos.
- **AI Enrichment**: Processamento simulado que adiciona `confidence_score`, metadados de orquestração e timestamps automáticos.
- **Persistência Local**: Armazenamento automático de jobs processados em um banco de dados JSON local.
- **Arquitetura Moderna**: Implementação utilizando ES Modules (ESM) e Node.js 20+.

## 🛠️ Tecnologias Utilizadas

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Testes**: [Vitest](https://vitest.dev/) & [Supertest](https://github.com/ladjs/supertest)
- **Documentação**: Markdown profissional e notas de colaboração IA.

## 📦 Como Instalar e Rodar

1. **Clonar o repositório**:
   ```bash
   git clone <url-do-seu-repositorio>
   cd dio-copilot-exercise
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Rodar o servidor**:
   ```bash
   npm run dev
   ```

4. **Executar testes**:
   ```bash
   npm test
   ```

## 🧪 Exemplo de Uso (API)

Para processar um novo job, envie uma requisição POST para `/jobs/process`:

```bash
curl -X POST http://localhost:3000/jobs/process \
-H "Content-Type: application/json" \
-d '{
  "task": "image_analysis",
  "payload": { "url": "http://example.com/image.png" }
}'
```

## 🤖 Colaboração com Copilot

Este projeto foi desenvolvido utilizando o GitHub Copilot como parceiro de par programming. As notas detalhadas sobre como a IA auxiliou na arquitetura, tratamento de erros e sugestões técnicas podem ser encontradas em:

📄 **[Confira as notas de colaboração (AI_NOTES.md)](./AI_NOTES.md)**

---
Desenvolvido por [Matheus Menezes](https://github.com/MatheusMenezes) como parte do desafio DIO.
