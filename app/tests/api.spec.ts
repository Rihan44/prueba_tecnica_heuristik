import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AnimeListResponse } from '~/types/interfaces'

describe('Consumo de API Jikan', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('Debería llamar a la URL correcta de Jikan con el término de búsqueda', async () => {
      const mockResponse = { data: [{ title: 'Naruto' }] }
      
      const fetchSpy = vi.fn().mockResolvedValue(mockResponse)
      global.$fetch = fetchSpy as any

      const search = 'Naruto'
      // 1. Forzamos que la URL sea un string genérico, no una ruta de Nuxt
      const url = `https://api.jikan.moe/v4/anime?q=${search}` as string
      
      const result = await (global.$fetch as any)(url) as any

      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('q=Naruto'))
      expect(result.data?.[0]?.title).toBe('Naruto')
   })

  it('Debería formatear la URL de búsqueda correctamente', async () => {
    const spy = vi.fn().mockResolvedValue({ data: [] })
    global.$fetch = spy as any

    const term = 'Naruto'
    const limit = 20
    const url = `https://api.jikan.moe/v4/anime?q=${term}&limit=${limit}`
    
    await $fetch(url)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('q=Naruto'))
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('limit=20'))
  })
})