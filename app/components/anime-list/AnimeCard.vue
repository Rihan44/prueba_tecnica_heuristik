<script setup lang="ts">
import type { Anime } from '~/types/interfaces';
   const props = defineProps<{
    anime: Anime,
    keyList: number | string
   }>()

   const goToAnime = (dataAnime: Anime) => {
      navigateTo(`/anime/${dataAnime.mal_id}?name=${dataAnime.title.replace(/\s+/g, '')}`)
   }
 
</script>
<template name="AnimeCard">
   <article
      :key="keyList"
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
</template>

<style scoped>

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
</style>