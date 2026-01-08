// LISTADO ANIMES
export interface Anime {
    mal_id: number
    title: string
    images: {
      jpg: {
        image_url: string
      }
    }
    synopsis: string,
    year: number | null
    episodes: number | null
  }
  
export interface AnimeListResponse {
    data: Anime[]
    pagination: {
      current_page: number
      last_visible_page: number
      has_next_page: boolean
    }
  }

// ANIME INDIVIDUAL

export interface Episode {
    mal_id: number
    title: string
    score: number,
    aired: string,
    forum_url: string, 
    title_japanese: string
  }

export interface EpisodesResponse {
    data: Episode[]
  }

export interface AnimeResponse {
    data: Anime
  }