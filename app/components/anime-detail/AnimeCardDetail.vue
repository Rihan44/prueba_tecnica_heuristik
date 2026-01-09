<script setup lang="ts">
   import Spinner from '~/components/spinner/Spinner.vue'
   import type { Anime, Episode } from '~/types/interfaces';

   const props = defineProps<{
      dataEpisodes: Episode[];
      animeData: Anime;
      pendingEpisodes: boolean;
      errorEpisodes: boolean | undefined;
   }>()

   const emit = defineEmits(['openModalInfoEpisode'])

   const episodesList = computed(() => props.dataEpisodes)

   const activeFilterScore = ref(true)

   const scoreColor = (score: number) => {
      let color = '#ccc';
      color = score < 4 ? 'crimson' : score < 4.5 ? 'orange' : 'cyan';
      return color;
   }

   const sortByScore = () => {
      activeFilterScore.value = !activeFilterScore.value;
      episodesList.value.sort((a, b) => 
         activeFilterScore.value ? b.score - a.score : a.score - b.score
      )
   }
</script>

<template name="AnimeCardDetail">
    <section class="animeDetails">
      <picture :alt="animeData.title ?? 'imagen_anime'" loading="lazy" class="animeImageBox">
        <source :srcset="animeData.images?.jpg?.image_url ?? ''"/>
        <img :src="animeData.images?.jpg?.image_url ?? ''" alt="MDN" class="animeImage"/>
      </picture>
      <div class="animeInfo">
        <h2 class="animeTitle">{{ animeData.title }}</h2>
        <div>
          <p class="animeMeta">
            <strong>Sinopsis:</strong> {{ animeData.synopsis }}
          </p>
          <p class="animeMeta">
            <strong>Año:</strong> {{ animeData.year ?? 'Desconocido' }}
          </p>
          <p class="animeMeta">
            <strong>Cantidad de episodios:</strong> {{ animeData.episodes ?? '?' }}
          </p>
        </div>
        <div class="filterEpisodeBox">
          <h3>Episodios</h3>
          <button v-if="episodesList.length !== 0" class="sortBtn" :class="{sortBtn__desc: !activeFilterScore}" @click="sortByScore">
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
              Error cargando los episodios de {{ animeData.title }}
            </p>
          </div>
          <div v-else-if="episodesList.length === 0">
            <p class="animeMeta">
              Este anime no tiene episodios
            </p>
          </div>
          <div class="episodesListStyle" v-else>
            <div v-for="episode in episodesList ?? []" class="episodesListStyle__box" :style="{borderColor: scoreColor(episode.score)}"  @click="$emit('openModalInfoEpisode', episode)">
              <strong>{{ episode.title ?? '' }}</strong>
              <div class="episodesListStyle__score" :style="{color: scoreColor(episode.score)}">
                {{ episode.score ?? 'Sin puntuación'}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
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

  .episodesListStyle {
    border: 2px solid #777;
    border-radius: 5px;
    padding: 0.8em;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 250px;
  }

  .episodesListStyle div.episodesListStyle__box {
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

  .episodesListStyle div.episodesListStyle__box:hover {
    cursor: pointer;
    transform: scale(1.03, 1.03);
  }

   .episodesListStyle div.episodesListStyle__score {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 1em;
   }

  h3 {
    margin-bottom: 0.8em;
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

    .episodesListStyle div {
      flex-direction: column;
    }

    .filterEpisodeBox {
      flex-direction: column;
      align-items: center;
    }

    .episodesListStyle div.episodesListStyle__score {
      margin-top: 0.5em;
    }
  }
</style>
