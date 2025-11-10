# NeuroRec Frontend (React + Vite)

Aplicação React responsável pela experiência do usuário do NeuroRec, consumindo o backend Spring Boot existente.

## Pré-requisitos

- Node.js 18+ (recomendado 20)
- Backend executando em `http://localhost:8080` (`mvn spring-boot:run` na pasta `NeuroRec/NeuroRec/NeuroRec`)

## Instalação

```bash
cd neurorec-frontend
npm install
cp .env.example .env # ajuste a URL do backend se necessário
```

## Scripts

- `npm run dev` – inicia o servidor Vite em modo desenvolvimento (porta 5173 por padrão)
- `npm run build` – gera build de produção em `dist/`
- `npm run preview` – serve a build de produção localmente
- `npm run lint` – executa o ESLint com as regras configuradas

## Estrutura

- `src/pages` – páginas principais (Home, Login, Register, Chat)
- `src/components` – componentes reutilizáveis (layout, cabeçalho, mensagens, cartões de cursos)
- `src/context` – contexto de autenticação e provider
- `src/services` – clientes HTTP (axios) para autenticação e chat
- `src/styles` – estilos globais

## Variáveis de ambiente

Configure o endpoint do backend em `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## Próximos passos sugeridos

- Substituir os gradientes por imagens próprias (adicione em `src/assets`)
- Adicionar testes (Vitest + React Testing Library)
- Configurar builds e deploy automático (Netlify/Vercel ou servir via backend)
