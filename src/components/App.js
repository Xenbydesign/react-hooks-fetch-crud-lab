import {useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
const URL = 'http://localhost:4000/questions'

function App() {
  const [page, setPage] = useState("List");
  const [quizQuestions, setQuestion] = useState([]);

  useEffect (() => {
    fetch (URL)
      .then((r) => r.json())
      .then(data => setQuestion(data));

  },[])

  function handleCreateQuestion(questionData){
    setQuestion(prevQuestions => [...prevQuestions, questionData]);
  }
  
  const handleDeleteQuest = (idQuestion) => { 
    const questToRemove = quizQuestions.find(quizQuestions => quizQuestions.id === idQuestion)
    setQuestion(currentQuest => currentQuest.filter(quizQuestions => quizQuestions.id !== idQuestion))
    fetch(`${URL}/${idQuestion}`, {method: "DELETE"}) 
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Question was not removed!')
      }
    })
    .catch(err => {
      alert(err)
      setQuestion(currentQuest => [...currentQuest, questToRemove])
    })
  }
  
  const handleAnswerUpdate = (id,questToUpdate) => {
    
    fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       correctIndex: Number (questToUpdate)
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Answer Not Updated')
        }
        return resp.json()
      })
      .then((updatedAnswer) => {
        setPage(quizQuestions.map((question) =>
            question.id === id ? updatedAnswer : question
          )
        )
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm 
      handleCreateQuestion={handleCreateQuestion} 
      /> 
      : 
      <QuestionList 
      quizQuestions={quizQuestions} 
      handleDeleteQuest={handleDeleteQuest}
      handleAnswerUpdate ={handleAnswerUpdate}
      />}
    </main>
  );
}

export default App;
