<script setup lang="ts">
  import AnimeCard from '~/components/anime-list/AnimeCard.vue'
  import AnimeHeader from '~/components/anime-list/AnimeHeader.vue'
  import AnimePagination from '~/components/anime-list/AnimePagination.vue'
  import type { AnimeListResponse } from '~/types/interfaces'
  import Spinner from '~/components/spinner/Spinner.vue'

  const page = ref(1)
  const limit = ref('')
  const searchAnime = ref('')
  const debouncedSearch = ref('')
  const animeHeaderRef = ref<ComponentPublicInstance | null>(null)
  const paginationRef = ref<ComponentPublicInstance | null>(null)
  const isArrowDown = ref(false)

  let timeout: number | undefined | ReturnType<typeof setTimeout>

  const { data, pending, error } = await useFetch<AnimeListResponse>(
    () => {
      const baseUrl = 'https://api.jikan.moe/v4/anime'
      const limitParam = limit.value || 24
      const pageParam = page.value

      if (debouncedSearch.value.trim()) {
        return `${baseUrl}?q=${debouncedSearch.value}&limit=${limitParam}&page=${pageParam}`
      }

      return `${baseUrl}?limit=${limitParam}&page=${pageParam}`
    },
    { immediate: true }
  )

  const animeList = computed(() => data.value?.data)

  const paginationControl = (buttonType: string) => {
    switch(buttonType){
      case 'prevPage':
        if(page.value > 1) page.value--
        break;
      case 'goFirstPage':
        page.value = 1
        break;
      case 'nextPage':
        if(data.value?.pagination.has_next_page) page.value++
        break;
      case 'goLastPage':
        page.value = data.value?.pagination.last_visible_page ?? 1
        break;
    }
  }

  const moveArrow = () => {
    const paginationEl = paginationRef.value?.$el as HTMLElement | undefined
    const headerEl = animeHeaderRef.value?.$el as HTMLElement | undefined

    if (!isArrowDown.value) {
      if (paginationEl) {
        paginationEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        isArrowDown.value = true
      }
    } else {
      if (headerEl) {
        headerEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        isArrowDown.value = false
      }
    }
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY

    if (scrollPosition < 300) {
      isArrowDown.value = false
    } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      isArrowDown.value = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    clearTimeout(timeout)
  })

  watch(searchAnime, (value) => {
    // USO DEBONCE SEARCH YA QUE ESTE TIPO DE PETICIONES NORMALMENTE SE HACEN DESDE EL BACK
    // PORQUE AL ESCRIBIR RAPIDO, SE HACE UN USO EXCESIVO DE PETICIONES Y LA API DEVUELVE UN ERROR, AL DARLE UN TIMEOUT EVITO ESTO
    if(value === '') limit.value = ''

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      debouncedSearch.value = value
      page.value = 1
    }, 300)
  })

  watch(page, () => {
    isArrowDown.value = false;
  })

</script>
<template name="AnimeList">
   <main class="container">
    <AnimeHeader 
      ref="animeHeaderRef"
      v-model:searchAnime="searchAnime" 
      v-model:limit="limit" 
      :is-disabled="(animeList?.length ?? 0) <= 0"
    />

    <Spinner v-if="pending" loading-title="Cargando animes..."/>
    <p v-else-if="error" class="error">Error al cargar los datos, intentelo de nuevo, si el problema persiste contacte con el administrador</p>

    <section v-else-if="animeList && animeList?.length > 0" class="grid">
      <AnimeCard 
        v-for="anime in animeList" 
        :key-list="anime.mal_id" 
        :anime="anime"
      />
    </section>

    <div class="error" v-else>
      <p>Ningún anime coincide con -> <strong>{{ debouncedSearch }}</strong></p>
    </div>

     <AnimePagination 
      v-if="data"
      ref="paginationRef"
      :current-page="page"
      :has-next-page="!!data.pagination.has_next_page"
      :is-pending="pending"
      @pagination-control="paginationControl"
    />

    <span class="downButton" @click="moveArrow">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrowSVG" :class="{upArrow: isArrowDown}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.06 11.17L12.53 14.7C12.38 14.85 12.19 14.92 12 14.92C11.81 14.92 11.62 14.85 11.47 14.7L7.94 11.17C7.65 10.88 7.65 10.4 7.94 10.11C8.23 9.82 8.71 9.82 9 10.11L12 13.11L15 10.11C15.29 9.82 15.77 9.82 16.06 10.11C16.35 10.4 16.35 10.87 16.06 11.17Z" fill="#3278cd"></path> </g></svg>
    </span>
  </main>
</template>

<style scoped>
  main {
    position: relative;
  }

  .downButton {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 0;
    width: 50px;
  }

  .arrowSVG {
    transition: all 0.6s ease-in-out;
  }

  .upArrow {
    transform: rotate(180deg);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    color: #fff;
  }

  .error {
    text-align: center;
    margin-top: 2em;
    color: crimson;
    font-size: 1.2em;
  }

  /* ESTILOS RESPONSIVE */

  @media (min-width: 800px){
    .downButton {
      display: none;
    }
  }
</style>