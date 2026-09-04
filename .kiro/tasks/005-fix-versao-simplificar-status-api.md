# 005 - fix - Simplificar tela de versão para exibir apenas status da API

## Modelo de Trabalho
- **Branch:** `005-fix-versao-simplificar-status-api`
- **Derivar de:** `ia-main`
- **Agente responsável pela execução:** dev

## Instruções de Início (para o agente dev)
1. Verificar se está no branch `ia-main`. Caso não esteja, informar ao usuário e perguntar se pode retornar para ele antes de iniciar.
2. Após autorização: mover esta task para **doing**, fazer commit e push no branch `ia-main`.
3. Criar o branch `005-fix-versao-simplificar-status-api` a partir de `ia-main` e iniciar a implementação.

---

## Descrição
O componente `VersionInfo.jsx` exibe um tooltip com diversas informações: ambiente, URL da API, dados de cache, link para o endpoint e botão de atualizar. O objetivo é simplificar esse tooltip para exibir **apenas as informações de status da API**.

---

## Arquivo Envolvido
- `client/src/components/VersionInfo.jsx`

---

## O que deve ser REMOVIDO do tooltip
- Linha de **Ambiente** (`getEnvironmentInfo().label`)
- Linha de **Local** (`getEnvironmentInfo().description`)
- Linha de **API URL** (`getApiUrl()`)
- Linha de **Cache** (`cacheConfig`)
- Botão **🔗 /api/versao** (link para abrir o endpoint)
- Toda a lógica de `getEnvironmentInfo()` (função pode ser removida por completo)
- A busca por `/api/cache-config` e o estado `cacheConfig` (não serão mais necessários)

## O que deve PERMANECER no tooltip
- Versão da API (`apiVersion`)
- Ícone de status (`getStatusIcon()`)
- Texto de status (`getStatusText()`) — ex: "Online", "Offline", "Verificando..."
- Botão **🔄 Atualizar** para recheck manual do status

---

## Critérios de Aceite
- [ ] O tooltip exibe apenas: versão, ícone de status e texto de status.
- [ ] O botão de atualizar (🔄) permanece funcional.
- [ ] As informações de ambiente, URL da API e cache **não aparecem** no tooltip.
- [ ] O ícone/botão que abre o tooltip continua funcionando normalmente.
- [ ] A lógica de `checkApiHealth` (verificação a cada 30s) permanece intacta.
- [ ] A aplicação builda sem erros após a mudança.

---

## Observações
- A função `getEnvironmentInfo` e o estado `cacheConfig` podem ser completamente removidos, pois não serão mais utilizados.
- A chamada para `/api/cache-config` dentro de `checkApiHealth` também deve ser removida.
- Manter o código limpo, sem variáveis ou imports não utilizados.
