import { defineStore } from 'pinia'

interface ShowBackgroundImageState {
  show: boolean
  background_color: string
}

export const useShowBackgroundImageStore = defineStore('show_background_image', {
  state: (): ShowBackgroundImageState => ({
    show: JSON.parse(localStorage.getItem('show_background_image') || 'true'),
    background_color: '#ffffff',
  }),

  actions: {
    toggle() {
      this.show = !this.show
      localStorage.setItem('show_background_image', JSON.stringify(this.show))
    },
    setBackgroundColor(color: string) {
      this.background_color = color
      document.body.style.backgroundColor = color
    },
  },
})
