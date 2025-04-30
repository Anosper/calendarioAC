import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import "bootstrap-icons/font/bootstrap-icons.css";
import nature from "./images/nature.gif";
import nature2 from "./images/nature2.gif";
import totoro from "./images/totoro.gif";

const firebaseConfig = {
  apiKey: "AIzaSyBUISh-lujiR_h_coH2jOhGaKfZpCehuj4",
  authDomain: "calendarioac-5a8c9.firebaseapp.com",
  projectId: "calendarioac-5a8c9",
  storageBucket: "calendarioac-5a8c9.firebasestorage.app",
  messagingSenderId: "601837492675",
  appId: "1:601837492675:web:9902056761d64a7fa40576",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const css = `
/* Estilos principais */
body, html {
  margin: 0;
  padding: 0;
}
.app {
  min-height: 100vh;
  width: 1900px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
body {
    font-family: Arial, sans-serif;
    background: url('nature.gif') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    position: relative;
    overflow: hidden;
}
body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -1;
}
/* Container para título e botões */
.page-title-container {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 40px;
    z-index: 100;
}
/* Título centralizado */
.page-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 100;
    font-style: italic;
    color: #e0e0e073;
    text-align: center;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}
/* Botões laterais */
.arrow-button {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, 0.397);
    border: none;
    border-radius: 8px;
    padding: 15px 25px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, background-color 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
}
.arrow-button::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: linear-gradient(to top, rgba(255,255,255,0.3), transparent);
    transition: height 0.3s;
}
.arrow-button:hover::after {
    height: 100%;
}
.arrow-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}
/* Barra lateral (sidebar) com fundo transparente */
.sidebar {
    position: fixed;
    width: 280px;
    height: 100%;
    background-color: rgba(24, 24, 24, 0.7);
    color: #ffffff;
    padding: 20px;
    left: -300px;
    transition: left 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    z-index: 1000;
}
.sidebar.open {
    left: 0;
}
.sidebar h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
}
.sidebar ul {
    list-style: none;
    padding: 0;
}
.sidebar li {
    margin: 10px 0;
}
.sidebar a {
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 10px;
    transition: background-color 0.3s;
}
.sidebar a:hover {
    background-color: rgba(41, 41, 41, 0.8);
    border-radius: 5px;
}
.sidebar a i {
    margin-right: 10px;
}
.content {
    flex: 1;
    padding: 20px;
    padding-bottom: 60px;
    transition: margin-left 0.3s ease;
}
.menu-button {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    z-index: 1100;
    transition: left 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    font-size: 1.1rem;
}
button:hover {
    transform: scale(1.05);
}
button:active {
    transform: scale(0.95);
}
.menu-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
}
#main-content {
    transition: margin-left 0.5s;
    padding: 20px;
    width: 100%;
    overflow: auto;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
}
.calendar-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    table-layout: fixed;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index: 1;
    padding: 10px;
}
h2 {
    font-size: 1.5rem;
}
button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #2980b9;
}
th, td {
    width: 14%;
    padding-top: 10px;
    text-align: center;
    border: 1px solid #ddd;
    box-sizing: border-box;
}
td {
    cursor: pointer;
}
/* Estilo para células com home office */
td.home-office {
    background-color: #f39c12;
    color: white;
    position: relative;
}
/* Tooltip */
.tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    display: none;
    z-index: 100;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
td.home-office:hover .tooltip {
    display: block;
    opacity: 1;
}
/* Estilo para finais de semana */
td.weekend {
    background-color: #95a5a6;
    color: white;
}
/* Estilo para feriados nacionais */
td.holiday {
    background-color: #3498db;
    color: white;
}
/* Estilo para feriados estaduais */
td.state-holiday {
    background-color: #e67e22;
    color: white;
}
/* Legenda */
.legend {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    max-width: 200px;
    position: absolute;
    bottom: 10px;
    right: 200px;
}
.legend h3 {
    margin: 0;
    font-size: 1.1rem;
}
.legend ul {
    list-style-type: none;
    padding: 0;
}
.legend li {
    margin-bottom: 10px;
}
.legend span {
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 50%;
}
.weekend-color {
    background-color: #95a5a6;
}
.national-holiday-color {
    background-color: #3498db;
}
.state-holiday-color {
    background-color: #e22c1f;
}
/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 10;
}
.modal-content {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    width: 305px;
    text-align: center;
    position: relative;
    border: 3px solid #3498db;
}
#employee-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
}
#employee-buttons button {
    padding: 0px;
    background-color: #3498db;
    border: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    width: 100px;
}
#employee-buttons button:hover {
    background-color: #2980b9;
}
/* Botões da modal */
.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}
#remove-btn, #close-btn, #remove-note-btn, #close-reminder-modal {
    padding: 6px 10px;
    font-size: 0.85rem;
    width: 100px;
    border-radius: 10px;
}
#remove-btn, #remove-note-btn {
    background-color: #e74c3c;
}
#close-btn, #close-reminder-modal, #close-notes-modal {
    background-color: #95a5a6;
}
/* Estilo para o dia atual */
.current-day {
    position: relative;
}
.current-day::after {
    content: '';
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #3498db;
    background-color: #3498db;
}
td span {
    position: relative;
    z-index: 2;
}
.note-tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    display: none;
    z-index: 10;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
}
.calendar-day:hover .note-tooltip {
    display: block;
}
.has-note {
    background-color: #ffcc00;
}
.calendar-day {
    position: relative;
}
.selected-day {
    background-color: rgb(255, 0, 0) !important;
    color: white;
}
#notes-modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px; /* ou outro valor que se adeque ao design */
    
    flex-direction: column;
    align-items: center;
    background-color: transparent;
}
#notes-modal label {
    display: block;
    font-weight: bold;
    margin-top: 10px;
}
#notes-modal input,
#notes-modal textarea {
    width: 90%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}
#note-motivo {
    margin-bottom: 10px;
}
#notes-modal textarea {
    height: 80px;
    resize: none;
}
#notes-modal .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
#save-note-btn, #close-notes-modal {
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
#save-note-btn {
    background: #2ecc71;
    color: white;
}
`;

const App = () => {
  // Estados principais
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTitle, setCurrentTitle] = useState("DISTRIBUIÇÃO");
  const [notes, setNotes] = useState({});
  const [homeOfficeDistribuicao, setHomeOfficeDistribuicao] = useState({});
  const [homeOfficeAdvogados, setHomeOfficeAdvogados] = useState({});
  const [showActionModal, setShowActionModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminderData, setReminderData] = useState({});
  const [noteForm, setNoteForm] = useState({
    date: "",
    motivo: "",
    text: "",
  });
  const [backgroundImage, setBackgroundImage] = useState(totoro);

  // Constantes fixas
  const employeesDistribuicao = ["Camila", "Gabriel", "Flávia", "Mário"];
  const employeesAdvogados = ["Catarine", "Daniel", "Karine", "Rafael", "Thayanne"];
  const holidays = [
    "2025-01-01",
    "2025-01-20",
    "2025-03-03",
    "2025-03-04",
    "2025-04-18",
    "2025-04-21",
    "2025-04-23",
    "2025-05-01",
    "2025-06-19",
    "2025-09-07",
    "2025-10-12",
    "2025-11-02",
    "2025-11-15",
    "2025-12-31",
    "2025-12-25",
  ];

  // Carrega os dados do Firestore ao montar o componente e cria documentos caso não existam
  useEffect(() => {
    async function loadData() {
      try {
        // Carrega as anotações
        const notesRef = doc(db, "calendarData", "notes");
        const notesSnap = await getDoc(notesRef);
        if (notesSnap.exists()) {
          setNotes(notesSnap.data());
        } else {
          await setDoc(notesRef, {});
          setNotes({});
        }

        // Carrega os dados para DISTRIBUIÇÃO
        const distRef = doc(db, "calendarData", "homeOfficeDistribuicao");
        const distSnap = await getDoc(distRef);
        if (distSnap.exists()) {
          setHomeOfficeDistribuicao(distSnap.data());
        } else {
          await setDoc(distRef, {});
          setHomeOfficeDistribuicao({});
        }

        // Carrega os dados para ADVOGADOS
        const advRef = doc(db, "calendarData", "homeOfficeAdvogados");
        const advSnap = await getDoc(advRef);
        if (advSnap.exists()) {
          setHomeOfficeAdvogados(advSnap.data());
        } else {
          await setDoc(advRef, {});
          setHomeOfficeAdvogados({});
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    loadData();
  }, []);

  // Alterna o fundo a cada 15 segundos
  useEffect(() => {
    const backgrounds = [nature, nature2, totoro];
    let current = 2;
    const interval = setInterval(() => {
      current = (current + 1) % backgrounds.length;
      setBackgroundImage(backgrounds[current]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Gera a matriz do calendário para o mês corrente
  const generateCalendar = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    let date = new Date(firstDay);
    date.setDate(date.getDate() - date.getDay());
    const weeks = [];
    while (date <= lastDay || date.getDay() !== 0) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  };

  // Formata a data para o padrão ISO (YYYY-MM-DD)
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Verifica se o funcionário já foi designado na semana (para DISTRIBUIÇÃO)
  const isEmployeeAlreadyAssigned = (employee, dateStr) => {
    const dateObj = new Date(dateStr);
    const week = getWeekNumber(dateObj);
    const currentData =
      currentTitle === "DISTRIBUIÇÃO"
        ? homeOfficeDistribuicao
        : homeOfficeAdvogados;
    for (let dateKey in currentData) {
      const assignedDate = new Date(dateKey);
      if (
        getWeekNumber(assignedDate) === week &&
        currentData[dateKey].includes(employee)
      ) {
        return true;
      }
    }
    return false;
  };

  // Calcula o número da semana do ano para uma data
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor((date - firstDayOfYear) / 86400000);
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  };

  // Ao clicar em uma célula do calendário
  const onCellClick = (cellDate, isWeekend, isHoliday, isDisabled) => {
    const dateStr = formatDate(cellDate);
    if (isWeekend) {
      alert("Não é possível atribuir em finais de semana!!");
      return;
    }
    if (isHoliday) {
      alert("Não é possível atribuir em feriados!!");
      return;
    }
    if (isDisabled) return;
    setSelectedDate(dateStr);
    // Para ADVOGADOS, sempre mostra o modal de ação com a lista filtrada,
    // permitindo a seleção adicional mesmo que já existam advogados designados.
    if (currentTitle === "ADVOGADOS") {
      setShowActionModal(true);
    } else {
      // Para DISTRIBUIÇÃO, se houver nota, mostra o modal de lembrete; caso contrário, mostra a seleção.
      if (notes[dateStr]) {
        setReminderData(notes[dateStr]);
        setShowReminderModal(true);
      } else {
        setShowActionModal(true);
      }
    }
  };

  // Seleciona funcionário na modal de ação e atualiza o Firestore
  const selectEmployee = async (employee) => {
    const currentData =
      currentTitle === "DISTRIBUIÇÃO"
        ? { ...homeOfficeDistribuicao }
        : { ...homeOfficeAdvogados };

    if (
      currentTitle === "DISTRIBUIÇÃO" &&
      isEmployeeAlreadyAssigned(employee, selectedDate)
    ) {
      alert(`${employee} já está de home office esta semana.`);
      return;
    }
    if (!currentData[selectedDate]) {
      currentData[selectedDate] = [];
    }
    if (currentData[selectedDate].includes(employee)) {
      alert(`${employee} já foi adicionado(a) neste dia.`);
      return;
    }
    currentData[selectedDate].push(employee);
    try {
      if (currentTitle === "DISTRIBUIÇÃO") {
        setHomeOfficeDistribuicao(currentData);
        await setDoc(
          doc(db, "calendarData", "homeOfficeDistribuicao"),
          currentData
        );
        // Para DISTRIBUIÇÃO, fecha o modal após a seleção.
        setShowActionModal(false);
      } else {
        // Para ADVOGADOS, atualiza mas mantém o modal aberto para permitir novas seleções.
        setHomeOfficeAdvogados(currentData);
        await setDoc(
          doc(db, "calendarData", "homeOfficeAdvogados"),
          currentData
        );
      }
    } catch (error) {
      console.error("Erro ao salvar designação:", error);
    }
  };

  // Remove a designação de funcionário do dia selecionado e atualiza o Firestore
  const removeSelection = async () => {
    const currentData =
      currentTitle === "DISTRIBUIÇÃO"
        ? { ...homeOfficeDistribuicao }
        : { ...homeOfficeAdvogados };
    delete currentData[selectedDate];
    try {
      if (currentTitle === "DISTRIBUIÇÃO") {
        setHomeOfficeDistribuicao(currentData);
        await setDoc(
          doc(db, "calendarData", "homeOfficeDistribuicao"),
          currentData
        );
      } else {
        setHomeOfficeAdvogados(currentData);
        await setDoc(
          doc(db, "calendarData", "homeOfficeAdvogados"),
          currentData
        );
      }
    } catch (error) {
      console.error("Erro ao remover designação:", error);
    }
    setShowActionModal(false);
  };

  const removeEmployee = async (employee) => {
    const currentData = { ...homeOfficeAdvogados };
    if (currentData[selectedDate]) {
      currentData[selectedDate] = currentData[selectedDate].filter(
        (e) => e !== employee
      );
    }
    try {
      setHomeOfficeAdvogados(currentData);
      await setDoc(doc(db, "calendarData", "homeOfficeAdvogados"), currentData);
    } catch (error) {
      console.error("Erro ao remover advogado:", error);
    }
  };

  // Troca de mês
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Troca de título e calendário
  const toggleCalendarAndTitle = () => {
    setCurrentTitle((prev) =>
      prev === "DISTRIBUIÇÃO" ? "ADVOGADOS" : "DISTRIBUIÇÃO"
    );
  };

  // Salva uma anotação e atualiza o Firestore
  const saveNote = async () => {
    const { date, motivo, text } = noteForm;
    if (date && motivo && text) {
      const newNotes = {
        ...notes,
        [date]: { motivo, text },
      };
      try {
        setNotes(newNotes);
        await setDoc(doc(db, "calendarData", "notes"), newNotes);
      } catch (error) {
        console.error("Erro ao salvar anotação:", error);
      }
      setShowNotesModal(false);
      setNoteForm({ date: "", motivo: "", text: "" });
      alert("Anotação salva!");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Remove anotação e atualiza o Firestore
  const removeNote = async () => {
    const newNotes = { ...notes };
    delete newNotes[selectedDate];
    try {
      setNotes(newNotes);
      await setDoc(doc(db, "calendarData", "notes"), newNotes);
    } catch (error) {
      console.error("Erro ao remover anotação:", error);
    }
    setShowReminderModal(false);
  };

  const calendarWeeks = generateCalendar();

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Injetando o CSS */}
      <style>{css}</style>

      {/* Header e botões de troca de título */}
      <div className="page-title-container">
        <button className="arrow-button" onClick={toggleCalendarAndTitle}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="page-title">{currentTitle}</div>
        <button className="arrow-button" onClick={toggleCalendarAndTitle}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div id="menu" className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="#">
              <i className="bi bi-house"></i> Início
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setShowNotesModal(true)}
              id="notesButton"
            >
              <i className="bi bi-book"></i> Avisos
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-gear"></i> Configurações
            </a>
          </li>
        </ul>
      </div>

      {/* Botão do menu */}
      <button
        id="menuButton"
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ left: isMenuOpen ? "300px" : "20px" }}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Conteúdo principal */}
      <div id="main-content">
        <div className="calendar-container">
          <header>
            <button id="prev-month" onClick={() => changeMonth(-1)}>
              Anterior
            </button>
            <h2 id="month-year">
              {currentDate.toLocaleString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button id="next-month" onClick={() => changeMonth(1)}>
              Próximo
            </button>
          </header>
          <table id="calendar">
            <thead>
              <tr>
                <th>Dom</th>
                <th>Seg</th>
                <th>Ter</th>
                <th>Qua</th>
                <th>Qui</th>
                <th>Sex</th>
                <th>Sáb</th>
              </tr>
            </thead>
            <tbody>
              {calendarWeeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => {
                    const dateStr = formatDate(day);
                    const isCurrentMonth =
                      day.getMonth() === currentDate.getMonth();
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const isHoliday = holidays.includes(dateStr);
                    const isDisabled = !isCurrentMonth;
                    const currentData =
                      currentTitle === "DISTRIBUIÇÃO"
                        ? homeOfficeDistribuicao
                        : homeOfficeAdvogados;
                    const assignments = currentData[dateStr] || [];
                    const hasNote = notes[dateStr];
                    const isToday =
                      day.toDateString() === new Date().toDateString();
                    return (
                      <td
                        key={di}
                        data-date={dateStr}
                        className={`calendar-day
                          ${isWeekend ? "weekend" : ""}
                          ${isHoliday ? "holiday" : ""}
                          ${!isCurrentMonth ? "inactive" : ""}
                          ${isWeekend || isHoliday ? "disabled" : ""}
                          ${assignments.length ? "home-office" : ""}
                          ${hasNote ? "selected-day" : ""}
                          ${isToday ? "current-day" : ""}`}
                        onClick={() =>
                          onCellClick(day, isWeekend, isHoliday, isDisabled)
                        }
                      >
                        <span>{isCurrentMonth ? day.getDate() : ""}</span>
                        {assignments.length > 0 && (
                          <div className="tooltip">
                            {assignments.join(", ")}
                          </div>
                        )}
                        {hasNote && (
                          <div className="note-tooltip">
                            {notes[dateStr].motivo}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legenda */}
        <div className="legend">
          <h3>Legenda</h3>
          <hr></hr>
          <ul>
            <li>
              <span className="weekend-color"></span> Fins de semana (Cinza)
            </li>
            <li>
              <span className="national-holiday-color"></span> Feriados (Azul)
            </li>
            <li>
              <span className="state-holiday-color"></span> Atenção (Vermelho)
            </li>
          </ul>
        </div>
      </div>
      {/* Modal de Ação */}
      {showActionModal && (
        <div id="action-modal" className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3 id="modal-title">
              {(() => {
                const currentData =
                  currentTitle === "DISTRIBUIÇÃO"
                    ? homeOfficeDistribuicao
                    : homeOfficeAdvogados;
                // Para DISTRIBUIÇÃO, se já houver designação, mostra mensagem de alerta.
                // Para ADVOGADOS, sempre exibe a modal para seleção.
                if (
                  currentTitle === "DISTRIBUIÇÃO" &&
                  currentData[selectedDate]
                ) {
                  return "Atenção!";
                }
                return currentTitle === "ADVOGADOS"
                  ? "Selecione/Remova Advogado(s)"
                  : "Escolha um Funcionário(a)";
              })()}
            </h3>
            <p id="modal-message">
              {(() => {
                const currentData =
                  currentTitle === "DISTRIBUIÇÃO"
                    ? homeOfficeDistribuicao
                    : homeOfficeAdvogados;
                if (
                  currentTitle === "DISTRIBUIÇÃO" &&
                  currentData[selectedDate]
                ) {
                  const tipo =
                    currentTitle === "ADVOGADOS"
                      ? "presencial"
                      : "de home office";
                  const employeesList = currentData[selectedDate];
                  let formattedEmployees;
                  if (employeesList.length === 1) {
                    formattedEmployees = employeesList[0];
                  } else if (employeesList.length === 2) {
                    formattedEmployees = employeesList.join(" e ");
                  } else {
                    formattedEmployees =
                      employeesList.slice(0, -1).join(", ") +
                      " e " +
                      employeesList[employeesList.length - 1];
                  }
                  return `${formattedEmployees} ${
                    employeesList.length > 1 ? "já estão" : "já está"
                  } ${tipo} para este dia.`;
                }
                return `Selecione alguém para o dia ${selectedDate}`;
              })()}
            </p>
            <div
              id="employee-buttons"
              style={{ display: "flex", flexDirection: "row", gap: "5px", width: "280px"}}
            >
              {currentTitle === "DISTRIBUIÇÃO" ? (
                // Para DISTRIBUIÇÃO, se ainda não houver designação, exibe a lista completa
                !homeOfficeDistribuicao[selectedDate] &&
                employeesDistribuicao.map((employee) => (
                  <button
                    key={employee}
                    onClick={() => selectEmployee(employee)}
                  >
                    {employee}
                  </button>
                ))
              ) : (
                // Para ADVOGADOS, exibe duas seções:
                <>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                    <h4>Disponíveis:</h4>
                    {(() => {
                      const selectedEmployees =
                        homeOfficeAdvogados[selectedDate] || [];
                      const availableEmployees = employeesAdvogados.filter(
                        (employee) => !selectedEmployees.includes(employee)
                      );
                      return availableEmployees.map((employee) => (
                        <button
                          key={employee}
                          onClick={() => selectEmployee(employee)}
                        >
                          {employee}
                        </button>
                      ));
                    })()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                    <h4>Selecionados:</h4>
                    {(() => {
                      const selectedEmployees =
                        homeOfficeAdvogados[selectedDate] || [];
                      return selectedEmployees.map((employee) => (
                        <button
                          key={employee}
                          onClick={() => removeEmployee(employee)}
                        >
                          {employee} 
                        </button>
                      ));
                    })()}
                  </div>
                </>
              )}
            </div>
            <div className="modal-buttons">
              {currentTitle === "DISTRIBUIÇÃO" &&
              homeOfficeDistribuicao[selectedDate] ? (
                <button id="remove-btn" onClick={removeSelection}>
                  Remover
                </button>
              ) : null}
              <button id="close-btn" onClick={() => setShowActionModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Anotações */}
      {showNotesModal && (
        <div id="notes-modal" className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3>Adicionar aviso</h3>
            <label htmlFor="note-date">Escolha uma data:</label>
            <input
              type="date"
              id="note-date"
              value={noteForm.date}
              onChange={(e) =>
                setNoteForm({ ...noteForm, date: e.target.value })
              }
            />
            <label htmlFor="note-motivo">Motivo:</label>
            <input
              type="text"
              id="note-motivo"
              placeholder="Motivo do aviso"
              value={noteForm.motivo}
              onChange={(e) =>
                setNoteForm({ ...noteForm, motivo: e.target.value })
              }
            />
            <label htmlFor="note-text">Assunto:</label>
            <textarea
              id="note-text"
              placeholder="Assunto"
              value={noteForm.text}
              onChange={(e) =>
                setNoteForm({ ...noteForm, text: e.target.value })
              }
            ></textarea>
            <div className="modal-buttons">
              <button id="save-note-btn" onClick={saveNote}>
                Salvar
              </button>
              <button
                id="close-notes-modal"
                onClick={() => setShowNotesModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Lembrete */}
      {showReminderModal && (
        <div id="reminder-modal" className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3>Atenção!</h3>
            <p id="reminder-motivo">{reminderData.motivo}</p>
            <p id="reminder-assunto">{reminderData.text}</p>
            <div className="modal-buttons">
              <button id="remove-note-btn" onClick={removeNote}>
                Remover
              </button>
              <button
                id="close-reminder-modal"
                onClick={() => setShowReminderModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
