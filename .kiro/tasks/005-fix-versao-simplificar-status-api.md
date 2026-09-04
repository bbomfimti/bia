# [005] Simplificar tela de versão — exibir apenas status da API

## Tipo
`fix`

## Branch
`005-fix-versao-simplificar-status-api` (derivar de `ia-main`)

## Agent responsável
`dev` (.kiro/agents/dev.json)

## Instruções de início
Antes de iniciar, verificar se está no branch `ia-main`.  
Caso contrário, informar e aguardar autorização para retornar antes de prosseguir.  
Após autorização: mover esta task para `doing/`, fazer commit e push no `ia-main`, depois criar o branch `005-fix-versao-simplificar-status-api` para iniciar a implementação.

---

## Descrição
O componente `VersionInfo.jsx` (tooltip de versão exibido no canto da tela) está mostrando informações em excesso: ambiente (local/IP/ALB/produção), dados do cliente (hostname, porta), configuração de cache, link para o endpoint, etc.

A proposta é simplificar o componente para exibir **apenas o status da API** — removendo toda informação de ambiente e cliente.

## Contexto
Arquivo afetado: `client/src/components/VersionInfo.jsx`

O componente atual exibe no tooltip:
- Versão da API (ex: `Bia 4.3.0`)
- Status da API (🟢 Online / 🔴 Offline / 🟡 Verificando)
- Tipo de ambiente (Local, IP Direto, ALB HTTP, Produção)
- Endereço local do cliente (hostname:porta)
- URL da API consumida
- Config de cache (endpoint, porta, TTL) — quando disponível
- Botão de link para `/api/versao`
- Botão de atualizar

O que deve **permanecer** após a simplificação:
- Ícone de status no botão (🟢 🔴 🟡)
- Versão da API (ex: `Bia 4.3.0`)
- Status da API (Online / Offline / Verificando)
- Botão de atualizar

## Critérios de Aceite

- [ ] O componente `VersionInfo.jsx` não exibe mais informações de **ambiente** (tipo: Local, IP Direto, ALB, Produção)
- [ ] O componente não exibe mais o **endereço do cliente** (hostname, porta, URL local)
- [ ] O componente não exibe mais a **URL da API** sendo consumida
- [ ] O componente não exibe mais **configuração de cache** (endpoint, porta, TTL)
- [ ] O componente não exibe mais o **botão de link** para `/api/versao`
- [ ] O tooltip ainda exibe: **versão da API** e **status** (Online/Offline/Verificando)
- [ ] O **botão de atualizar** ainda funciona corretamente
- [ ] O **ícone de status** no botão (🟢 🔴 🟡) ainda reflete o estado da API
- [ ] A lógica de `checkApiHealth` (fetch para `/api/versao`) é mantida, apenas a exibição é simplificada
- [ ] O intervalo de recheck a cada 30 segundos é mantido
- [ ] A função `getEnvironmentInfo` e suas referências são **removidas** do componente
- [ ] A lógica de `cacheConfig` e o fetch para `/api/cache-config` são **removidos** do componente
- [ ] O estado `cacheConfig` e `setCacheConfig` são **removidos**

## Arquivos a Modificar

| Ação | Arquivo |
|------|---------|
| Modificar | `client/src/components/VersionInfo.jsx` |

## Observações Técnicas

- **Não alterar** o backend
- **Não alterar** outros componentes
- Manter o componente **single file** e simples
- Após a simplificação, o componente deve ter significativamente menos código
