import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const sliceName = 'questionnaire'

const initialState: AppState = {
    testMode: false,
    questionnaire: null,
    loading: false,
    answers: null,
}

const questionnaireSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    saveAnswers: (state, action: PayloadAction<Answer[]>) => {
        state.answers =  action.payload
        state.testMode = false
    },
    cleanAnswers: (state) => {
        state.answers = null
        state.testMode = false
    },
    setLoading: (state) => {
      state.loading = true
    },
    setTestMode: (state) => {
      state.testMode = true
    }
  },
    extraReducers: builder => {
      builder.addCase(fetchQuestionnaire.fulfilled, (state, { payload })=> {
          state.questionnaire = payload as Questionnaire
          state.testMode = true
          state.loading = false
      })
    }
})


const fetchQuestionnaire = createAsyncThunk(
  `${sliceName}/fetchQuestionnaire`,
  async () => {
    const res = await fetch('/api/fetchQuestionnaire')
    return res.json()
  }
)



export const questionnaireActions = { ...questionnaireSlice.actions, fetchQuestionnaire }
export const questionnaireReducer = questionnaireSlice.reducer 