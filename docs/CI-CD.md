# CI/CD - NeuroRec

Este documento resume os fluxos de CI/CD adicionados.

## CI (`.github/workflows/ci.yml`)
- Backend: Java 21, Maven, banco Postgres de servico; `./mvnw test` e depois `./mvnw -DskipTests package`; publica o artefato JAR.
- Frontend: Node 20, `npm ci`, `npm run lint`, `npm run build`; publica `dist/`.
- Executa em push para `main` e pull requests.

## Deploy (`.github/workflows/deploy.yml`)
- Backend: constroi imagem Docker do backend e publica em GHCR como `ghcr.io/<org>/neurorec-backend:latest`.
- Frontend: build estatico e deploy no GitHub Pages (precisa `VITE_API_URL`).
- Disparado em push para `main` ou manual via `workflow_dispatch`.

## Dockerfiles
- `NeuroRec/NeuroRec/Dockerfile`: build multi-stage (Maven -> JRE). Expondo 8080.
- `neurorec-frontend/Dockerfile`: build Vite e serve com Nginx.

## Segredos/variaveis esperados
- `GROQ_API_KEY`: chave Groq usada pelo backend.
- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `SPRING_JPA_HIBERNATE_DDL_AUTO` (opcional no CI porque a base vem do servico Postgres do job).
- `VITE_API_URL`: URL publica do backend para o build do frontend (Pages e builds manuais).
- (Recomendado) `JWT_SECRET`: mover a chave fixa de `JwtService` para variavel de ambiente e property.

## Uso local rapido
- Backend: exporte variaveis de banco e `GROQ_API_KEY`, depois `./mvnw spring-boot:run` em `NeuroRec/NeuroRec`.
- Frontend: `cp .env.example .env`, ajuste `VITE_API_URL`, rode `npm install` e `npm run dev` em `neurorec-frontend`.

## Observacoes
- O repo raiz tem um `package.json` com Express/Groq que nao e usado no pipeline; remova ou documente se necessario.
- Existem dois componentes `AuthProvider` (em `AuthContext.jsx` e `AuthProvider.jsx`); padronize um unico provider para evitar confusao.
