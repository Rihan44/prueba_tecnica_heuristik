<script setup lang="ts">
  import type { AnimeResponse, Episode, EpisodesResponse } from '~/types/interfaces'
  import Spinner from '~/utils/Spinner.vue'
  
  const route = useRoute()
  const id = route.params.id as string || '1'
  const openModal = ref(false);
  const modalInfo = ref<Episode | null>(null)
  const activeFilterScore = ref(true)

  const { data, pending, error } = useFetch<AnimeResponse>(`https://api.jikan.moe/v4/anime/${id}`)
  const { data: dataEpisodes, pending: pendingEpisodes, error: errorEpisodes } = useFetch<EpisodesResponse>(`https://api.jikan.moe/v4/anime/${id}/episodes`)

  const episodesList = computed(() => dataEpisodes.value?.data.sort((a,b) => b.score - a.score) ?? [])

  const scoreColor = (score: number) => {
    let color = '#ccc';
    color = score < 4 ? 'crimson' : score < 4.5 ? 'orange' : 'cyan';
    return color;
  }

  const openModalInfoEpisode = (episodeInfo: Episode) => {
    openModal.value = true;
    modalInfo.value = episodeInfo;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''

    const date = new Date(dateString)

    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  const sortByScore = () => {
    activeFilterScore.value = !activeFilterScore.value;
    episodesList.value.sort((a, b) => 
      activeFilterScore.value ? b.score - a.score : a.score - b.score
    )
  }
</script>

<template name="AnimeDetail">
  <main class="container">
    <NuxtLink to="/" class="backLink">← Volver al listado</NuxtLink>

    <Spinner v-if="pending" loading-title="Cargando anime..."/>
    <p v-else-if="error" class="error">Error al cargar el anime</p>

    <section v-else-if="data?.data" class="animeDetails">
      <picture :alt="data.data.title ?? 'imagen_anime'" loading="lazy" class="animeImageBox">
        <source :srcset="data.data.images?.jpg?.image_url ?? ''"/>
        <img :src="data.data.images?.jpg?.image_url ?? ''" alt="MDN" class="animeImage"/>
      </picture>
      <div class="animeInfo">
        <h2 class="animeTitle">{{ data.data.title }}</h2>
        <div>
          <p class="animeMeta">
            <strong>Sinopsis:</strong> {{ data.data.synopsis }}
          </p>
          <p class="animeMeta">
            <strong>Año:</strong> {{ data.data.year ?? 'Desconocido' }}
          </p>
          <p class="animeMeta">
            <strong>Cantidad de episodios:</strong> {{ data.data.episodes ?? '?' }}
          </p>
        </div>
        <div class="filterEpisodeBox">
          <h3>Episodios</h3>
          <button class="sortBtn" :class="{sortBtn__desc: !activeFilterScore}" @click="sortByScore">
            Ordenar por puntuación
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>
        <div>
          <Spinner v-if="pendingEpisodes" loading-title="Cargando episodios..."/>
          <div v-else-if="errorEpisodes">
            <p class="errorEpisode">
              Error cargando los episodios de {{ data.data.title }}
            </p>
          </div>
          <div v-else-if="episodesList.length === 0">
            <p class="animeMeta">
              Este anime no tiene episodios
            </p>
          </div>
          <div class="episodesList" v-else>
            <div class="episodesList__box" :style="{borderColor: scoreColor(episode.score)}" v-for="episode in episodesList ?? []" @click="openModalInfoEpisode(episode)">
              <strong>{{ episode.title ?? '' }}</strong>
              <div class="episodesList__score" :style="{color: scoreColor(episode.score)}">
                {{ episode.score ?? 'Sin puntuación'}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Teleport to="body">
    <div v-if="openModal && modalInfo" class="modalOverlay" @click.self="openModal = false">
      <div class="modal">
        <header class="modalHeader">
          <h3>{{ modalInfo.title }}</h3>
          <button class="closeBtn" @click="openModal = false">×</button>
        </header>

        <section class="modalBody">
          <p><strong>Título japones:</strong> {{ modalInfo.title_japanese ?? 'Titulo japones no disponible' }}</p>
          <p><strong>Puntuación:</strong> {{ modalInfo.score ?? 'Sin puntuación' }}</p>
          <p><strong>Fecha estreno:</strong> {{ formatDate(modalInfo.aired) ?? 'Fecha de publicación no disponible' }}</p>
          <p>
            <strong>Url al foro: </strong>
            <a :href="modalInfo.forum_url" target="_blank" class="episodeUrl">{{ modalInfo.forum_url ?? 'URL no disponible' }}</a>
          </p>
        </section>

        <footer class="modalFooter">
          <button class="btnClose" @click="openModal = false">Cerrar</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .backLink {
    display: inline-block;
    margin-bottom: 3rem;
    color: #4f9cff;
    text-decoration: none;
    font-weight: 500;
  }

  .backLink:hover {
    text-decoration: underline;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    margin: 2rem 0;
  }

  .animeDetails {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
  }

  .animeImage {
    width: 400px;
    flex-shrink: 0;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .animeInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .animeTitle {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }

  .animeMeta {
    font-size: 1rem;
    color: #777;
    text-align: start;
    margin: 0.3em;
  }

  .errorEpisode {
    font-size: 1rem;
    margin: 0 1em 0 1em;
    color: rgb(186, 59, 59);
    font-weight: bold;
  }

  .episodesList {
    border: 2px solid #777;
    border-radius: 5px;
    padding: 0.8em;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 250px;
  }

  .episodesList div.episodesList__box {
    font-size: 1rem;
    color: #777;
    text-align: start;
    margin: 0.8em 0 0.8em 0;
    padding: 0;
    border: 2px solid #777;
    border-radius: 10px;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.4s ease;
  }

  .episodesList div.episodesList__box:hover {
    cursor: pointer;
    transform: scale(1.03, 1.03);
  }

   .episodesList div.episodesList__score {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 1em;
  }

  .boxBorderColor {
    border: 2px solid #777;
  }

  h3 {
    margin-bottom: 0.8em;
  }

  .modalOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal {
    background: #373737;
    color: #fff;
    width: 90%;
    max-width: 450px;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .modalHeader h3 {
    margin: 0;
    font-size: 1.4rem;
  }

  .closeBtn {
    background: none;
    border: none;
    font-size: 1.8rem;
    color: #fff;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .closeBtn:hover {
    color: #b3b3b3;
  }

  .modalBody p {
    margin: 0.5rem 0;
    color: #ccc;
  }

  .modalFooter {
    margin-top: 1.5rem;
    text-align: right;
  }

  .btnClose {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background: #4f9cff;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .btnClose:hover {
    background: #2261b4;
    transform: scale(1.04, 1.04);
  }

  a.episodeUrl {
    text-decoration: none;
    color: cadetblue;
    transition: color 0.3s ease;
  }

  a.episodeUrl:hover {
    color: rgb(68, 104, 106);
  }

  .filterEpisodeBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0 1em 0;
  }

  .sortBtn {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0.8rem;
    background: transparent;
    border: 2px solid #777;
    color: #656565;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .sortBtn svg {
    width: 20px;
    height: 20px;
    margin: 0 0.8em;
    transition: all 0.3s ease;
  }

  .sortBtn:hover {
    transform: scale(1.04, 1.04);
    color: #4f9cff;
    border-color: #4f9cff;
  }

  .sortBtn__desc svg {
    transition: all 0.3s ease;
    transform: rotate(180deg);
  }
  
  /* ESTILOS RESPONSIVE */

  @media (max-width: 860px) {
    .filterEpisodeBox {
      flex-direction: column;
    }
  }

  @media (max-width: 768px) {
    .animeDetails {
      flex-direction: column;
      align-items: center;
    }

    .animeImageBox  {
      width: 100%;
    }

    .animeImage {
      width: 100%;
    }

    .animeInfo {
      text-align: center;
    }

    .episodesList div {
      flex-direction: column;
    }

    .filterEpisodeBox {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
