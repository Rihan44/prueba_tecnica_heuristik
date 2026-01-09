# Prueba Técnica Heuristik – Listado de Animes

Esta es una prueba técnica de **Nuxt 3** que consume la **API de Jikan (MyAnimeList)** para mostrar un listado de animes con detalle de episodios, búsqueda, filtros y paginación.  

---

## 🌐 Demo en vivo

**URL pública:** [https://tu-proyecto-vercel.vercel.app](https://tu-proyecto-vercel.vercel.app)  
> Sustituye la URL por la de tu despliegue real.

---

## 🛠 Tecnologías utilizadas

- [Nuxt 3](https://nuxt.com/)  
- [Vue 3](https://vuejs.org/) con Composition API  
- TypeScript  
- [Vitest](https://vitest.dev/) + [@vue/test-utils](https://next.vue-test-utils.vuejs.org/) para tests unitarios  
- CSS scoped  
- API: [Jikan v4](https://jikan.moe/)  

---

## ⚙️ Requisitos

- Node.js ≥ 18  
- npm, yarn o pnpm  
- Acceso a internet para consumir la API pública  

---

## 💻 Instalación local

Clona el repositorio:

```bash
git clone https://github.com/tuusuario/prueba_tecnica_heuristik.git
cd prueba_tecnica_heuristik


## INSTALACIÓN DE DEPENDENCIAS
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

## servidor de desarrollo
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
Abre http://localhost:3000/ en tu navegador 

## Build de producción
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

## Previsualizar versión de producción localmente
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

## Tests Unitarios
Se incluyen tests unitarios con Vitest y @vue/test-utils
## Ejecuta los test
# npm
npm run test

# pnpm
pnpm test

# yarn
yarn test

## -- Notas

La búsqueda implementa debounce de 300ms para evitar exceso de peticiones a la API.

La paginación respeta los límites de la API pública y el filtro de resultados.

Componente responsive con scroll y botones adaptados para móviles.

Error handling en listado y detalle de anime con mensajes claros.
