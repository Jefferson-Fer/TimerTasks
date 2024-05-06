import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountContainer, SeparatorCount } from './styles'

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    durantionSecondsPassed,
    secondsDurationPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.durationMinutes * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferences = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifferences >= totalSeconds) {
          markCurrentCycleAsFinished()
          secondsDurationPassed(totalSeconds)
          clearInterval(interval)
        } else {
          secondsDurationPassed(secondsDifferences)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    markCurrentCycleAsFinished,
    secondsDurationPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - durantionSecondsPassed : 0

  const minutesDuration = Math.floor(currentSeconds / 60)
  const secondsDuration = currentSeconds % 60

  const minutes = String(minutesDuration).padStart(2, '0')
  const seconds = String(secondsDuration).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  })

  return (
    <CountContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorCount>:</SeparatorCount>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountContainer>
  )
}
