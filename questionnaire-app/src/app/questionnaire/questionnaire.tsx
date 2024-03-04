import type { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { questionnaireActions } from '../store/slice'
import { Question } from './question'


export function Questionnaire(props: { editable: boolean, onSaveAnswers: any, onCleanAnswers: any, questionnaire: Questionnaire | null, answers: Answer[] | null  }) {
    
  
  const [userAnswers, setUserAnswers] = useState<Answer[]>();

  const dispatch = useDispatch<AppDispatch>()

  const saveAnswers = () => {
    userAnswers &&  dispatch(questionnaireActions.saveAnswers(userAnswers));
  }

  const renderQuestions = () => {

      return props.questionnaire && 
        props.questionnaire.map(q => 
          <Question
            key={q.id as any}
            editable={props.editable} 
            question={q} 
            answer={extractAnswerForQuestion(q.id)} 
            onChangeAnswer={onChangeAnswer}
          /> 
        )

  }

  const onChangeAnswer = (questionId: Number | null, answer: boolean | null) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = prevAnswers &&  prevAnswers.filter(q => q && q.questionId !== questionId) || []
      newAnswers.push({questionId, answer})
      return newAnswers;
    });
  }

  const extractAnswerForQuestion = (questionId: Number) => {

    if (props.editable) {
      if (!userAnswers) return null
      return userAnswers.filter(a => a.questionId === questionId) [0]
    } else {
      if (!props.answers) return null
      return props.answers.filter(a => a.questionId === questionId) [0]
    }
  }

  return (
    <div className='questionnaire-container'>
      { props.editable ? 
        <div className='label'>Conteste a las preguntas</div>
        : 
        <div className='label'>Sus Respuestas</div>
      }
      <div className='questionnaire-body'>
        { renderQuestions() }
      </div>
      <div>
        { props.editable ?
          <button
            className='button'
            disabled={ !userAnswers || userAnswers.length != props.questionnaire?.length}
            onClick={() => props.onSaveAnswers(userAnswers)}
          >
            Finalizar
          </button> 
          : 
          <button
            className='button'
            disabled={false}
            onClick={props.onCleanAnswers}
          >
            Limpiar Respuestas
          </button>
        }
      </div>
    </div>
  )
}