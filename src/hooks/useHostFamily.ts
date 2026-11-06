import { useMemo } from 'react'
import {
  hostFamilyConfig,
  resolveHostFamily,
  type HostFamilyConfig,
} from '../config/sides'

export function useHostFamily(): HostFamilyConfig {
  return useMemo(() => {
    const id = resolveHostFamily(
      window.location.hostname,
      window.location.search
    )
    return hostFamilyConfig(id)
  }, [])
}
