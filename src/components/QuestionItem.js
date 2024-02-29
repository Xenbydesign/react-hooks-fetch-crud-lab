import React from "react";

function QuestionItem({ question, handleDeleteQuest,handleAnswerUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleUpdate(e) {
    const newAnswer = e.target.value
    handleAnswerUpdate (id, newAnswer)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate} >{options}</select>
      </label>
      <button onClick={() => handleDeleteQuest(id)} >Delete Question</button>
    </li>
  );
}
export default QuestionItem;
