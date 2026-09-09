- Sempre que você estiver implementando um task, você deve ir gradualmente marcando as etapas que forem concluidas.
- Sempre ao terminar a implementação da task, me avice que tudo está pronto e sinalize qual o proximo agente que deverá chamado. 

  **OBRIGATORIO** Sempre que uma implementação de código for concluída, executar
  obrigatoriamente os seguintes comandos na raiz do projeto, nesta ordem:
  
  1- 'docker compose down'
  2- 'docker compose build server'
  3- 'docker compose up -d'
  
  Motivo
  
  Garante que a imagem Docker do servidor é reconstruída com as últimas
  alterações e o ambiente sobe limpo e atualizado.
  
  Validação após o restart
  
  Após subir os containers, validar que a aplicação está respondendo:
  
  curl -s (' http://localhost:3001/api/versao)