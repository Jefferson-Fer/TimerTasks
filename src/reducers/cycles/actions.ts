import { NewCycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(addCycle: NewCycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      addCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}

export function markCurrentCycleFinishedAction() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}
