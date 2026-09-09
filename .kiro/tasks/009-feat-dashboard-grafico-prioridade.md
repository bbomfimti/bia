# Task 009 - Dashboard com Gráfico de Tasks por Prioridade

## 📋 Informações da Task

**Tipo:** Feature (feat)  
**Agent Responsável:** `dev` (Developer)  
**Branch de Origem:** `ia-main`  
**Branch da Task:** `009-feat-dashboard-grafico-prioridade`  
**Worktree:** `.kiro/worktrees/009-feat-dashboard-grafico-prioridade/`

---

## ⚠️ IMPORTANTE - Fluxo de Trabalho com Worktree

### Antes de Iniciar
1. ✅ Verificar se está no branch `ia-main`
2. ✅ Se não estiver, perguntar autorização para retornar
3. ✅ Após autorização:
   - Mover esta task para `.kiro/tasks/doing/`
   - Fazer commit e push no branch `ia-main`
   - **Criar worktree:** `git worktree add .kiro/worktrees/009-feat-dashboard-grafico-prioridade -b 009-feat-dashboard-grafico-prioridade ia-main`
4. ✅ Iniciar implementação no worktree

### Ao Finalizar (após PR mergiado)
1. ✅ PO verifica implementação completa
2. ✅ Move task para `.kiro/tasks/done/`
3. ✅ Faz commit e push final
4. ✅ **Remove o worktree:** `git worktree remove .kiro/worktrees/009-feat-dashboard-grafico-prioridade`

---

## 🎯 Objetivo

Criar uma **nova tela de Dashboard** com gráfico que mostre a quantidade de tasks agrupadas por prioridade (Importante vs Normal), e adicionar um link na Home que leva para esse Dashboard.

---

## 📝 Descrição

Implementar uma página de visualização de dados (Dashboard) onde o usuário possa ver um **gráfico visual** mostrando:
- Quantas tasks estão marcadas como **Importante** (`importante: true`)
- Quantas tasks são **Normais** (`importante: false`)

A navegação será feita através de um link/botão na página Home que redireciona para `/dashboard`.

---

## 🔍 Contexto Técnico

### Modelo de Dados Atual
- **Campo de prioridade:** `importante` (BOOLEAN)
  - `true` = Tarefa importante
  - `false` = Tarefa normal
- **Fonte:** `api/models/tarefas.js`

### Frontend Atual
- **React Router:** Já configurado em `App.jsx`
- **Rotas existentes:** 
  - `/` → Home
  - `/about` → About
- **Biblioteca de gráficos:** Nenhuma instalada (precisa adicionar)

### API Existente
- **Endpoint:** `GET /api/tarefas`
- **Retorna:** Array de todas as tarefas
- **Estrutura:**
  ```json
  {
    "uuid": "...",
    "titulo": "...",
    "dia_atividade": "...",
    "importante": true/false
  }
  ```

---

## ✅ Critérios de Aceite

### Funcionalidade
- [ ] Nova rota `/dashboard` criada
- [ ] Componente `Dashboard.jsx` implementado
- [ ] Link/botão na Home que redireciona para `/dashboard`
- [ ] Gráfico exibindo dados de prioridade (Importante vs Normal)
- [ ] Dados buscados da API `/api/tarefas`
- [ ] Contagem correta de tasks por prioridade
- [ ] Gráfico atualiza ao criar/deletar tasks (se retornar à home e voltar)

### UX/UI
- [ ] Gráfico usando componentes **shadcn/ui**
- [ ] Design limpo e responsivo
- [ ] Cores distintas para cada categoria
- [ ] Labels claros e legíveis
- [ ] Animação suave ao carregar gráfico
- [ ] Link/botão visível e bem posicionado na Home

### Técnico
- [ ] Componentes shadcn/ui instalados e configurados
- [ ] Recharts instalado (biblioteca de gráficos do shadcn)
- [ ] Código limpo e bem estruturado
- [ ] Reaproveitamento de código (fetch tasks)
- [ ] Tratamento de erro se API falhar

### Navegação
- [ ] Link na Home leva para Dashboard
- [ ] Botão "Voltar" ou navegação fácil de retornar à Home
- [ ] Header e Footer mantidos na nova página

---

## 🛠️ Implementação Detalhada

### 1. Instalar Dependências

#### Opção A: shadcn/ui + Recharts (Recomendado)
```bash
# Instalar shadcn/ui CLI
cd client
npx shadcn@latest init

# Instalar componente de gráfico
npx shadcn@latest add chart

# Recharts já vem como dependência do chart
```

#### Opção B: Manual (se shadcn init não funcionar)
```bash
cd client
npm install recharts
npm install tailwindcss @tailwindcss/forms
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
```

---

### 2. Configurar Tailwind CSS (se necessário)

**tailwind.config.js** (criar na raiz de `client/`)
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Adicionar ao `index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 3. Criar Componente Dashboard

**`client/src/components/Dashboard.jsx`**
```jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLog } from '../contexts/LogContext.jsx';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logApiRequest, logApiResponse, logApiError, addLog } = useLog();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const url = `${apiUrl}/api/tarefas`;
    logApiRequest('GET', url);
    
    try {
      setLoading(true);
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      logApiResponse('GET', url, res.status, data);
      
      // Extrair apenas o array de dados se vier com metadata
      const tasksArray = data.data || data;
      setTasks(tasksArray);
      addLog('SUCCESS', 'Dashboard carregado', `${tasksArray.length} tarefas encontradas`);
    } catch (err) {
      logApiError('GET', url, err);
      setError(err.message);
      addLog('ERROR', 'Falha ao carregar dashboard', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agrupar tasks por prioridade
  const getChartData = () => {
    const importante = tasks.filter(task => task.importante === true).length;
    const normal = tasks.filter(task => task.importante === false).length;

    return [
      { name: 'Importante', value: importante, color: '#ef4444' }, // Vermelho
      { name: 'Normal', value: normal, color: '#3b82f6' }, // Azul
    ];
  };

  const chartData = getChartData();
  const totalTasks = tasks.length;

  // Cores personalizadas
  const COLORS = {
    Importante: '#ef4444',
    Normal: '#3b82f6',
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2>📊 Dashboard de Prioridades</h2>
        <div className="loading">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <h2>📊 Dashboard de Prioridades</h2>
        <div className="error">
          <p>❌ Erro ao carregar dados: {error}</p>
          <button onClick={fetchTasks} className="btn">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (totalTasks === 0) {
    return (
      <div className="dashboard-container">
        <h2>📊 Dashboard de Prioridades</h2>
        <div className="empty-state">
          <p>Nenhuma tarefa encontrada para exibir estatísticas.</p>
          <p>Adicione tarefas na página inicial para ver o gráfico.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard de Prioridades</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de Tarefas</h3>
          <p className="stat-number">{totalTasks}</p>
        </div>
        <div className="stat-card importante">
          <h3>Importantes</h3>
          <p className="stat-number">{chartData[0].value}</p>
        </div>
        <div className="stat-card normal">
          <h3>Normais</h3>
          <p className="stat-number">{chartData[1].value}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Distribuição por Prioridade</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
```

---

### 4. Adicionar Rota no App.jsx

**Atualizar `client/src/App.jsx`:**
```jsx
import Dashboard from "./components/Dashboard.jsx";

// Dentro do <Routes>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

---

### 5. Adicionar Link na Home

**Atualizar componente `HomePage` em `App.jsx`:**
```jsx
import { Link } from "react-router-dom";

const HomePage = () => (
  <>
    <div className="dashboard-link-container">
      <Link to="/dashboard" className="btn-dashboard">
        📊 Ver Dashboard de Prioridades
      </Link>
    </div>
    
    <AddTask onAdd={addTask} />
    {/* resto do código */}
  </>
);
```

---

### 6. Estilização CSS

**Adicionar ao `client/src/index.css`:**
```css
/* Dashboard Container */
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-container h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: var(--text-color);
}

/* Stats Cards */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.stat-card .stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
}

.stat-card.importante .stat-number {
  color: #ef4444;
}

.stat-card.normal .stat-number {
  color: #3b82f6;
}

/* Chart Container */
.chart-container {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* Dashboard Link Button */
.dashboard-link-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-dashboard {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-dashboard:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

/* Loading e Error States */
.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
}

.error button {
  margin-top: 20px;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    padding: 20px;
  }
}
```

---

## 🔧 Checklist de Implementação

### Dev (Developer)
- [ ] Instalar shadcn/ui e Recharts
- [ ] Configurar Tailwind CSS (se necessário)
- [ ] Criar componente `Dashboard.jsx`
- [ ] Implementar busca de dados da API
- [ ] Implementar lógica de agrupamento por prioridade
- [ ] Criar gráfico de pizza (Pie Chart) com Recharts
- [ ] Adicionar cards de estatísticas (Total, Importante, Normal)
- [ ] Adicionar rota `/dashboard` no `App.jsx`
- [ ] Importar componente Dashboard no `App.jsx`
- [ ] Adicionar link/botão na Home para Dashboard
- [ ] Implementar tratamento de estados (loading, error, empty)
- [ ] Adicionar estilização CSS completa
- [ ] Testar navegação Home → Dashboard → Home
- [ ] Testar com 0 tarefas
- [ ] Testar com apenas tarefas importantes
- [ ] Testar com apenas tarefas normais
- [ ] Testar com mix de tarefas
- [ ] Verificar responsividade mobile
- [ ] Testar em Chrome, Firefox, Edge
- [ ] Marcar todos os critérios de aceite
- [ ] **Avisar o PO que a task está concluída para encerramento**

---

## 🧪 Cenários de Teste

### Teste 1: Dashboard com tarefas mistas
1. Criar 3 tarefas importantes na Home
2. Criar 5 tarefas normais na Home
3. Clicar no link "Ver Dashboard de Prioridades"
4. **Esperado:** 
   - Total: 8 tarefas
   - Importante: 3 (vermelho)
   - Normal: 5 (azul)
   - Gráfico pizza mostrando proporção correta

### Teste 2: Dashboard sem tarefas
1. Deletar todas as tarefas
2. Acessar `/dashboard`
3. **Esperado:** Mensagem "Nenhuma tarefa encontrada"

### Teste 3: Dashboard apenas importantes
1. Criar 5 tarefas importantes
2. Acessar Dashboard
3. **Esperado:** 
   - Gráfico mostrando 100% importante
   - Normal = 0

### Teste 4: Navegação
1. Estar na Home
2. Clicar no link Dashboard
3. Verificar URL mudou para `/dashboard`
4. Clicar em link do Header para voltar à Home
5. **Esperado:** Navegação fluida sem erros

### Teste 5: Responsividade
1. Abrir Dashboard em desktop
2. Redimensionar para mobile
3. **Esperado:** Layout se adapta, gráfico permanece legível

### Teste 6: Atualização de dados
1. Acessar Dashboard (5 tarefas)
2. Voltar à Home
3. Criar mais 3 tarefas
4. Voltar ao Dashboard
5. **Esperado:** Gráfico atualizado com 8 tarefas

---

## 📦 Entregáveis

1. `client/src/components/Dashboard.jsx` criado
2. `client/src/App.jsx` atualizado com nova rota
3. `client/src/index.css` com estilos do dashboard
4. Link na Home para Dashboard
5. `package.json` com novas dependências
6. Tailwind configurado (se necessário)
7. Funcionalidade testada e funcionando

---

## ⚠️ Pontos de Atenção

### Dados de Prioridade
- ✅ Campo `importante` é BOOLEAN (true/false)
- ✅ `true` = Tarefa importante (vermelho)
- ✅ `false` = Tarefa normal (azul)

### API
- ✅ Usar endpoint existente: `GET /api/tarefas`
- ✅ Não criar nova rota no backend
- ✅ Processar dados no frontend

### Biblioteca de Gráficos
- ✅ shadcn/ui + Recharts (recomendado)
- ✅ Alternativa: Chart.js ou Victory
- ✅ Gráfico de pizza (Pie Chart) mais adequado

### Navegação
- ✅ Manter Header e Footer em todas as páginas
- ✅ Link deve ser visível e intuitivo
- ✅ Não quebrar navegação existente

### Performance
- ✅ Buscar dados apenas ao carregar Dashboard
- ✅ Não fazer pooling desnecessário
- ✅ Tratar erro se API falhar

---

## 🎨 Alternativas de Gráfico

### Opção 1: Pie Chart (Recomendado)
- Melhor para mostrar proporção
- Visual simples e direto

### Opção 2: Bar Chart
- Boa para comparação
- Mais espaço para labels

### Opção 3: Donut Chart
- Variação do Pie Chart
- Espaço central para total

**Decisão:** Dev escolhe baseado em melhor UX

---

## 📚 Referências

- [shadcn/ui Charts](https://ui.shadcn.com/docs/components/chart)
- [Recharts Documentation](https://recharts.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🔚 Encerramento da Task

### Processo de Finalização (executado pelo PO)

Quando o agent responsável avisar que concluiu:

1. **Verificação de Implementação**
   - [ ] Conferir se todos os itens do checklist foram marcados
   - [ ] Verificar se todos os critérios de aceite foram atendidos
   - [ ] Testar navegação Home ↔ Dashboard
   - [ ] Validar contagem de prioridades
   - [ ] Verificar gráfico visualmente
   - [ ] Testar responsividade
   - [ ] Validar todos os cenários de teste

2. **Após PR Mergiado**
   - [ ] Confirmar que PR foi mergiado no `ia-main`
   - [ ] Mover arquivo de `.kiro/tasks/doing/` para `.kiro/tasks/done/`
   - [ ] Fazer commit e push final no `ia-main`
   - [ ] **Remover worktree:** `git worktree remove .kiro/worktrees/009-feat-dashboard-grafico-prioridade`
   - [ ] Informar ao solicitante que a task foi finalizada

**⚠️ Somente o PO pode mover a task para done e fazer o encerramento oficial.**

---

**Data de Criação:** 2026-09-08  
**Agent Inicial:** dev  
**Status:** Pronta para iniciar
