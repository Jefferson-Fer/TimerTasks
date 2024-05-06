import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentCycleFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, NewCycle } from '../reducers/cycles/reducer'

interface CyclesContextProviderProps {
  children: ReactNode
}

export interface CreateCycleData {
  task: string
  durationMinutes: number
}

interface CyclesContextType {
  cycles: NewCycle[]
  activeCycle: NewCycle | undefined
  activeCycleId: string | null
  durantionSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  secondsDurationPassed: (seconds: number) => void
  CreateNewCycle: (data: CreateCycleData) => void
  InterruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [durantionSecondsPassed, setDurationSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function secondsDurationPassed(seconds: number) {
    setDurationSecondsPassed(seconds)
  }

  function CreateNewCycle(data: any) {
    const id = String(new Date().getTime())

    const addCycle: NewCycle = {
      id,
      task: data.task,
      durationMinutes: data.durantionMinutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(addCycle))
    setDurationSecondsPassed(0)
  }

  function InterruptCycle() {
    dispatch(interruptCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleFinishedAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        durantionSecondsPassed,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        secondsDurationPassed,
        CreateNewCycle,
        InterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
