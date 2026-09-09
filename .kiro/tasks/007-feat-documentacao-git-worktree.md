# Task 007 - Documentação sobre Git Worktree

## 📋 Informações da Task

**Tipo:** Documentação educacional (feat)  
**Agent Responsável:** `po` (Product Owner)  
**Branch de Origem:** `ia-main`  
**Branch da Task:** `007-feat-documentacao-git-worktree`  
**Worktree:** `.kiro/worktrees/007-feat-documentacao-git-worktree/`

---

## ⚠️ IMPORTANTE - Fluxo de Trabalho com Worktree

### Antes de Iniciar
1. ✅ Verificar se está no branch `ia-main`
2. ✅ Se não estiver, perguntar autorização para retornar
3. ✅ Após autorização:
   - Mover esta task para `.kiro/tasks/doing/`
   - Fazer commit e push no branch `ia-main`
   - **Criar worktree** em `.kiro/worktrees/007-feat-documentacao-git-worktree/`
   - Criar branch `007-feat-documentacao-git-worktree` a partir do `ia-main`
4. ✅ Iniciar implementação no worktree

### Ao Finalizar (após PR mergiado)
1. ✅ PO verifica implementação completa
2. ✅ Move task para `.kiro/tasks/done/`
3. ✅ Faz commit e push final
4. ✅ **Remove o worktree** com `git worktree remove .kiro/worktrees/007-feat-documentacao-git-worktree`

---

## 🎯 Objetivo

Criar documentação educacional completa sobre **Git Worktree** para ensinar os alunos a:
- Entender o conceito de worktree e por que usamos
- Criar e gerenciar worktrees dentro de `.kiro/worktrees/`
- Compreender nosso workflow: pasta dedicada + gitignore
- Aplicar o processo completo: criação → desenvolvimento → remoção

---

## 📝 Descrição

Os alunos precisam entender o mecanismo de worktree que estamos usando, similar ao Claude Code:
- **Pasta dedicada:** `.kiro/worktrees/` (ignorada no git)
- **Um worktree por task:** isolamento completo
- **Ciclo de vida:** criar ao iniciar task → remover após merge

A documentação deve ser clara, didática e incluir exemplos práticos do projeto BIA.

---

## ✅ Critérios de Aceite

- [ ] Documentação criada em `docs/git-worktree-guia.md`
- [ ] Explicação do conceito de worktree
- [ ] Explicação do nosso mecanismo (pasta `.kiro/worktrees/` + gitignore)
- [ ] Comandos para criar worktree da task
- [ ] Explicação sobre branch de partida (`ia-main`)
- [ ] Comandos para gerenciar worktrees (list, remove)
- [ ] Fluxo completo: criar → desenvolver → mergear → remover
- [ ] Atualização do `.gitignore` com entrada `.kiro/worktrees/`
- [ ] Exemplos práticos aplicados ao workflow do projeto BIA
- [ ] Documento revisado e sem erros

---

## 🔍 Conteúdo Esperado na Documentação

### 1. Conceito de Worktree
- O que é um worktree
- Por que usamos no projeto BIA
- Benefícios do isolamento

### 2. Nossa Estrutura de Worktrees
- Pasta dedicada: `.kiro/worktrees/`
- Nomenclatura: usa o nome completo da task/branch
- Configuração no `.gitignore`

### 3. Criando Worktree para uma Task
```bash
# Exemplo prático
git worktree add .kiro/worktrees/007-feat-documentacao-git-worktree -b 007-feat-documentacao-git-worktree ia-main
```

### 4. Branch de Partida
- Sempre derivar de `ia-main`
- Como funciona a criação do branch
- Relação entre worktree e branch

### 5. Trabalhando no Worktree
- Navegando para o worktree
- Desenvolvimento isolado
- Commits e push

### 6. Gerenciamento de Worktrees
```bash
# Listar worktrees
git worktree list

# Remover worktree após merge
git worktree remove .kiro/worktrees/007-feat-documentacao-git-worktree
```

### 7. Ciclo de Vida Completo
1. Task criada → worktree criado
2. Desenvolvimento no worktree
3. PR criado e revisado
4. PR mergiado
5. Worktree removido

### 8. Boas Práticas
- Sempre criar worktree para novas tasks
- Remover worktree após merge
- Não commitar pasta `.kiro/worktrees/`
- Limpeza de worktrees órfãos

---

## 📚 Estrutura do Documento

```markdown
# Git Worktree - Projeto BIA

## 📖 O que é Git Worktree?
[Explicação conceitual]

## 🏗️ Nossa Estrutura de Worktrees
[Pasta .kiro/worktrees/ e gitignore]

## 🚀 Criando Worktree para uma Task
[Comando completo com exemplo]

## 🌿 Branch de Partida (ia-main)
[Explicação sobre derivação]

## 💼 Workflow Completo
[Do início ao fim da task]

## 🛠️ Comandos Essenciais
[Lista de comandos]

## ✨ Boas Práticas
[Recomendações]

## 🧹 Limpeza e Manutenção
[Como gerenciar worktrees]
```

---

## 🔧 Checklist de Implementação

### PO (Product Owner)
- [ ] Atualizar `.gitignore` adicionando `.kiro/worktrees/`
- [ ] Criar estrutura inicial do documento
- [ ] Escrever seção "O que é Git Worktree"
- [ ] Documentar nossa estrutura `.kiro/worktrees/`
- [ ] Explicar comando de criação de worktree
- [ ] Explicar conceito de branch de partida (`ia-main`)
- [ ] Documentar workflow completo (criar → mergear → remover)
- [ ] Adicionar comandos de gerenciamento
- [ ] Adicionar seção de boas práticas
- [ ] Revisar documento completo
- [ ] Testar comandos documentados
- [ ] Marcar todos os critérios de aceite
- [ ] **Avisar o PO que a task está concluída para encerramento**

---

## 📦 Entregáveis

1. `.gitignore` atualizado com `.kiro/worktrees/`
2. Arquivo `docs/git-worktree-guia.md` criado
3. Documento completo e revisado
4. Comandos testados e funcionais

---

## 🎓 Referências

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Claude Code Worktrees](https://code.claude.com/docs/en/worktrees)

---

## 🔚 Encerramento da Task

### Processo de Finalização (executado pelo PO)

Quando o agent responsável avisar que concluiu:

1. **Verificação de Implementação**
   - [ ] Conferir se todos os itens do checklist foram marcados
   - [ ] Verificar se todos os critérios de aceite foram atendidos
   - [ ] Revisar `.gitignore` atualizado
   - [ ] Revisar a documentação criada
   - [ ] Validar que os comandos estão corretos

2. **Após PR Mergiado**
   - [ ] Confirmar que PR foi mergiado no `ia-main`
   - [ ] Mover arquivo de `.kiro/tasks/doing/` para `.kiro/tasks/done/`
   - [ ] Fazer commit e push final no `ia-main`
   - [ ] **Remover worktree:** `git worktree remove .kiro/worktrees/007-feat-documentacao-git-worktree`
   - [ ] Informar ao solicitante que a task foi finalizada

**⚠️ Somente o PO pode mover a task para done e fazer o encerramento oficial.**

---

**Data de Criação:** 2025-01-XX  
**Agent Inicial:** po  
**Status:** Pronta para iniciar
