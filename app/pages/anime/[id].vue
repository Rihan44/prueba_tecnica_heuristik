<script setup lang="ts">
  import type { AnimeResponse, Episode, EpisodesResponse } from '~/types/interfaces'
  import Spinner from '~/components/spinner/Spinner.vue'
  import EpisodeModal from '~/components/anime-detail/EpisodeModal.vue';
  import AnimeCardDetail from '~/components/anime-detail/AnimeCardDetail.vue';
  
  const route = useRoute()
  const id = route.params.id as string || '1'
  const openModal = ref(false);
  const modalInfo = ref<Episode | null>(null)

  const { data, pending, error } = await useFetch<AnimeResponse>(`https://api.jikan.moe/v4/anime/${id}`)
  const { data: dataEpisodes, pending: pendingEpisodes, error: errorEpisodes } = await useFetch<EpisodesResponse>(`https://api.jikan.moe/v4/anime/${id}/episodes`)

  const episodesList = computed(() => dataEpisodes.value?.data.sort((a,b) => b.score - a.score) ?? [])

  const openModalInfoEpisode = (episodeInfo: Episode) => {
    openModal.value = true;
    modalInfo.value = episodeInfo;
  }

  const closeModal = () => {
    openModal.value = !openModal.value;
  }

</script>

<template name="AnimeDetail">
  <main class="container">
    <NuxtLink to="/" class="backLink">← Volver al listado</NuxtLink>

    <Spinner v-if="pending" loading-title="Cargando anime..."/>
    <p v-else-if="error" class="error">Error al cargar el anime</p>

    <AnimeCardDetail 
      v-if="data?.data"
      :anime-data="data?.data"
      :data-episodes="episodesList ?? []"
      :pending-episodes="pendingEpisodes"
      :error-episodes="!!errorEpisodes"
      @open-modal-info-episode="openModalInfoEpisode"
    />
    
  </main>
  <EpisodeModal 
    :open-modal="openModal"
    :modal-info="modalInfo"
    @close-modal="closeModal"
  />
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
</style>
