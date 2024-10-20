import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './Todo.css';
import { FaMicrophone, FaPlus } from "react-icons/fa"; // For icons

const Todo = () => {
  const { t, i18n } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [isListening, setIsListening] = useState(false); // Track listening state
  const [recognition, setRecognition] = useState(null); // State for SpeechRecognition instance

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.onstart = () => {
      setIsListening(true);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    newRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    // Store the recognition instance in state
    setRecognition(newRecognition);

    // Cleanup to avoid memory leaks
    return () => {
      newRecognition.abort();
    };
  }, []);

  const startSpeechRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.includes("add")) {
      const task = command.replace("add", "").trim();
      if (task) {
        addTask(task);
      }
    } else if (command.includes("delete")) {
      const taskToDelete = command.replace("delete", "").trim();
      const index = tasks.findIndex(task => task.text.toLowerCase().includes(taskToDelete));
      if (index !== -1) {
        deleteTask(index);
      } else {
        console.log(`Task "${taskToDelete}" not found`);
      }
    } else if (command.includes("increase font size")) {
      increaseFontSize();
    } else if (command.includes("decrease font size")) {
      decreaseFontSize();
    }
  };

  const addTask = (taskText) => {
    if (taskText.trim()) {
      setTasks((prevTasks) => [...prevTasks, { text: taskText, completed: false }]);
      setInputValue(""); // Clear input after adding the task
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageOptions(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const increaseFontSize = () => {
    setFontSize(prevFontSize => Math.min(prevFontSize + 2, 32));
  };

  const decreaseFontSize = () => {
    setFontSize(prevFontSize => Math.max(prevFontSize - 2, 12));
  };

  // Use useEffect to toggle class on body
  useEffect(() => {
    document.body.className = darkMode ? '' : 'light-mode';
  }, [darkMode]);

  return (
    <div className={`todo-container ${darkMode ? '' : 'light-mode'}`} style={{ fontSize: `${fontSize}px` }}>
      {/* Language Button placed outside the main container */}
      <button className="language-button" onClick={toggleLanguageOptions}>
        {t('Change Language')}
      </button>

      {/* Voice Command Button positioned alongside the Language Button */}
      <button className="voice-command-button" onClick={startSpeechRecognition}>
        <FaMicrophone />
      </button>

      {showLanguageOptions && (
        <div className="language-options">
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('hn')}>Hindi</button>
          <button onClick={() => changeLanguage('tg')}>Telugu</button>
        </div>
      )}

      <div className="todo-content">
        {/* Main Heading */}
        <h1 className="todo-heading">{t('header')}</h1>

        {/* Font Size Control Buttons */}
        <div className="font-size-controls">
          <button onClick={increaseFontSize}>{t('Increase Font Size')}</button>
          <button onClick={decreaseFontSize}>{t('Decrease Font Size')}</button>
        </div>

        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Add Task Input */}
        <div className="add-task">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('Add a new task')}
            style={{ fontSize: `${fontSize}px` }}
          />
          <button onClick={() => addTask(inputValue)}>
            <FaPlus />
          </button>
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none", fontSize: `${fontSize}px` }}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(index)}>
                {t('Delete')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
