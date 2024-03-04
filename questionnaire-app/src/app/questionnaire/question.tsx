
export function Question(props: { editable: boolean, question: Question, answer: Answer | null, onChangeAnswer: any }) {
    
  const styles = {
    correct: {
      textDecoration: "underline",
      textDecorationColor: "green",
      textUnderlineOffset: "5px"
    },
    incorrect: {
      textDecoration: "underline",
      textDecorationColor: "red",
      textUnderlineOffset: "5px"
    }
  }

  const getStyle = (expectedAnswer: boolean) => {
    if (props.editable) return {}
    if (props.answer && props.answer.answer === expectedAnswer) {
      //Significa que el input esta
      if (props.question.answer === expectedAnswer) return styles.correct
      return styles.incorrect
    }
  }

  return (
    <div className='question'>
          <p>{props.question.statement}</p>
          <div className='centered-text'>
              <input
                id={`${props.question.id}-true`}
                className="checkbox"
                type="radio"
                disabled={!props.editable}
                onChange={() => props.onChangeAnswer(props.question.id, true)}
                checked={props.answer && props.answer.answer === true || false}
              />
              <label
                htmlFor={`${props.question.id}-true`}
                style={getStyle(true)}
              >
                Verdadero
              </label>
              <input
                className="checkbox"
                type="radio"
                id={`${props.question.id}-false`}
                disabled={!props.editable}
                onChange={() => props.onChangeAnswer(props.question.id, false)}
                checked={props.answer && props.answer.answer === false || false}
              />
              <label
                htmlFor={`${props.question.id}-false`}
                style={getStyle(false)}
              >
                Falso
              </label>
            </div>
          
        </div>
  )
}