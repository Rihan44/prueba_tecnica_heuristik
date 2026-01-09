# 🎌 Anime Discovery - Prueba Técnica (Nuxt 3 + Vitest)

Aplicación desarrollada con **Nuxt 3** que consume la API de **Jikan (MyAnimeList)** para ofrecer un catálogo interactivo de animes. El proyecto implementa renderizado híbrido (SSR/CSR) para optimizar el SEO y la experiencia de usuario.

---

## 🚀 Demo en Vivo

**URL Pública:** [https://prueba-tecnica-heuristik.vercel.app/](https://prueba-tecnica-heuristik.vercel.app/)

---

## ✨ Características Técnicas Destacadas

Como desarrollador Fullstack con foco en el ecosistema Vue/Nuxt, he implementado las siguientes soluciones técnicas:

* **⚡ Arquitectura SSR/CSR:** Aprovechamiento del motor Nitro de Nuxt 3 para un renderizado inicial en servidor (mejor SEO) y navegación fluida en cliente.
* **⏲️ Optimización de Búsqueda (Debounce):** Implementación de un debounce de 300ms en el input de búsqueda para minimizar peticiones innecesarias a la API y mejorar la performance.
* **🧪 Suite de Testing Unitario:** Cobertura de tests con **Vitest** y **@vue/test-utils**, incluyendo:
    * Mocking de servicios API externos ($fetch).
    * Validación de eventos de navegación y lógica de `MapsTo`.
    * Pruebas de renderizado condicional y manejo de "edge cases" (datos nulos).
* **📱 Responsive & UX:** Interfaz diseñada bajo la filosofía *Mobile-first* con scroll suave y botones de navegación rápida.
* **🛡️ Type Safety:** Tipado estricto mediante interfaces de TypeScript para asegurar la integridad de los datos consumidos de la API.

---

## 🛠 Stack Tecnológico

* **Framework:** Nuxt 3
* **Lenguaje:** TypeScript
* **Estilos:** CSS Scoped (Metodología BEM)
* **Testing:** Vitest + @vue/test-utils
* **Despliegue:** Vercel (CI/CD mediante GitHub)
* **API:** Jikan v4 (REST)

---

## 📦 Instalación y Uso Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/rihan44/prueba_tecnica_heuristik.git](https://github.com/rihan44/prueba_tecnica_heuristik.git)
    cd prueba_tecnica_heuristik
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

---

## 🧪 Ejecución de Tests

He incluido una suite de pruebas para garantizar la estabilidad de los componentes principales:

```bash
# Ejecutar todos los tests
npm run test
