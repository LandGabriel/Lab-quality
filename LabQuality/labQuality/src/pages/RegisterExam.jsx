import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./RegisterExam.css";
import undrawImage from "./assets/undraw.svg";

const RegisterExam = () => {
  const [examName, setExamName] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [exams, setExams] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setExams(storedExams);
  }, []);

  const handleRegister = () => {
    if (examName && minValue && maxValue) {
      const newExam = { name: examName, min: minValue, max: maxValue };
      let updatedExams;

      if (editingIndex !== null) {
        updatedExams = exams.map((exam, index) =>
          index === editingIndex ? newExam : exam
        );
        setEditingIndex(null);
      } else {
        updatedExams = [...exams, newExam];
      }

      setExams(updatedExams);
      localStorage.setItem("exams", JSON.stringify(updatedExams));

      setExamName("");
      setMinValue("");
      setMaxValue("");

      alert("Exame salvo com sucesso!");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleEdit = (index) => {
    const exam = exams[index];
    setExamName(exam.name);
    setMinValue(exam.min);
    setMaxValue(exam.max);
    setEditingIndex(index);
  };

  const handleRemove = (index) => {
    const updatedExams = exams.filter((_, i) => i !== index);
    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
    alert("Exame removido com sucesso!");
  };

  const handleCancelEdit = () => {
    setExamName("");
    setMinValue("");
    setMaxValue("");
    setEditingIndex(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRegister();
    }
  };

  return (
    <div className="app2">
      <div>
        <h1>Cadastrar Exame</h1>
        <div onKeyDown={handleKeyDown}>
          <label>Nome do Exame:</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div onKeyDown={handleKeyDown}>
          <label>Valor Mínimo:</label>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
        </div>
        <div onKeyDown={handleKeyDown}>
          <label>Valor Máximo:</label>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleRegister}>
            {editingIndex !== null ? "Salvar Alterações" : "Registrar Exame"}
          </button>
          {editingIndex !== null && (
            <button
              onClick={handleCancelEdit}
              style={{ marginLeft: "10px", backgroundColor: "#53579f" }}
            >
              Cancelar
            </button>
          )}
        </div>
        <ul>
          {exams.map((exam, index) => (
            <li key={index}>
              {exam.name} (Min: {exam.min}, Max: {exam.max})
              <button onClick={() => handleEdit(index)}>
                <FaEdit /> Editar
              </button>
              <button onClick={() => handleRemove(index)}>
                <FaTrash /> Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-svg">
        <img src={undrawImage} alt="SVG Illustration" />
      </div>
    </div>
  );
};

export default RegisterExam;
