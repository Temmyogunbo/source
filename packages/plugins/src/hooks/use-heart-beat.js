import { useEffect, useCallback, useContext } from 'react'
import { context } from '../components/plugin-provider'

export const useHeartBeat = (fn, dependencies = []) => {
  const { alarms, constants, isActive } = useContext(context)
  const { HEARTBEAT } = constants
  const onHeartBeat = useCallback(async () => {
    const active = await isActive()
    fn(active)
  }, [fn, isActive, ...dependencies])
  useEffect(() => {
    alarms.on(HEARTBEAT, onHeartBeat)
    return () => alarms.off(HEARTBEAT, onHeartBeat)
  }, [onHeartBeat, alarms, HEARTBEAT])
}
