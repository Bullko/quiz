import { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";

import "./index.scss";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://652cfdfaf9afa8ef4b269444.mockapi.io/questions"
      );
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return questions.length && <Quiz questions={questions} />;
}

export default App;
