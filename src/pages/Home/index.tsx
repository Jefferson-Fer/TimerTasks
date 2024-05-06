import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  InterruptCountdownButton,
  StartCountdownButton,
} from './styles'

export interface CreateCycleData {
  task: string
  durationMinutes: number
}

export function Home() {
  const { activeCycle, CreateNewCycle, InterruptCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<CreateCycleData>()
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isButtonSubmitDisabled = !task

  function handleCreateNewCycle(data: any) {
    CreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <InterruptCountdownButton onClick={InterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton disabled={isButtonSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
