import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

// Registra o locale pt-BR para exibição em português
registerLocale("pt-BR", ptBR);

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  // Armazena um objeto Date para o DatePicker; usa data atual como padrão
  const [dia, setDia] = useState(new Date());
  const [importante, setImportante] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    // Converte o objeto Date para STRING no formato brasileiro (dd/MM/yyyy)
    // O backend espera e armazena a data como STRING
    const diaFormatado = (dia || new Date()).toLocaleDateString("pt-BR");

    onAdd({
      titulo: titulo.trim(),
      dia_atividade: diaFormatado,
      importante,
    });

    // Reset do formulário
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

      {/* Campo de data substituído por DatePicker com calendário visual */}
      <div className="form-control">
        <label>Data/Prazo</label>
        <DatePicker
          selected={dia}
          onChange={(date) => setDia(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Selecione a data"
          className="datepicker-input"
          calendarClassName="datepicker-calendar"
          // Abre o calendário ao clicar no ícone ou no input
          showPopperArrow={false}
          // Permite digitar a data manualmente também
          onChangeRaw={(e) => {
            // Previne crash se o usuário limpar o campo
            if (!e.target.value) setDia(new Date());
          }}
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
