import React, { useState, useEffect } from 'react';

const VersionInfo = () => {
  const [showVersion, setShowVersion] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [apiVersion, setApiVersion] = useState('4.0.0');

  const getApiUrl = () => {
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    if (window.location.port === '8080') {
      return window.location.origin;
    }
    return 'http://localhost:8080';
  };

  const checkApiHealth = async () => {
    setApiStatus('checking');
    try {
      const apiUrl = getApiUrl();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(`${apiUrl}/api/versao`, {
        signal: controller.signal,
        method: 'GET',
        cache: 'no-cache'
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const versionText = await response.text();
        setApiVersion(versionText);
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (error) {
      console.warn('API Health Check falhou:', error.message);
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    checkApiHealth();
    // Recheck a cada 30 segundos
    const interval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleVersionClick = () => {
    setShowVersion(!showVersion);
    if (!showVersion) {
      // Recheca quando abre o tooltip
      checkApiHealth();
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'checking': return '🟡';
      default: return '⚪';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'checking': return 'Verificando...';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="version-info">
      <button
        className={`version-trigger ${apiStatus}`}
        onClick={handleVersionClick}
        title={`API: ${getStatusText()}`}
      >
        {getStatusIcon()}
      </button>
      {showVersion && (
        <div className="version-tooltip">
          <div className="version-content">
            <strong>{apiVersion}</strong>
            <div className="version-details">
              <small>
                <span className="status-indicator">{getStatusIcon()}</span>
                Status: {getStatusText()}
              </small>
              <small>
                <button
                  className="version-link refresh-btn"
                  onClick={checkApiHealth}
                  title="Verificar status da API"
                  disabled={apiStatus === 'checking'}
                >
                  🔄 {apiStatus === 'checking' ? 'Verificando...' : 'Atualizar'}
                </button>
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionInfo;
