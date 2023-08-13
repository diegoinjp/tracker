import { Component } from 'solid-js'

export const Loader: Component = () => {
  return (
    <div class="w-full h-screen flex justify-center items-center">
      <div class="animate-spin rounded-full h-24 w-24 border-y-2 border-gray-900"></div>
    </div>
  )
}
