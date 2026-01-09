# 🎌 Anime Discovery - Prueba Técnica Nuxt 3

Aplicación desarrollada con **Nuxt 3** que consume la API de **Jikan (MyAnimeList)** para ofrecer un catálogo interactivo de animes con capacidades de búsqueda, filtrado y paginación asíncrona.

---

## 🚀 Demo en Vivo

**URL Pública:** [Sustituye por tu URL de Vercel aquí]

---

## ✨ Características Técnicas (Bonus)

Para esta prueba, he implementado las siguientes soluciones técnicas para mejorar la UX y el rendimiento:

* **⚡ Arquitectura Híbrida (SSR/CSR):** Renderizado en el servidor para el listado inicial (mejor SEO) y navegación fluida en el cliente.
* **⏲️ Optimización de Búsqueda:** Implementación de un **Debounce de 300ms** en el campo de búsqueda para minimizar el tráfico innecesario a la API.
* **🧪 Suite de Testing Robusta:** Tests unitarios desarrollados con **Vitest** cubriendo:
    * Lógica de navegación y eventos de componentes.
    * Gestión de estados y renderizado condicional.
    * Mocking de servicios de API externos.
* **📱 Responsive First:** Interfaz diseñada para ser totalmente funcional en dispositivos móviles y escritorio.
* **🛡️ Type Safety:** Uso extensivo de interfaces de **TypeScript** para garantizar la integridad de los datos de la API.

---

## 🛠 Stack Tecnológico

* **Framework:** Nuxt 3 (Vue 3 Composition API)
* **Lenguaje:** TypeScript
* **Estilos:** CSS Scoped (BEM methodology)
* **Testing:** Vitest + @vue/test-utils
* **API:** Jikan v4 (REST)

---

## 📦 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/nombre-repo.git](https://github.com/tu-usuario/nombre-repo.git)
   cd nombre-repo
