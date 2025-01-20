import React, { useEffect, useState } from 'react'
import "./HelpPage.css"
import { useTranslation } from 'react-i18next';
import stringSimilarity from 'string-similarity';

function HelpPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [t] = useTranslation("global");

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState(() => {
    const storedChat = localStorage.getItem('chat');
    return storedChat ? JSON.parse(storedChat) : [];
  });

  const [showTyping, setShowTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const intents = [
    {
      tag: "greeting",
      patterns: [
        "Привет",
        "Здарова",
        "Доброе утро",
        "Добрый день",
        "Добрый вечер",
        "Шо ты",
        "Приветики",
        "Здравствуйте"
      ],
      responses: [
        "Привет! Как я могу помочь тебе сегодня?",
        "Приветики! Чем могу помочь?",
        "Привет! Что тебе подсказать?"
      ]
    },
    {
      tag: "goodbye",
      patterns: [
        "Пока",
        "бб",
        "До свидания",
        "До встречи",
        "Увидимся"
      ],
      responses: [
        "Пока! Возвращайся к задачам по скорее!",
        "До встречи! Не забывай о выполнении задач!",
        "Хорошего тебе дня! Не забывай о выполнении задач!"
      ]
    },
    {
      tag: "thanks",
      patterns: [
        "Спасибо",
        "Понял",
        "Большое спасибо"
      ],
      responses: [
        "Рад, что смог тебе помочь!",
        "Пожалуйста, всегда рад тебе помочь!",
        "Пожалуйста, обращайся в любое время!"
      ]
    },
    {
      tag: "settings",
      patterns: [
        "Как поменять язык",
        "Как поменять тему",
        "Как поменять стиль кнопок выполнено, не выполнено"
      ],
      responses: [
        "В настройках, доступных через иконку шестеренки внизу (пятая кнопка слева), ты можешь изменить язык, тему и стиль кнопок «Выполнено». Todo List предлагает: два языка: русский и английский; две темы: светлая и тёмная; четыре стиля кнопки «Выполнено», чтобы выбрать подходящий для тебя."
      ]
    },
    {
      tag: "todo",
      patterns: [
        "Как добавить новую задачу",
        "Как удалить задачу",
        "Как переименовать задачу",
        "Как отметить важную задачу",
        "Как отметить выполненую задачу"
      ],
      responses: [
        "Чтобы добавить новую задачу в список, нажми на плюс внизу экрана. После ввода задачи нажми кнопку «Добавить». Чтобы отметить задачу как выполненную, нажми на кнопку с иконкой слева — она изменится, указывая на завершение. Когда все задачи в списке будут выполнены, появится напоминание об отдыхе. Для переименования задачи нажми на иконку карандаша справа и введи новое название. Если нужно удалить задачу, нажми на иконку корзины справа и подтверди удаление, выбрав «Да». Чтобы отметить задачу как важную, нажми на флажок справа. Важные задачи будут выделены красным флажком."
      ]
    },
    {
      tag: "list",
      patterns: [
        "Как добавить новый список",
        "Как удалить список",
        "Как переименовать список",
        "Почему мой список перечеркнут",
        "Как переключиться между списками",
        "Как использовать список задач",
        "Как пользоваться списком задач",
        "лист задач"
      ],
      responses: [
        "Для добавления нового списка нажми на иконку меню (три вертикальные полоски) над текущим списком, введи название нового списка и нажми «Добавить». Чтобы переключаться между списками, просто нажми на их название. Для переименования списка используй иконку карандаша справа, а для его удаления — иконку корзины. Если название списка зачёркнуто, это означает, что все задачи в нём успешно выполнены."
      ]
    },
    {
      tag: "tracker",
      patterns: [
        "Как добавить новую привычку в трекер привычек",
        "Как добавить новую задачу в трекер привычек",
        "Как удалить привычку с трекера привычек",
        "Как переименовать привычку",
        "Как переключиться на другой месяц",
        "Как использовать трекер привычек",
        "Как пользоваться трекером привычек"
      ],
      responses: [
        "Чтобы добавить новую привычку в трекер, нажми на плюс внизу экрана и введи её название в появившемся поле. Для переименования привычки просто нажми на её название и введи новое. Чтобы удалить привычку, нажми на минус, расположенный справа от неё. Для переключения на другой месяц нажми на текущий месяц в таблице над списком привычек и выбери нужный из выпадающего списка."
      ]
    },
    {
      tag: "using",
      patterns: [
        "Как использовать трекер привычек",
        "Как использовать туду лист",
        "Как использовать еженедельный список задач",
        "Для чего использовать",
        "Зачем мне"
      ],
      responses: [
        "Ты можешь использовать список задач для планирования и выполнения повседневных дел, еженедельный список помогает управлять приоритетами и целями на неделю, а трекер привычек нужен для формирования и отслеживания полезных привычек."
      ]
    }
  ]

  const filterQuestions = (input) => {
    const filteredQuestions = [];
    if (input) {
      for (const intent of intents) {
        const filteredPatterns = intent.patterns.filter(pattern => 
          pattern.toLowerCase().startsWith(input.toLowerCase()) 
        );
        if (filteredPatterns.length > 0) {
          filteredQuestions.push(...filteredPatterns);
        }
      }
    }
    setSuggestedQuestions(filteredQuestions); 
  };

  const findAnswer = (userInput) => {
    const userQuery = userInput.toLowerCase();
    const similarityThreshold = 0.3;
    let bestMatch = { score: 0, response: "Извините, я не понял ваш вопрос." };
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        const similarity = stringSimilarity.compareTwoStrings(userQuery, pattern.toLowerCase());
        if (similarity > bestMatch.score && similarity >= similarityThreshold) {
          bestMatch = { score: similarity, response: intent.responses[Math.floor(Math.random() * intent.responses.length)] };
        }
      }
    }
    return bestMatch.response;
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    filterQuestions(event.target.value);
  };

  const handleAskQuestion = (inputText) => {
    if (inputText.trim()) {
      const answer = findAnswer(inputText);
      setChat((prevChat) => {
        const newChat = [...prevChat, { question: inputText, answer }];
        if (newChat.length > 2) {
          newChat.shift(); 
        }
        return newChat;
      });
      setInputText(""); 
      setShowTyping(true);

      setTimeout(() => {
        setShowTyping(false); 
      }, 2000);
    }
  };

  const handleSuggestionClick = (question) => { 
    handleAskQuestion(question); 
  };

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chat));
  }, [chat])

  return (
    <div className='help'>
      <div 
        className='input-help-container'
        style={{ 
          background: theme === "dark" ? '#edeef0' : 'white',
          boxShadow: theme === "dark"
            ? "0px 0px 10px 0px rgba(255, 255, 255, 0)"
            : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
        }}  
      >
        <input 
          placeholder={t("inputhelp.placeholderhelp")}
          style={{
            background: theme === "dark" ? 'transparent' : 'white',
            borderRadius: theme === "dark" ? '0px' : '100px'
          }}
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          onClick={() => handleAskQuestion(inputText)}
          style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}  
        >
          {t("inputhelp.buttonhelp")}
        </button>
      </div>

      <button
        className='info-button'
        onClick={() => setShowInfo(!showInfo)}
      >
        <i 
          className={showInfo ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-info'}
          style={{ color: theme === "dark" ? 'white' : '#3366ff' }} 
        ></i>
      </button>

      {showInfo && (
        <div className='help-title'>
          <h2>{t("help.text")}</h2>
        </div>
      )}

      {inputText && suggestedQuestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestedQuestions.map((question, index) => (
            <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(question)}>{question}</li>
          ))}
        </ul>
      )}

      <div className='messages'>
        {chat.map((chatItem, index) => (
          <div key={index}>
            <div className='message-container' id='question'>
              <p>{chatItem.question}</p>
            </div>
            <div className='message-container' id='answer'>
              {showTyping && index === chat.length - 1 ? (
                <p className="typing"></p> 
              ) : (
                <p>{chatItem.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HelpPage
