# 004 - feat - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Modelo de Trabalho
- **Branch:** `004-feat-checkbox-importante-marcado-por-padrao`
- **Derivar de:** `ia-main`
- **Agente responsável pela execução:** dev

## Instruções de Início (para o agente dev)
1. Verificar se está no branch `ia-main`. Caso não esteja, informar ao usuário e perguntar se pode retornar para ele antes de iniciar.
2. Após autorização: mover esta task para **doing**, fazer commit e push no branch `ia-main`.
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

## Critérios de Aceite
- [ ] Ao abrir o formulário de cadastro de tarefa, o checkbox "Importante" já deve estar marcado.
- [ ] O usuário pode desmarcar o checkbox normalmente antes de salvar.
- [ ] Após salvar uma tarefa, o formulário é resetado e o checkbox volta a aparecer **marcado** (padrão).
- [ ] O comportamento das demais funcionalidades do formulário não é alterado.
- [ ] A rota `/api/versao` continua respondendo corretamente após o build.

---

## Observações
- Mudança de escopo mínimo: apenas o valor inicial do `useState` é alterado.
- Não há impacto no backend nem em outros componentes.
