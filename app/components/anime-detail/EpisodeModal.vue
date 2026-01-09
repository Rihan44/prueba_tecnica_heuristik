<script setup lang="ts">
  import type {Episode} from '~/types/interfaces'

   const props = defineProps<{
      openModal: boolean;
      modalInfo: Episode | null;
   }>()

   const emit = defineEmits(['closeModal'])

   const formatDate = (dateString: string) => {
      if (!dateString) return ''

      const date = new Date(dateString)

      const day = String(date.getUTCDate()).padStart(2, '0')
      const month = String(date.getUTCMonth() + 1).padStart(2, '0')
      const year = date.getUTCFullYear()

      return `${day}/${month}/${year}`
   }

</script>
<template name="EpisodeModal">
  <Teleport to="body">
    <div v-if="openModal && modalInfo" class="modalOverlay">
      <div class="modal">
        <header class="modalHeader">
          <h3>{{ modalInfo.title }}</h3>
          <button class="closeBtn" @click="$emit('closeModal')">×</button>
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
          <button class="btnClose" @click="$emit('closeModal')">Cerrar</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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
</style>
