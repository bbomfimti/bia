# Task 008 - Implementar DatePicker/Calendário no Campo Data

## 📋 Informações da Task

**Tipo:** Feature (feat)  
**Agent Responsável:** `dev` (Developer)  
**Branch de Origem:** `ia-main`  
**Branch da Task:** `008-feat-datepicker-calendario`  
**Worktree:** `.kiro/worktrees/008-feat-datepicker-calendario/`

---

## ⚠️ IMPORTANTE - Fluxo de Trabalho com Worktree

### Antes de Iniciar
1. ✅ Verificar se está no branch `ia-main`
2. ✅ Se não estiver, perguntar autorização para retornar
3. ✅ Após autorização:
   - Mover esta task para `.kiro/tasks/doing/`
   - Fazer commit e push no branch `ia-main`
   - **Criar worktree:** `git worktree add .kiro/worktrees/008-feat-datepicker-calendario -b 008-feat-datepicker-calendario ia-main`
4. ✅ Iniciar implementação no worktree

### Ao Finalizar (após PR mergiado)
1. ✅ PO verifica implementação completa
2. ✅ Move task para `.kiro/tasks/done/`
3. ✅ Faz commit e push final
4. ✅ **Remove o worktree:** `git worktree remove .kiro/worktrees/008-feat-datepicker-calendario`

---

## 🎯 Objetivo

Substituir o campo de texto livre por um **componente de calendário (DatePicker)** no formulário "Add Task" da tela home, permitindo que o usuário selecione uma data de forma visual e intuitiva.

---

## 📝 Descrição

Atualmente, o campo "Data/Prazo" no componente `AddTask.jsx` é um `input type="text"` onde o usuário digita manualmente a data. 

**Problema atual:**
- Campo de texto livre (type="text")
- Sem validação de formato
- Experiência do usuário não é ideal

**Solução proposta:**
- Implementar um componente DatePicker/Calendário
- Manter compatibilidade com backend (dados persistem como STRING)
- Melhorar UX com seleção visual de data
- Manter formato brasileiro (dd/MM/yyyy)

---

## 🔍 Contexto Técnico

### Frontend Atual
- **Arquivo:** `client/src/components/AddTask.jsx`
- **Campo atual:** `<input type="text" placeholder="Quando?" />`
- **State:** `const [dia, setDia] = useState("");`
- **Formato padrão:** `new Date().toLocaleDateString('pt-BR')`

### Backend
- **Modelo:** `api/models/tarefas.js`
- **Campo:** `dia_atividade: DataTypes.STRING`
- **⚠️ IMPORTANTE:** Dados são persistidos como **STRING**, não DATE

### Banco de Dados
- **Migration:** `database/migrations/20210924000838-criar-tarefas.js`
- **Coluna:** `dia_atividade` tipo `Sequelize.STRING`

---

## ✅ Critérios de Aceite

### Funcionalidade
- [ ] Campo de texto substituído por DatePicker/Calendário
- [ ] Usuário consegue clicar e visualizar calendário
- [ ] Usuário consegue selecionar data no calendário
- [ ] Data selecionada aparece no formato brasileiro (dd/MM/yyyy)
- [ ] Se não selecionar data, usa data atual como padrão
- [ ] Dados continuam sendo salvos como STRING no banco

### UX/UI
- [ ] Componente responsivo e visualmente agradável
- [ ] Integrado ao design existente da BIA
- [ ] Animação suave ao abrir/fechar calendário
- [ ] Fácil navegação entre meses/anos

### Técnico
- [ ] Biblioteca leve e confiável escolhida
- [ ] Sem quebrar funcionalidade existente
- [ ] Formato de data compatível com backend (STRING)
- [ ] Código limpo e bem estruturado

### Testes
- [ ] Testar criação de tarefa com data selecionada
- [ ] Testar criação de tarefa sem selecionar data (usa data atual)
- [ ] Verificar que dados são salvos corretamente no banco
- [ ] Testar em diferentes navegadores

### Documentação
- [ ] Comentar código do DatePicker
- [ ] Atualizar README se necessário

---

## 🛠️ Sugestões de Implementação

### Bibliotecas Recomendadas

#### Opção 1: react-datepicker (Recomendada)
```bash
npm install react-datepicker --prefix client
```
- ✅ Mais popular (11k+ stars)
- ✅ Simples e leve
- ✅ Boa documentação
- ✅ Suporte a internacionalização (pt-BR)

#### Opção 2: react-day-picker
```bash
npm install react-day-picker --prefix client
```
- ✅ Moderna e flexível
- ✅ Customizável
- ✅ Acessibilidade built-in

#### Opção 3: @mui/x-date-pickers (Se já usar Material-UI)
```bash
npm install @mui/x-date-pickers @mui/material @emotion/react @emotion/styled --prefix client
```
- ✅ Integrado ao Material-UI
- ⚠️ Mais pesado

**Decisão:** Agent dev escolhe a melhor opção baseado nas dependências atuais do projeto

---

## 📦 Exemplo de Implementação (react-datepicker)

### Estrutura Sugerida

```jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [dia, setDia] = useState(new Date()); // Date object
  const [importante, setImportante] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    // Converter Date para string no formato brasileiro
    const diaFormatado = dia.toLocaleDateString('pt-BR');

    onAdd({ 
      titulo: titulo.trim(), 
      dia_atividade: diaFormatado, // STRING
      importante 
    });

    setTitulo("");
    setDia(new Date());
    setImportante(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      
      <div className="form-control">
        <label>Data/Prazo</label>
        <DatePicker
          selected={dia}
          onChange={(date) => setDia(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Selecione a data"
          className="datepicker-input"
        />
      </div>
      
      <div className="form-control-check">
        <input
          type="checkbox"
          id="importante"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
        />
        <label htmlFor="importante">Importante</label>
      </div>
      
      <button type="submit" className="btn btn-block success">
        Add New Task
      </button>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Campo obrigatório"
        message="Por favor, adicione uma descrição para a tarefa"
        type="warning"
      />
    </form>
  );
};

export default AddTask;
```

### Estilização CSS

```css
/* Adicionar ao index.css ou criar datepicker.css */
.datepicker-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
}

.datepicker-input:focus {
  outline: none;
  border-color: #007bff;
}

.react-datepicker {
  font-family: inherit;
}

.react-datepicker__header {
  background-color: #007bff;
}

.react-datepicker__current-month,
.react-datepicker__day-name {
  color: white;
}
```

---

## 🔧 Checklist de Implementação

### Dev (Developer)
- [ ] Analisar dependências atuais do projeto
- [ ] Escolher biblioteca de DatePicker adequada
- [ ] Instalar biblioteca escolhida
- [ ] Importar componente DatePicker no `AddTask.jsx`
- [ ] Substituir input text por DatePicker
- [ ] Configurar formato de data brasileiro (dd/MM/yyyy)
- [ ] Configurar locale para pt-BR
- [ ] Ajustar state para trabalhar com Date object
- [ ] Converter Date para STRING antes de enviar ao backend
- [ ] Adicionar estilização CSS customizada
- [ ] Integrar ao design existente
- [ ] Testar criação de tarefa com data selecionada
- [ ] Testar criação de tarefa sem selecionar data
- [ ] Verificar salvamento no banco de dados
- [ ] Testar em Chrome, Firefox, Edge
- [ ] Verificar responsividade mobile
- [ ] Adicionar comentários no código
- [ ] Marcar todos os critérios de aceite
- [ ] **Avisar o PO que a task está concluída para encerramento**

---

## 🧪 Cenários de Teste

### Teste 1: Criar tarefa com data selecionada
1. Acessar home da BIA
2. Clicar no campo "Data/Prazo"
3. Selecionar uma data no calendário (ex: 15/03/2026)
4. Preencher título da tarefa
5. Clicar em "Add New Task"
6. **Esperado:** Tarefa criada com data "15/03/2026" salva como STRING

### Teste 2: Criar tarefa sem selecionar data
1. Acessar home da BIA
2. Preencher apenas título da tarefa
3. Não mexer no campo de data
4. Clicar em "Add New Task"
5. **Esperado:** Tarefa criada com data atual

### Teste 3: Navegação no calendário
1. Clicar no campo "Data/Prazo"
2. Navegar entre meses usando setas
3. Navegar entre anos
4. Selecionar data de outro mês
5. **Esperado:** Data selecionada corretamente

### Teste 4: Validação de formato
1. Criar tarefa com data selecionada
2. Verificar no banco de dados
3. **Esperado:** Campo `dia_atividade` contém STRING no formato "dd/MM/yyyy"

---

## 📦 Entregáveis

1. `client/src/components/AddTask.jsx` atualizado com DatePicker
2. CSS customizado para o DatePicker
3. Dependência instalada no `package.json`
4. Funcionalidade testada e funcionando
5. Backend continua recebendo STRING (sem alterações)

---

## ⚠️ Pontos de Atenção

### Backend NÃO DEVE ser alterado
- ✅ Campo `dia_atividade` permanece como STRING
- ✅ Nenhuma migration necessária
- ✅ Nenhuma alteração no modelo
- ✅ Nenhuma alteração no controller

### Formato de Data
- ✅ Usar sempre formato brasileiro: `dd/MM/yyyy`
- ✅ Converter Date object para STRING antes de enviar ao backend
- ✅ Manter compatibilidade com dados existentes

### Compatibilidade
- ✅ Não quebrar funcionalidade existente
- ✅ Tarefas antigas continuam funcionando
- ✅ Formato de data mantém padrão

---

## 📚 Referências

- [react-datepicker](https://reactdatepicker.com/)
- [react-day-picker](https://react-day-picker.js.org/)
- [MDN: Date.toLocaleDateString](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

---

## 🔚 Encerramento da Task

### Processo de Finalização (executado pelo PO)

Quando o agent responsável avisar que concluiu:

1. **Verificação de Implementação**
   - [ ] Conferir se todos os itens do checklist foram marcados
   - [ ] Verificar se todos os critérios de aceite foram atendidos
   - [ ] Testar funcionalidade do DatePicker
   - [ ] Verificar que dados são salvos como STRING
   - [ ] Validar UX/UI e responsividade

2. **Após PR Mergiado**
   - [ ] Confirmar que PR foi mergiado no `ia-main`
   - [ ] Mover arquivo de `.kiro/tasks/doing/` para `.kiro/tasks/done/`
   - [ ] Fazer commit e push final no `ia-main`
   - [ ] **Remover worktree:** `git worktree remove .kiro/worktrees/008-feat-datepicker-calendario`
   - [ ] Informar ao solicitante que a task foi finalizada

**⚠️ Somente o PO pode mover a task para done e fazer o encerramento oficial.**

---

**Data de Criação:** 2026-09-08  
**Agent Inicial:** dev  
**Status:** Pronta para iniciar
