import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <div className="settings-container">
      <h1>Configurações</h1>

      <div className="settings-option">
        <h2>Assinatura Premium</h2>
        <p>
          Desbloqueie funcionalidades exclusivas ao se tornar um assinante
          premium.
        </p>
        <button className="premium-button">Assinar Premium</button>
      </div>

      <div className="settings-option">
        <h2>Contato via Email</h2>
        <p>
          Entre em contato conosco:{" "}
          <a href="mailto:suporte@exemplo.com">suporte@exemplo.com</a>
        </p>
      </div>

      <div className="settings-option">
        <h2>Feedback</h2>
        <p>
          A sua opinião é importante para nós.{" "}
          <a href="mailto:feedback@exemplo.com">Envie seu feedback</a>
        </p>
      </div>

      <div className="settings-option">
        <h2>Dúvidas e Contato</h2>
        <p>
          Visite nossa <a href="/faq">página de FAQ</a> ou entre em contato
          conosco para mais informações.
        </p>
      </div>

      <div className="settings-option">
        <h2>Modo Claro/Escuro</h2>
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider round"></span>
        </label>
        <p>{isDarkMode ? "Modo Escuro Ativado" : "Modo Claro Ativado"}</p>
      </div>
      <div className="settings-footer">
        <p>
          &copy; 2024 Sua Plataforma.{" "}
          <a href="https://github.com/LandGabriel" target="_blank">
            LandG
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Settings;
