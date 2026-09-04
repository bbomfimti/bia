# 004 - feat - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Modelo de Trabalho
- **Branch:** `004-feat-checkbox-importante-marcado-por-padrao`
- **Derivar de:** `ia-main`
- **Agente responsável pela execução:** dev

## Instruções de Início (para o agente dev)
1. Verificar se está no branch `ia-main`. Caso não esteja, informar ao usuário e perguntar se pode retornar para ele antes de iniciar.
2. Após autorização: mover esta task para `.kiro/tasks/doing`, fazer commit e push no branch `ia-main`.
3. Criar o branch `004-feat-checkbox-importante-marcado-por-padrao` a partir de `ia-main` e iniciar a implementação.

---

## Descrição
Na tela de cadastro de tarefa, o checkbox **"Importante"** deve vir **marcado por padrão**, de forma que toda nova tarefa seja criada como importante, a menos que o usuário desmarque manualmente.

---

## Arquivo Envolvido
- `client/src/components/AddTask.jsx`

---

## Mudança Necessária
No componente `AddTask.jsx`, alterar o valor inicial do estado `importante` de `false` para `true`:

```jsx
// Antes
const [importante, setImportante] = useState(false);

// Depois
const [importante, setImportante] = useState(true);
```

---

## Checklist do Agente dev

- [ ] Verificar se está no branch `ia-main` antes de iniciar
- [ ] Mover a task para `.kiro/tasks/doing`, fazer commit e push no `ia-main`
- [ ] Criar o branch `004-feat-checkbox-importante-marcado-por-padrao` a partir de `ia-main`
- [ ] Alterar o valor inicial do estado `importante` de `false` para `true` em `AddTask.jsx`
- [ ] Verificar que o checkbox aparece marcado ao abrir o formulário de cadastro
- [ ] Verificar que o usuário consegue desmarcar o checkbox antes de salvar
- [ ] Verificar que, após salvar, o formulário reseta com o checkbox marcado novamente
- [ ] Confirmar que as demais funcionalidades do formulário não foram afetadas
- [ ] Confirmar que a rota `/api/versao` continua respondendo corretamente após o build
- [ ] Fazer commit e push das alterações no branch da task
- [ ] Avisar o PO que a implementação foi concluída e a task pode ser encerrada

---

## Critérios de Aceite
- [ ] Ao abrir o formulário de cadastro de tarefa, o checkbox "Importante" já deve estar marcado.
- [ ] O usuário pode desmarcar o checkbox normalmente antes de salvar.
- [ ] Após salvar uma tarefa, o formulário é resetado e o checkbox volta a aparecer **marcado** (padrão).
- [ ] O comportamento das demais funcionalidades do formulário não é alterado.
- [ ] A rota `/api/versao` continua respondendo corretamente após o build.

---

## Encerramento (PO)

> ⚠️ **Apenas o PO finaliza e move esta task para `done`.**

Quando o agente dev concluir todas as etapas do checklist, deverá **avisar o PO** para que o encerramento seja feito.

### O que o PO deve fazer ao final:
1. Verificar se todos os itens do checklist do agente dev estão marcados.
2. Verificar se todos os critérios de aceite foram atendidos.
3. Tudo estando ok, informar ao usuário que a task está finalizada.
4. Mover este arquivo para `.kiro/tasks/done/`.
5. Fazer commit e push final com a task encerrada.

---

## Observações
- Mudança de escopo mínimo: apenas o valor inicial do `useState` é alterado.
- Não há impacto no backend nem em outros componentes.
