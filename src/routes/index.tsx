import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { getDragonBallCharacters } from '~/api/getDragonBallCharacters'
import { useSplide } from '~/hooks/useSplide'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { TimelineDefinition, stagger, timeline } from 'motion'

export const URL = import.meta.env.PUBLIC_APP_URL

export const useCharacters = routeLoader$(async () => {
  try {
    return await getDragonBallCharacters()
  } catch (error) {
    console.error('An error occurred while fetching characterss!', error)
    return []
  }
})

export default component$(() => {
  const { value: characters } = useCharacters()
  const numberOfSlides = useSplide()

  useVisibleTask$(({ track }) => {
    // Options of the splide
    track(numberOfSlides)

    const options = {
      type: 'loop',
      perMove: 1,
      perPage: numberOfSlides.value,
      loop: true,
      autoplay: true,
      updateOnMove: true,
      drag: true,
      interval: 2000,
      pagination: false,
    }
    setTimeout(() => {
      const splide = new Splide('.splide', options).mount()

      const logo = document.querySelector('.logo') as HTMLElement
      const slides = document.querySelectorAll('li') as NodeListOf<HTMLElement>
      const arrows = document.querySelectorAll(
        '.splide__arrow'
      ) as NodeListOf<HTMLElement>
      const github = document.querySelector('.github') as HTMLElement

      const sequence: TimelineDefinition = [
        [
          slides,
          { opacity: [0, 1], y: [-50, 0] },
          { duration: 0.2, delay: stagger(0.1) },
        ],
        [logo, { opacity: [0, 1] }, { at: 0.6 }],
        [
          arrows,
          { opacity: [0, 1], y: [-50, 0] },
          { duration: 0.2, delay: stagger(0.1) },
        ],
        [github, { opacity: [0, 1] }],
      ]

      timeline(sequence, {})

      splide.on('resize', function () {
        splide.destroy()
        const newSplide = new Splide('.splide', options).mount()
        console.log('When resizing, a new splide will be created:', newSplide)
      })
    }, 50)
  })

  return (
    <>
      <section
        class="splide relative min-h-screen max-w-screen overflow-hidden"
        aria-label="Latest DBZ Characters"
      >
        <img
          class="logo opacity-0 absolute top-12 left-1/2 transform -translate-x-1/2 z-10"
          src="/img/logo.png"
          alt="Logo Dragon Ball Guru"
          width={200}
          height={130}
        />
        <a
          rel="noopener nofollow"
          target="_blank"
          title="Go to repo on GitHub"
          href="https://github.com/manuelsanchezweb/qwik-dragonball-slider"
          class="github absolute top-12 right-4 md:right-12 z-10 bg-secondary border border-black rounded-full p-2 drop-shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-github"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
          </svg>
        </a>
        <div class="splide__track !overflow-visible">
          <ul class="splide__list h-screen">
            {characters.map((character) => (
              <li class="splide__slide h-full w-full opacity-0">
                <a
                  class="cursor-pointer group w-full h-full flex transition-all duration-300"
                  href={character.url}
                  title={`Check "${character.name}" characters Page`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    height={800}
                    width={375}
                    src={`${URL}${character.img}`}
                    alt={character.name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer class="absolute bottom-6 w-full text-right right-3 md:right-12 text-white drop-shadow-md">
          All these images belong to{' '}
          <a
            class="text-primary"
            title="Visit Dragon Ball Guru webpage"
            rel="nofollow noopener"
            target="_blank"
            href="https://dragonball.guru/"
          >
            Dragon Ball Guru
          </a>
        </footer>
      </section>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Unofficial Dragon Ball Characters Slider',
  meta: [
    {
      name: 'description',
      content: 'Discover info about your favourite DBZ characters!',
    },
    {
      name: 'keywords',
      content: 'capcom, game, steam, re4, monster hunter, Qwik',
    },
    {
      name: 'author',
      content: 'Manuel Sanchez',
    },
    {
      property: 'og:title',
      content: 'Unofficial Dragon Ball Characters Slider',
    },
    {
      property: 'og:description',
      content: 'Discover info about your favourite DBZ characters!',
    },
    {
      property: 'og:image',
      content: 'https://dbz-slider.vercel.app/thumbnail.png',
    },
    {
      property: 'og:url',
      content: 'https://dbz-slider.vercel.app/',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@manuelsandoble',
    },
    {
      name: 'twitter:title',
      content: 'Unofficial Dragon Ball Characters Slider',
    },
    {
      name: 'twitter:description',
      content: 'Discover info about your favourite DBZ characters!',
    },
    {
      name: 'twitter:image',
      content: 'https://dbz-slider.vercel.app/thumbnail.png',
    },
  ],
}
