# Task 006 - Implementar GitHub Actions para CI com Testes Automatizados

**Tipo:** feat  
**Agente Responsável:** devops  
**Branch Base:** ia-main  
**Branch da Task:** 006-feat-github-actions-ci-tests

---

## ⚠️ IMPORTANTE - Fluxo de Branch Obrigatório

### Antes de Iniciar a Implementação:

1. **Verificar branch atual:**
   ```bash
   git branch --show-current
   ```

2. **Se NÃO estiver em `ia-main`:**
   - ❌ **NÃO inicie a task ainda**
   - ✋ **Pergunte ao usuário:** "Não estamos no branch `ia-main`. Posso fazer checkout para `ia-main` antes de iniciar?"
   - ⏸️ **Aguarde autorização explícita**

3. **Após autorização, executar:**
   ```bash
   git checkout ia-main
   git pull origin ia-main
   ```

4. **Mover task para doing e fazer commit:**
   ```bash
   git mv .kiro/tasks/006-feat-github-actions-ci-tests.md .kiro/tasks/doing/
   git add .kiro/tasks/doing/006-feat-github-actions-ci-tests.md
   git commit -m "chore: move task 006 to doing"
   git push origin ia-main
   ```

5. **Criar branch da feature:**
   ```bash
   git checkout -b 006-feat-github-actions-ci-tests
   ```

---

## 📋 Objetivo

Implementar pipeline de CI/CD usando **GitHub Actions** para executar testes automatizados (Jest) a cada Pull Request contra o branch `ia-main`.

---

## 🎯 Contexto

O projeto BIA já possui testes unitários configurados com Jest, mas não há automação para executá-los em PRs. Precisamos garantir que:

- ✅ Todos os PRs para `ia-main` executem os testes automaticamente
- ✅ PRs com testes falhando sejam bloqueados para merge
- ✅ Desenvolvedores recebam feedback imediato sobre a saúde do código
- ✅ A qualidade do código seja mantida antes de integrar mudanças

---

## 🔍 Análise Técnica Atual

### Testes Existentes
- **Framework:** Jest 27.5.1
- **Comando:** `npm test` (executa `jest tests/unit`)
- **Cobertura atual:**
  - `tests/unit/controllers/tarefas.test.js` - 6 cenários
  - `tests/unit/controllers/versao.test.js` - 3 cenários
- **Total:** 9 testes implementados

### Stack do Projeto
- **Runtime:** Node.js 24.x
- **Package Manager:** npm
- **Dependências de Teste:** Jest (devDependency)

---

## ✅ Checklist de Implementação

### Fase 1: Criação da Estrutura GitHub Actions
- [x] Criar diretório `.github/workflows/`
- [x] Criar arquivo de workflow `ci-tests.yml`
- [x] Definir nome descritivo para o workflow
- [x] Configurar trigger para PRs contra `ia-main`

### Fase 2: Configuração do Job de Testes
- [x] Definir runner como `ubuntu-latest`
- [x] Configurar estratégia de matrix para Node.js 24.x
- [x] Adicionar step de checkout do código
- [x] Adicionar step de setup do Node.js
- [x] Configurar cache de dependências npm

### Fase 3: Execução dos Testes
- [x] Adicionar step para instalação de dependências (`npm ci`)
- [x] Adicionar step para execução dos testes (`npm test`)
- [x] Configurar timeout adequado para execução
- [x] Garantir que falhas nos testes quebrem o pipeline

### Fase 4: Validação e Documentação
- [ ] Testar workflow localmente (se possível com act)
- [ ] Criar PR de teste para validar o workflow
- [ ] Verificar que testes passando permitem merge
- [ ] Verificar que testes falhando bloqueiam merge
- [ ] Atualizar README.md com badge do CI
- [ ] Documentar workflow em `docs/` (se necessário)

### Fase 5: Commit e Push
- [x] Fazer commit das alterações com mensagem semântica
- [x] Push do branch para o repositório remoto
- [x] Marcar todos os itens do checklist como concluídos
- [x] Atualizar esta task com status de conclusão

---

## 📝 Estrutura Esperada do Workflow

```yaml
name: CI - Testes Automatizados

on:
  pull_request:
    branches:
      - ia-main

jobs:
  test:
    name: Executar Testes Unitários
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [24.x]
    
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Instalar dependências
        run: npm ci
      
      - name: Executar testes
        run: npm test
```

---

## 🎯 Critérios de Aceite

### Funcional
1. ✅ Workflow é acionado automaticamente em PRs para `ia-main`
2. ✅ Testes são executados com sucesso usando Node.js 24.x
3. ✅ Pipeline falha se algum teste falhar
4. ✅ Pipeline passa se todos os testes passarem
5. ✅ Cache de dependências npm está configurado

### Qualidade
1. ✅ Arquivo de workflow está em `.github/workflows/ci-tests.yml`
2. ✅ Workflow tem nome descritivo e comentários explicativos
3. ✅ Steps estão organizados logicamente
4. ✅ README.md atualizado com badge do workflow (opcional)

### Validação
1. ✅ PR de teste criado e workflow executado com sucesso
2. ✅ Teste manual de falha (forçar um teste a falhar e verificar pipeline)

---

## 📚 Recursos e Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [actions/checkout@v4](https://github.com/actions/checkout)
- [actions/setup-node@v4](https://github.com/actions/setup-node)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Workflow Syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

## 🚨 Observações Importantes

1. **Node.js Version:** Usar explicitamente Node.js 24.x conforme configuração do projeto
2. **npm ci vs npm install:** Usar `npm ci` para builds de CI (mais rápido e determinístico)
3. **Cache:** Configurar cache do npm para reduzir tempo de execução
4. **Segurança:** Não expor secrets ou tokens nos workflows (não aplicável nesta task)
5. **Branch Protection:** Após validação, considerar ativar branch protection rules em `ia-main`

---

## 🔄 Finalização da Task

### Quando Concluir TODAS as Atividades:

1. ✅ Marque todos os checkboxes acima
2. ✅ Faça commit final com todas as alterações
3. ✅ Push do branch para o repositório remoto
4. 📢 **Informe ao PO:** "Task 006 concluída. Workflow de CI implementado e testado com sucesso. Pronto para revisão e merge."

### O PO irá:

1. ✅ Revisar a implementação do workflow
2. ✅ Verificar se todos os critérios de aceite foram atendidos
3. ✅ Validar que todos os checkboxes estão marcados
4. ✅ Mover a task de `doing/` para `done/`
5. ✅ Fazer commit e push final da task concluída

---

**Criado em:** 2025-01-26  
**Última atualização:** 2025-01-26  
**Status:** ✅ Workflow implementado - Aguardando validação via PR
