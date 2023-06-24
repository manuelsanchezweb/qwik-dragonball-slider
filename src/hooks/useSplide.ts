import { $, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik'

const getNumberOfSlides = () => {
  if (typeof window === 'undefined') {
    return 2
  } else {
    const width = window.outerWidth
    if (width > 1200) {
      return 4
    } else if (width > 800) {
      return 3
    } else {
      return 1
    }
  }
}

export const useSplide = () => {
  const numberOfSlides = useSignal(getNumberOfSlides)
  // console.log('numberOfSlides', numberOfSlides.value)

  const handleResize = $(() => {
    numberOfSlides.value = getNumberOfSlides()
  })

  useVisibleTask$(() => {
    handleResize()
  })

  useOnWindow(
    'resize',
    $(() => {
      handleResize()
    })
  )

  return numberOfSlides
}
