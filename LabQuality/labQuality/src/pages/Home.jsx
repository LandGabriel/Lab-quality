import React, { useEffect, useState } from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import undrawImage from "./assets/undraw.svg";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./Home.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [missingValuesCount, setMissingValuesCount] = useState(0);
  const [outOfRangeCount, setOutOfRangeCount] = useState(0);
  const [examData, setExamData] = useState({ approved: 0, rejected: 0 });
  const [lastResultDate, setLastResultDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    const today = new Date().toISOString().split("T")[0];
    let missingValues = 0;
    let outOfRange = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    let latestDate = "";

    storedExams.forEach((exam) => {
      const todayValue = exam.dailyValues?.find(
        (value) => value.date === today
      );
      if (!todayValue) {
        missingValues++;
      } else if (todayValue.value < exam.min || todayValue.value > exam.max) {
        outOfRange++;
        rejectedCount++;
      } else {
        approvedCount++;
      }

      if (exam.dailyValues && exam.dailyValues.length > 0) {
        const maxDate = exam.dailyValues.reduce(
          (latest, value) =>
            new Date(value.date) > new Date(latest) ? value.date : latest,
          "00/00/0000"
        );

        if (new Date(maxDate) > new Date(latestDate)) {
          latestDate = maxDate;
        }
      }
    });

    setMissingValuesCount(missingValues);
    setOutOfRangeCount(outOfRange);
    setExamData({ approved: approvedCount, rejected: rejectedCount });
    setLastResultDate(latestDate);
  }, []);

  const handleAddValuesClick = () => {
    navigate("/add-daily-values");
  };

  const chartData = {
    labels: ["Aprovados", "Rejeitados"],
    datasets: [
      {
        label: "Percentual de Aprovados e Rejeitados",
        data: [examData.approved, examData.rejected],
        backgroundColor: ["#0bb705", "#f91010"],
        borderColor: ["#3F3C37", "#FF5E1E"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Aprovados e Rejeitados",
      },
    },
  };

  return (
    <div className="home-container">
      <h1>Resumo dos Exames</h1>
      <div className="central-controle">
        <h3>Central de Controle</h3>
        <div className="status-box">
          <h4>Aprovados ({examData.approved})</h4>
          <h4>Sem resultados ({missingValuesCount})</h4>
        </div>
      </div>
      <div className="pending-actions">
        <h3>Ação Pendentes:</h3>
        <div className="action-box">
          <h4>Rejeições ({outOfRangeCount})</h4>
          <h4>Alertas (0)</h4>
        </div>
      </div>
      <div className="configurable-exams">
        <h3>Exames Disponíveis para Configuração</h3>
        {}
      </div>
      <div className="last-result-date">
        <h3>Data da Última Entrada de Resultado</h3>
        <p>{lastResultDate}</p>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      {outOfRangeCount > 0 && (
        <button className="add-values-button" onClick={handleAddValuesClick}>
          <FaPlusCircle size={20} /> Adicionar Valores
        </button>
      )}
    </div>
  );
  <div className="sidebar-svg">
    <img src={undrawImage} alt="SVG Illustration" />
  </div>;
};

export default Home;
