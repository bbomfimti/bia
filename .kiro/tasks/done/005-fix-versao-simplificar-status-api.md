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
- [x] O tooltip exibe apenas: versão, ícone de status e texto de status.
- [x] O botão de atualizar (🔄) permanece funcional.
- [x] As informações de ambiente, URL da API e cache **não aparecem** no tooltip.
- [x] O ícone/botão que abre o tooltip continua funcionando normalmente.
- [x] A lógica de `checkApiHealth` (verificação a cada 30s) permanece intacta.
- [x] A aplicação builda sem erros após a mudança.

---

## Observações
- A função `getEnvironmentInfo` e o estado `cacheConfig` podem ser completamente removidos, pois não serão mais utilizados.
- A chamada para `/api/cache-config` dentro de `checkApiHealth` também deve ser removida.
- Manter o código limpo, sem variáveis ou imports não utilizados.

---

## Checklist do Agente dev

- [x] Verificar se está no branch `ia-main` antes de iniciar
- [x] Mover esta task para `.kiro/tasks/doing/`, fazer commit e push no `ia-main`
- [x] Criar o branch `005-fix-versao-simplificar-status-api` a partir de `ia-main`
- [x] Remover do tooltip: linha de Ambiente, linha de Local, linha de API URL, linha de Cache e botão 🔗 /api/versao
- [x] Remover a função `getEnvironmentInfo()` por completo
- [x] Remover o estado `cacheConfig` e a chamada para `/api/cache-config`
- [x] Garantir que permanecem: versão da API, ícone de status, texto de status e botão 🔄 Atualizar
- [x] Verificar que a lógica de `checkApiHealth` (verificação a cada 30s) permanece intacta
- [x] Remover imports e variáveis não utilizados
- [x] Realizar build da aplicação e confirmar que não há erros
- [x] Validar os critérios de aceite listados acima
- [x] Fazer commit e push do branch `005-fix-versao-simplificar-status-api`
- [x] Informar ao PO que a implementação está concluída e pronta para encerramento

---

## Handoff para o PO

Ao concluir todas as etapas acima, o agente dev deve **informar ao PO (po)** que a task está finalizada e pronta para ser encerrada.

---

## Encerramento pelo PO

Ao receber o handoff do agente dev, o PO deve:

- [x] Verificar se todos os itens do checklist do agente dev estão marcados
- [x] Confirmar que todos os critérios de aceite foram atendidos
- [x] Informar ao usuário que a task está finalizada
- [x] Mover este arquivo para `.kiro/tasks/done/`
- [x] Fazer commit e push final com o encerramento da task
