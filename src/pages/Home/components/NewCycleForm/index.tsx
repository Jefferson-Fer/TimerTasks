import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountCount, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto Ignite" />
        <option value="Estudar TS" />
        <option value="Trabalhar" />
      </datalist>

      <label htmlFor="durationMinutes">durante</label>
      <MinutesAmountCount
        type="number"
        id="durantionMinutes"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('durantionMinutes', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
