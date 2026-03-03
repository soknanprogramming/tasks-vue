import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'

interface TasksState {
  tasks: Array<Task>
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [
      { name: 'Task 1', description: 'Description 1', completed: false },
      { name: 'Task 2', description: 'Description 2', completed: false },
    ],
  }),

  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1)
    },
    completeTask(index: number) {
      const task = this.tasks[index]
      if (task) {
        if (!task.completed) {
          task.completed = true
        } else {
          task.completed = !task.completed
        }
      }
    },
    updateTask(index: number, task: Task) {
      this.tasks[index] = task
    },
  },
})
