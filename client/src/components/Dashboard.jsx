import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLog } from "../contexts/LogContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Cores alinhadas ao tema da BIA (variáveis CSS não funcionam no Recharts, usar hex fixo)
const COR_IMPORTANTE = "#ef4444"; // accent-danger
const COR_NORMAL = "#3b82f6";     // accent-primary

/**
 * Dashboard de Prioridades
 * Exibe gráficos com a distribuição de tarefas por prioridade (Importante vs Normal)
 */
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
    logApiRequest("GET", url);

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      const data = await res.json();

      logApiResponse("GET", url, res.status, data);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      // A API pode retornar { data: [...] } ou diretamente um array
      const tasksArray = data.data || data;
      setTasks(tasksArray);
      addLog("SUCCESS", "Dashboard carregado", `${tasksArray.length} tarefas encontradas`);
    } catch (err) {
      logApiError("GET", url, err);
      setError(err.message);
      addLog("ERROR", "Falha ao carregar dashboard", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calcula os dados para os gráficos
  const importantes = tasks.filter((t) => t.importante === true).length;
  const normais = tasks.filter((t) => t.importante === false).length;
  const total = tasks.length;

  const chartData = [
    { name: "Importante", value: importantes, fill: COR_IMPORTANTE },
    { name: "Normal", value: normais, fill: COR_NORMAL },
  ];

  // Label customizado para o gráfico de pizza
  const renderLabel = ({ name, percent }) =>
    percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : "";

  // --- Estados de carregamento / erro / vazio ---

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <span className="dashboard-loading-spinner" />
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">📊 Dashboard de Prioridades</h2>
        <div className="dashboard-error">
          <p>❌ Erro ao carregar dados: {error}</p>
          <button onClick={fetchTasks} className="btn success">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">📊 Dashboard de Prioridades</h2>
        <div className="dashboard-empty">
          <p>📝 Nenhuma tarefa encontrada.</p>
          <p>Adicione tarefas na página inicial para ver o gráfico.</p>
          <Link to="/" className="btn success" style={{ display: "inline-block", marginTop: "1rem" }}>
            ← Ir para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard de Prioridades</h2>

      {/* Cards de estatísticas */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-label">Total de Tarefas</p>
          <p className="stat-number">{total}</p>
        </div>
        <div className="stat-card stat-card--importante">
          <p className="stat-label">🔴 Importantes</p>
          <p className="stat-number">{importantes}</p>
          <p className="stat-pct">
            {total > 0 ? ((importantes / total) * 100).toFixed(0) : 0}%
          </p>
        </div>
        <div className="stat-card stat-card--normal">
          <p className="stat-label">🔵 Normais</p>
          <p className="stat-number">{normais}</p>
          <p className="stat-pct">
            {total > 0 ? ((normais / total) * 100).toFixed(0) : 0}%
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="dashboard-charts">
        {/* Gráfico de Pizza */}
        <div className="chart-card">
          <h3 className="chart-title">Distribuição por Prioridade</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label={renderLabel}
                labelLine={true}
                animationBegin={0}
                animationDuration={700}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} tarefas`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras */}
        <div className="chart-card">
          <h3 className="chart-title">Comparativo por Prioridade</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fill: "var(--text-primary)", fontSize: 13 }} />
              <YAxis allowDecimals={false} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  color: "var(--text-primary)",
                }}
                formatter={(value) => [`${value} tarefas`, "Quantidade"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={700}>
                {chartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Botão voltar */}
      <div className="dashboard-back">
        <Link to="/" className="btn success">
          ← Voltar para Home
        </Link>
        <button onClick={fetchTasks} className="btn" style={{ marginLeft: "0.75rem" }}>
          🔄 Atualizar
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
