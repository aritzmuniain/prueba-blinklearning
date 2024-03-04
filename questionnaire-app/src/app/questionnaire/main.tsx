import type { AppDispatch, RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { questionnaireActions } from '../store/slice'
import { Buttons } from './buttons'
import { Questionnaire } from './questionnaire'
import { Loader } from './loader'

export function Main() {

  const testMode = useSelector((state: RootState) => state.testMode)
  const questionnaire = useSelector((state: RootState) => state.questionnaire)
  const answers = useSelector((state: RootState) => state.answers)
  const loading = useSelector((state: RootState) => state.loading)

  const dispatch = useDispatch<AppDispatch>()

  const fetchQuestionnaire = () => {
    if (!questionnaire) {
      dispatch(questionnaireActions.setLoading());
      setTimeout(() => {
        dispatch(questionnaireActions.fetchQuestionnaire());
      }, 1000)
    } else {
      dispatch(questionnaireActions.setTestMode());
    }

  }

  const viewResults = () => {
    dispatch(questionnaireActions.setTestMode());
  }

  const saveAnswers = (answers: Answer[]) => {
    dispatch(questionnaireActions.saveAnswers(answers));
  }
  
  const cleanAnswers = (answers: Answer[]) => {
    dispatch(questionnaireActions.cleanAnswers());
  }

  return (
    <div className='container'>
      <div className='container-main'>
      { !testMode ?  
        <div className='label'>
          { !answers ? "Pulse comenzar para iniciar test" : "Compruebe sus respuestas" }
        </div> 
        : 
        undefined 
      }
      { loading ? <Loader/> : !testMode ? <div style={{flex : 1}}/> : undefined}
      { !testMode ?
        <Buttons 
          onFetchQuestionnaire={fetchQuestionnaire} 
          onViewResults={viewResults} 
          disabledResults={!answers} 
        /> 
       :  
        <Questionnaire 
          editable={!answers} 
          onSaveAnswers={saveAnswers} 
          onCleanAnswers={cleanAnswers} 
          questionnaire={questionnaire}
          answers={answers}
        />
      }
      </div>
    </div>
  )
}