import { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";

import "./index.scss";

function App() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    getQuestions();
  }, [category]);

  const getQuestions = async () => {
    try {
      let url;
      switch (category) {
        case "category1":
          url = "https://652cfdfaf9afa8ef4b269444.mockapi.io/questions";
          break;
        case "category2":
          url = "https://652cfdfaf9afa8ef4b269444.mockapi.io/questions2";
          break;
        // pridajte ďalšie prípady pre ďalšie kategórie
        default:
          url = "";
      }

      const response = await fetch(url);
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuizFinished(false);
  };

  const handleQuizFinish = () => {
    setQuizFinished(true);
  };

  const resetCategory = () => {
    setCategory("");
    setQuestions([]);
  };

  return (
    <div className="App">
      {!category && (
        <>
          <h3>Vyber si kategóriu otázok:</h3>
          <button
            onClick={() => handleCategoryChange("category1")}
            disabled={!quizFinished && category === "category2"}
          >
            Kategória 1
          </button>
          <button
            onClick={() => handleCategoryChange("category2")}
            disabled={!quizFinished && category === "category1"}
          >
            Kategória 2
          </button>
          {/* Add more buttons for more categories as needed */}
        </>
      )}
      {questions.length && (
        <Quiz
          questions={questions}
          onQuizFinish={handleQuizFinish}
          onResetCategory={resetCategory}
        />
      )}
    </div>
  );
}

export default App;
