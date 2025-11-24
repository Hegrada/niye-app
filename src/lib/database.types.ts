export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          phone: string | null
          preferred_language: string | null
          neighborhood: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone?: string | null
          preferred_language?: string | null
          neighborhood?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          preferred_language?: string | null
          neighborhood?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string | null
          audio_url: string
          audio_duration: number | null
          category: string
          language: string
          neighborhood: string | null
          contact_phone: string | null
          contact_whatsapp: string | null
          is_active: boolean | null
          views_count: number | null
          plays_count: number | null
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          audio_url: string
          audio_duration?: number | null
          category: string
          language: string
          neighborhood?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          is_active?: boolean | null
          views_count?: number | null
          plays_count?: number | null
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          audio_url?: string
          audio_duration?: number | null
          category?: string
          language?: string
          neighborhood?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          is_active?: boolean | null
          views_count?: number | null
          plays_count?: number | null
          created_at?: string
          expires_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name_en: string
          name_fr: string
          name_local: string | null
          icon_name: string
          color: string | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          name_en: string
          name_fr: string
          name_local?: string | null
          icon_name: string
          color?: string | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          name_en?: string
          name_fr?: string
          name_local?: string | null
          icon_name?: string
          color?: string | null
          sort_order?: number | null
        }
      }
      languages: {
        Row: {
          id: string
          code: string
          name: string
          native_name: string
          is_active: boolean | null
        }
        Insert: {
          id?: string
          code: string
          name: string
          native_name: string
          is_active?: boolean | null
        }
        Update: {
          id?: string
          code?: string
          name?: string
          native_name?: string
          is_active?: boolean | null
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          content: string
          language: string | null
          avatar_url: string | null
          is_featured: boolean | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          name: string
          role: string
          content: string
          language?: string | null
          avatar_url?: string | null
          is_featured?: boolean | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          name?: string
          role?: string
          content?: string
          language?: string | null
          avatar_url?: string | null
          is_featured?: boolean | null
          sort_order?: number | null
        }
      }
      investor_contacts: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          message?: string
          created_at?: string
        }
      }
    }
  }
}
