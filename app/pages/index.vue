<script setup lang="ts">
  import type { Anime, AnimeListResponse } from '~/types/interfaces'
  import Spinner from '~/utils/Spinner.vue'

  const page = ref(1)
  const limit = ref('')
  const searchAnime = ref('')
  const debouncedSearch = ref('')
  const limitOptions: Array<Number> = [4, 8, 12, 16, 20, 24]
  const buttonsRef = ref<HTMLElement | null>(null)
  const headerRef = ref<HTMLElement | null>(null)
  const isArrowDown = ref(false)

  let timeout: ReturnType<typeof setTimeout>

  const { data, pending, error } = useFetch<AnimeListResponse>(
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

  const nextPage = () => {
    if(data.value?.pagination.has_next_page) page.value++
  }

  const prevPage = () => {
    if(page.value > 1) page.value--
  }

  const goFirstPage = () => {
    page.value = 1
  }

  const goLastPage = () => {
    page.value = data.value?.pagination.last_visible_page ?? 1
  }

  const goToAnime = (dataAnime: Anime) => {
    navigateTo(`/anime/${dataAnime.mal_id}?name=${dataAnime.title.replace(/\s+/g, '')}`)
  }

  const moveArrow = () => {
    if (buttonsRef.value && !isArrowDown.value) {
      buttonsRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
        inline: 'nearest'
      })

      isArrowDown.value = true;
    } else {
      if(headerRef.value) {
        headerRef.value.scrollIntoView({
          behavior: 'smooth',
          block: 'center', 
          inline: 'nearest'
        })
      }
      isArrowDown.value = false;
    }
  }

  watch(searchAnime, (value) => {
    // USO DEBONCE SEARCH YA QUE ESTE TIPO DE PETICIONES NORMALMENTE SE HACEN DESDE EL BACK
    // PORQUE AL ESCRIBIR RAPIDO, SE HACE UN USO EXCESIVO DE PETICIONES Y LA API DEVUELVE UN ERROR, AL DARLE UN TIMEOUT EVITO ESTO
    if(searchAnime.value === '') limit.value = ''

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      debouncedSearch.value = value
      page.value = 1
    }, 300)
  })

</script>
<template name="AnimeList">
   <main class="container">
    <div ref="headerRef" class="animeListHeader">
      <h1>Listado de Animes</h1>
      <div class="header__inputs">
        <div class="searchInput">
          <svg class="searchInput__iconSearch" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2A4.5 4.5 0 1 0 14 9.5 4.5 4.5 0 0 0 9.5 5m7.5 14-4.35-4.35 1.41-1.41L19.41 17Z"
            />
          </svg>
          <input v-model="searchAnime" type="text" placeholder="Buscar anime..."/>
        </div>
        <select v-model="limit" :disabled="animeList && animeList?.length <= 0">
          <option disabled value="">
            Total animes
          </option>
          <option v-for="(limit, index) in limitOptions" :key="`${limit}-${index}`">
            {{ limit }}
          </option>
        </select>
      </div>
    </div>

    <Spinner v-if="pending" loading-title="Cargando animes..."/>
    <p v-else-if="error" class="error">Error al cargar los datos, intentelo de nuevo, si el problema persiste contacte con el administrador</p>

    <section v-else-if="animeList && animeList?.length > 0" class="grid">
      <article
        v-for="anime in animeList ?? []"
        :key="anime.mal_id"
        class="card"
      >
        <picture :alt="anime.title ?? 'imagen_anime'" loading="lazy">
          <source :srcset="anime.images?.jpg?.image_url ?? ''"/>
          <img :src="anime.images?.jpg?.image_url ?? ''" alt="MDN" />
        </picture>

        <div class="cardBody">
          <h2>{{ anime.title }}</h2>
          <p class="cardBody__subtitle">
            {{ anime.year ?? 'Año desconocido' }} ·
            {{ anime.episodes ?? '?' }} eps
          </p>
           <button class="cardBody__button" @click="goToAnime(anime)">Ver detalle</button>
        </div>
      </article>
    </section>
    <div class="error" v-else>
      <p>Ningún anime coincide con -> <strong>{{ debouncedSearch }}</strong></p>
    </div>

    <nav v-if="data" class="pagination">
      <div class="buttons">
        <button
          @click="goFirstPage"
          :disabled="page === 1 || pending"
        >
          Inicio
        </button>
        <button
          @click="prevPage"
          :disabled="page === 1"
        >
          Anterior
        </button>
      </div>

      <p style="text-align: center;">Página {{ page }}</p>

      <div ref="buttonsRef" class="buttons">
        <button
          @click="nextPage"
          :disabled="pending ? pending : !data.pagination.has_next_page"
        >
          Siguiente
        </button>
  
        <button
          @click="goLastPage"
          :disabled="pending ? pending : !data.pagination.has_next_page"
        >
          Final
        </button>
      </div>
    </nav>
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
    transition: all 1s ease-in-out;
  }

  .upArrow {
    transform: rotate(180deg);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .animeListHeader {
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .animeListHeader h1 {
    min-width: 250px;
  }

  .header__inputs {
    width: 50%;
    display: flex;
    justify-content: end;
  }

  .header__inputs input[type="text"], select{
    padding: 1em;
    border: 2px solid #777;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    min-width: 180px;
  }

  .searchInput {
    position: relative;
    display: inline-block;
  }

  .searchInput input:focus, select:focus {
    outline: none;
  }

  .searchInput .searchInput__iconSearch {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: #777;
    pointer-events: none;
  }

  .header__inputs .searchInput input[type="text"] {
    padding-left: 2.5em;
  }

  select {
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    color: #fff;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #111;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.4s ease;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .card img {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
  }

  .cardBody {
    padding: 0.75rem;
  }

  .card h2 {
    font-size: 0.95rem;
    margin: 0;
  }

  .cardBodycardBody__subtitle {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .cardBody__button {
    width: 100%;
    padding: 0.8rem 0.8rem;
    background: transparent;
    border: 2px solid #777;
    color: #fff;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .cardBody__button:hover {
    background-color: #777;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
  }

  .pagination .buttons {
    display: flex;
  }

  .pagination button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin: 0 5px 0 5px;
    transition: 0.3s ease;
  }

  .pagination button:hover {
    transform: scale(1.05, 1.05);
    background-color: #d7d7d7;
  }

  .pagination button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
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

  @media (max-width: 800px) {
    .animeListHeader {
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.5em;
    }

    .header__inputs{
      flex-direction: column;
      width: 100%;
    }

    .searchInput {
      width: 100%;
    }

    .searchInput input[type="text"] {
      width: 100%;
      margin-bottom: 0.2em;
    }
  }

  @media (max-width: 600px) {
    .pagination button {
      margin-top: 5px;
    }

    .pagination .buttons {
      flex-direction: column;
    }
  }
</style>