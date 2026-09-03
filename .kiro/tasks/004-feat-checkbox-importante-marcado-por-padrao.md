# [004] Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Descrição
No formulário de cadastro de tarefa, o checkbox **"Importante"** deve vir marcado por padrão ao abrir o formulário. O usuário ainda pode desmarcá-lo livremente antes de salvar. Nenhuma outra parte do comportamento do formulário deve ser alterada.

## Contexto Técnico
- **Arquivo:** `client/src/components/AddTask.jsx`
- **Estado atual:** `const [importante, setImportante] = useState(false);`
- **Alteração necessária:** Mudar o valor inicial do estado de `false` para `true`

## Critérios de Aceite
- [ ] Ao abrir o formulário de cadastro, o checkbox "Importante" já aparece marcado
- [ ] O usuário consegue desmarcar o checkbox normalmente
- [ ] Após salvar a tarefa, o formulário reseta o checkbox de volta para marcado (`true`), pronto para o próximo cadastro
- [ ] O comportamento dos demais campos (Tarefa, Data/Prazo) não é afetado
- [ ] Tarefas cadastradas com o checkbox desmarcado pelo usuário são salvas corretamente com `importante: false`

## Alterações Esperadas

### `client/src/components/AddTask.jsx`
```diff
- const [importante, setImportante] = useState(false);
+ const [importante, setImportante] = useState(true);
```

```diff
- setImportante(false);
+ setImportante(true);
```

> **Atenção:** O reset do campo `importante` no `onSubmit` também deve ser atualizado para `true`, garantindo consistência após cada cadastro.

## Labels Sugeridas
- `enhancement`
- `frontend`
