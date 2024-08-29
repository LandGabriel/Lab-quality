import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "./AddDailyValues.css";
import undrawMedical from "./assets/undraw_medical.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AddDailyValues = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [dailyValue, setDailyValue] = useState("");
  const [dailyDate, setDailyDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [average, setAverage] = useState(null);
  const [trend, setTrend] = useState("");

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setExams(storedExams);

    const today = new Date().toISOString().split("T")[0];
    setDailyDate(today);
  }, []);

  const handleAddValue = () => {
    if (selectedExam && dailyValue && dailyDate) {
      const updatedExams = exams.map((exam) => {
        if (exam.name === selectedExam) {
          if (!exam.dailyValues) {
            exam.dailyValues = [];
          }

          if (editingIndex !== null) {
            exam.dailyValues[editingIndex] = {
              value: parseFloat(dailyValue),
              date: dailyDate,
            };
            setEditingIndex(null);
          } else {
            exam.dailyValues.push({
              value: parseFloat(dailyValue),
              date: dailyDate,
            });
          }

          // Calcular a média dos valores diários
          const totalValues = exam.dailyValues.length;
          const sumValues = exam.dailyValues.reduce(
            (acc, curr) => acc + curr.value,
            0
          );
          const avg = sumValues / totalValues;
          setAverage(avg.toFixed(2));

          // Determinar a tendência
          const lastValue = exam.dailyValues[totalValues - 1]?.value;
          const trendDirection = lastValue > avg ? "alta" : "baixa";
          setTrend(trendDirection);
        }
        return exam;
      });

      localStorage.setItem("exams", JSON.stringify(updatedExams));
      setExams(updatedExams);
      setDailyValue("");
      setDailyDate(new Date().toISOString().split("T")[0]);
    } else {
      alert("Por favor, selecione um exame, insira o valor diário e a data.");
    }
  };

  const handleEdit = (index) => {
    const exam = exams.find((exam) => exam.name === selectedExam);
    setDailyValue(exam.dailyValues[index].value);
    setDailyDate(exam.dailyValues[index].date);
    setEditingIndex(index);
  };

  const handleRemove = (index) => {
    const updatedExams = exams.map((exam) => {
      if (exam.name === selectedExam) {
        exam.dailyValues.splice(index, 1);
      }
      return exam;
    });
    localStorage.setItem("exams", JSON.stringify(updatedExams));
    setExams(updatedExams);
    setEditingIndex(null);
    alert("Valor diário removido com sucesso!");
  };

  const handleCancelEdit = () => {
    setDailyValue("");
    setDailyDate(new Date().toISOString().split("T")[0]);
    setEditingIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddValue();
    }
  };

  const selectedExamData = exams.find((exam) => exam.name === selectedExam);
  const chartData =
    selectedExamData?.dailyValues?.map((dv) => ({ x: dv.date, y: dv.value })) ||
    [];

  const data = {
    labels: chartData.map((item) => item.x),
    datasets: [
      {
        label: "Valores Diários",
        data: chartData.map((item) => item.y),
        fill: false,
        borderColor: "#FF5E1E",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor",
        },
      },
    },
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Adicionar Valores Diários</h1>
        <div>
          <label>Selecione o Exame:</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            onKeyPress={handleKeyPress}
          >
            <option value="">Selecione...</option>
            {exams.map((exam, index) => (
              <option key={index} value={exam.name}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={dailyDate}
            onChange={(e) => setDailyDate(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <label>Valor Diário:</label>
          <input
            type="number"
            value={dailyValue}
            onChange={(e) => setDailyValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button onClick={handleAddValue}>
          {editingIndex !== null
            ? "Salvar Alterações"
            : "Adicionar Valor Diário"}
        </button>
        {editingIndex !== null && (
          <button onClick={handleCancelEdit}>Cancelar</button>
        )}

        {average !== null && trend && (
          <div className="alert">
            <p>
              SUA MÉDIA ESTÁ EM {average}. Tendendo para {trend}.
            </p>
          </div>
        )}

        {selectedExam && chartData.length > 0 && (
          <>
            <Line data={data} options={options} />
            <ul>
              {selectedExamData?.dailyValues?.map((value, index) => (
                <li key={index}>
                  {value.date}: {value.value}
                  <button onClick={() => handleEdit(index)}>
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => handleRemove(index)}>
                    <FaTrash /> Remover
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="sidebar-svg">
        <img src={undrawMedical} alt="SVG Illustration" />
      </div>
    </div>
  );
};

export default AddDailyValues;
