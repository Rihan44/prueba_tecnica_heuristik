<script setup lang="ts">
   const props = defineProps<{
      currentPage: number;
      hasNextPage: boolean;
      isPending: boolean;
   }>()

   const emit = defineEmits(['paginationControl'])
</script>
<template name="AnimePagination">
    <nav ref="paginationComponentRef" class="pagination">
      <div class="buttons">
        <button
          @click="emit('paginationControl', 'goFirstPage')"
          :disabled="currentPage === 1 || isPending"
        >
          Inicio
        </button>
        <button
          @click="emit('paginationControl', 'prevPage')"
          :disabled="currentPage === 1 || isPending"
        >
          Anterior
        </button>
      </div>

      <p style="text-align: center;">Página {{ currentPage }}</p>

      <div class="buttons">
        <button
          @click="emit('paginationControl', 'nextPage')"
          :disabled="isPending || !hasNextPage"
        >
          Siguiente
        </button>
  
        <button
          @click="emit('paginationControl', 'goLastPage')"
          :disabled="isPending || !hasNextPage"
        >
          Final
        </button>
      </div>
    </nav>
</template>

<style scoped>

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

  @media (max-width: 600px) {
    .pagination button {
      margin-top: 5px;
    }

    .pagination .buttons {
      flex-direction: column;
    }
  }
</style>