import { createEffect } from 'solid-js'

export default function useDebugLog(data: any): void {
  createEffect(() => {
    console.log('useDebugLog', data)
  })
}
