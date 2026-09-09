# [001] Tela de Versão da API

## Tipo
`feat`

## Descrição
Criar uma tela dedicada para exibir as informações da rota `/api/versao`, seguindo o mesmo padrão visual e estrutural da tela de tarefas (`Tasks.jsx`). A tela deve ser acessível via rota `/versao` no frontend e exibir os dados retornados pela API de forma clara e organizada.

## Contexto
Atualmente a informação de versão da API (`/api/versao`) é consumida apenas pelo componente `VersionInfo.jsx`, que exibe um tooltip no canto da tela. A proposta é criar uma **página completa** para essa informação, seguindo o mesmo padrão de componente e rota já utilizado pela tela de tarefas.

A rota de versão retorna uma string no formato: `Bia 4.3.0`

## Critérios de Aceite

- [ ] Existe um novo componente `Versao.jsx` em `client/src/components/`
- [ ] O componente consome a rota `GET /api/versao` via `fetch`, da mesma forma que `Tasks.jsx` consome `/api/tarefas`
- [ ] A rota `/versao` está registrada no `App.jsx` dentro do `<Routes>`, seguindo o padrão já existente de `/` e `/about`
- [ ] A tela exibe as seguintes informações retornadas pela API:
  - Nome da aplicação (ex: `Bia`)
  - Versão (ex: `4.3.0`)
  - Status da API (online / offline / verificando)
  - URL da API sendo consumida
- [ ] A tela possui um botão de **atualizar** que refaz a chamada à API sem recarregar a página
- [ ] A tela exibe um **estado de carregamento** enquanto aguarda a resposta da API
- [ ] A tela exibe uma **mensagem de erro** amigável caso a API esteja indisponível
- [ ] O componente utiliza `useState` e `useEffect` da mesma forma que `Tasks.jsx`
- [ ] O `apiUrl` é resolvido via `import.meta.env.VITE_API_URL` com fallback para `http://localhost:8080`, igual ao padrão do `App.jsx`
- [ ] O link para a rota `/versao` é adicionado no componente `Header.jsx`, seguindo o padrão de navegação já existente

## Arquivos a Criar / Modificar

| Ação | Arquivo |
|------|---------|
| Criar | `client/src/components/Versao.jsx` |
| Modificar | `client/src/App.jsx` — adicionar `import` e `<Route path="/versao" />` |
| Modificar | `client/src/components/Header.jsx` — adicionar link de navegação para `/versao` |

## Referências de Padrão

- **Componente de referência:** `client/src/components/Tasks.jsx`
- **Rota de referência:** `App.jsx` → `<Route path="/about" element={<About />} />`
- **Consumo de API de referência:** `App.jsx` → função `fetchTasks()`
- **Endpoint backend:** `GET /api/versao` → retorna string `"Bia 4.3.0"`
- **Controller:** `api/controllers/versao.js`
- **Route:** `api/routes/versao.js`

## Observações Técnicas

- **Não modificar** o backend — a rota `/api/versao` já existe e funciona corretamente
- **Não substituir** o componente `VersionInfo.jsx` existente — o novo componente é uma tela separada
- Manter **simplicidade** no componente, sem abstrações desnecessárias
- O componente deve ser **single file**, sem sub-componentes adicionais
