<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  error: {
    statusCode?: number
    message?: string
  }
}>()

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <main class="errorContainer">
    <div class="errorContent">
      <h1>{{ error.statusCode || 404 }}</h1>
      <p>{{ error.message || 'Página no encontrada 😢' }}</p>
      <button @click="goHome">Volver al listado</button>
    </div>
  </main>
</template>

<style scoped>
.errorContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  background-color: #111;
  color: #fff;
  padding: 1rem;
}

.errorContent h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
}

.errorContent p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.errorContent button {
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s, background-color 0.3s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.errorContent button:hover {
  transform: translateY(-2px);
  background-color: #ff4c4c;
}

@media (max-width: 600px) {
  .errorContent h1 {
    font-size: 4rem;
  }

  .errorContent p {
    font-size: 1.2rem;
  }

  .errorContent button {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
