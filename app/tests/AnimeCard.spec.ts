import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AnimeCard from '../components/anime-list/AnimeCard.vue'

// 1. Mockeamos navigateTo de Nuxt antes de los tests
const navigateToMock = vi.hoisted(() => vi.fn())
vi.mock('#app', () => ({
  navigateTo: navigateToMock
}))

// Si lo anterior falla por la configuración de alias, usa este mock global más sencillo:
// (global as any).navigateTo = vi.fn()

describe('AnimeCard.vue', () => {
  const mockAnime = {
    mal_id: 123,
    title: 'Naruto Shippuden',
    images: { jpg: { image_url: 'naruto.jpg' } },
    year: 2002,
    episodes: 220
  }

  it('Debería llamar a navigateTo con la ruta correcta al pulsar el botón', async () => {
    // IMPORTANTE: Si usaste el mock de global, usa vi.stubGlobal
    const navigateSpy = vi.fn()
    vi.stubGlobal('navigateTo', navigateSpy)

    const wrapper = mount(AnimeCard, {
      props: { 
        anime: mockAnime as any,
        keyList: 123
      }
    })

    // 2. Buscamos el botón y simulamos el clic
    const button = wrapper.find('.cardBody__button')
    await button.trigger('click')

    // 3. Verificamos que se llamó a navigateTo con el formato de tu función:
    // navigateTo(`/anime/${dataAnime.mal_id}?name=${dataAnime.title.replace(/\s+/g, '')}`)
    const expectedPath = '/anime/123?name=NarutoShippuden'
    
    expect(navigateSpy).toHaveBeenCalledWith(expectedPath)
  })

  it('Debería renderizar los datos básicos correctamente', () => {
    const wrapper = mount(AnimeCard, {
      props: { anime: mockAnime as any, keyList: 123 }
    })
    expect(wrapper.find('h2').text()).toBe('Naruto Shippuden')
    expect(wrapper.find('img').attributes('src')).toBe('naruto.jpg')
  })

  it('Debería manejar datos nulos en el año y episodios', () => {
    const incomplete = { ...mockAnime, year: null, episodes: null }
    const wrapper = mount(AnimeCard, {
      props: { anime: incomplete as any, keyList: 456 }
    })
    // Coincidiendo con tu código: "Año desconocido · ? eps"
    expect(wrapper.text()).toContain('Año desconocido')
    expect(wrapper.text()).toContain('?')
  })
})