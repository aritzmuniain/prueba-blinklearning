export function Buttons(props: {disabledResults: boolean, onFetchQuestionnaire: any, onViewResults: any}) {
  
  
  return (
      <div>
        <button
          className='button'
          disabled={props.disabledResults}
          onClick={props.onViewResults}
        >
          Ver Resultados
        </button>
        <button
          className='button'
          disabled={!props.disabledResults}
          onClick={props.onFetchQuestionnaire}
        >
          Comenzar
        </button>
      </div>
  )
}