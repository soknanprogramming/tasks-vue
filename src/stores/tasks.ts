import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'

interface TasksState {
  tasks: Array<Task>
}

const defaultTasks: Array<Task> = [
  { name: 'Task 1', description: 'Description 1', completed: false },
  { name: 'Task 2', description: 'Description 2', completed: false },
]

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || JSON.stringify(defaultTasks)),
  }),

  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
      this.save()
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1)
      this.save()
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
      this.save()
    },
    updateTask(index: number, task: Task) {
      this.tasks[index] = task
      this.save()
    },

    save() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
  },
})
