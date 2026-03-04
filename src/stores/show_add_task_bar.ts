import { defineStore } from 'pinia'

interface ShowAddTaskBarState {
  show: boolean
}

export const useShowAddTaskBarStore = defineStore('show_add_task_bar', {
  state: (): ShowAddTaskBarState => ({
    show: false,
  }),

  actions: {
    toggle() {
      this.show = !this.show
    },
  },
})
