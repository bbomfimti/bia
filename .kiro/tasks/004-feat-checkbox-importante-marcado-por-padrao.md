# 004 - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Informações de Trabalho

- **Branch:** `004-feat-checkbox-importante-marcado-por-padrao`
- **Derivar de:** `ia-main`
- **Agente responsável:** dev (`.kiro/agents/dev.json`)

> ⚠️ Ao iniciar esta task, verifique se está no branch `ia-main`. Caso contrário, informe e pergunte se pode retornar para ele antes de iniciar.
> Após autorização: mova esta task para `doing/`, faça commit e push no `ia-main`, e crie o branch acima para iniciar a implementação.

---

## Descrição

Na tela de cadastro de tarefa, o checkbox **"Importante"** deve vir **marcado por padrão**, facilitando o fluxo do usuário que, na maioria das vezes, considera a tarefa como importante ao criá-la.

---

## Localização do Arquivo

`client/src/components/AddTask.jsx`

---

## O que deve ser alterado

No componente `AddTask`, o estado inicial de `importante` está definido como `false`:

```js
const [importante, setImportante] = useState(false);
```

Deve ser alterado para `true`:

```js
const [importante, setImportante] = useState(true);
```

Além disso, ao limpar o formulário após o submit (`onSubmit`), o reset do campo `importante` também deve retornar para `true` (e não para `false`):

```js
setImportante(true); // era false
```

---

## Critérios de Aceite

- [ ] Ao abrir o formulário de cadastro, o checkbox "Importante" já deve estar **marcado** (checked).
- [ ] Ao submeter uma tarefa com o checkbox no estado padrão (marcado), a tarefa deve ser cadastrada como **importante = true**.
- [ ] Após o submit, o formulário é resetado e o checkbox volta a aparecer **marcado** (não desmarcado).
- [ ] O usuário ainda consegue **desmarcar** o checkbox livremente antes de salvar.
- [ ] Nenhum outro campo ou comportamento do formulário é afetado.

---

## Impacto

- **Escopo:** Apenas front-end (componente `AddTask.jsx`)
- **Risco:** Baixo — alteração isolada no estado inicial de um campo
- **Sem alterações necessárias:** backend, banco de dados, estilos CSS
