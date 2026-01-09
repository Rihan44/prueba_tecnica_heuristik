<script setup lang="ts">

  const props = defineProps<{
    searchAnime: string,
    limit: string,
    isDisabled: boolean
  }>()

  const emit = defineEmits(['update:searchAnime', 'update:limit'])

  const limitOptions: Array<Number> = [4, 8, 12, 16, 20, 24]

</script>
<template name="AnimeHeader">
  <div class="animeListHeader">
    <h1>Listado de Animes</h1>
    <div class="header__inputs">
      <div class="searchInput">
        <svg class="searchInput__iconSearch" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2A4.5 4.5 0 1 0 14 9.5 4.5 4.5 0 0 0 9.5 5m7.5 14-4.35-4.35 1.41-1.41L19.41 17Z"
          />
        </svg>
        <input :value="searchAnime" type="text" placeholder="Buscar anime..." @input="emit('update:searchAnime', ($event.target as HTMLInputElement).value)"/>
      </div>
      <select :value="limit" :disabled="isDisabled" @change="emit('update:limit', ($event.target as HTMLSelectElement).value)">
        <option  value="" disabled selected>
          Total animes
        </option>
        <option v-for="(limit, index) in limitOptions" :key="`${limit}-${index}`">
          {{ limit }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
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

  /* ESTILOS RESPONSIVE */

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
</style>