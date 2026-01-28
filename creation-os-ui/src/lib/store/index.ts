import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  user: any | null
  theme: 'light' | 'dark'
  setUser: (user: any) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        theme: 'light',
        setUser: (user) => set({ user }),
        setTheme: (theme) => set({ theme })
      }),
      { name: 'creation-os-storage' }
    )
  )
)
