import { defineStore } from 'pinia'
export const useModalStore = defineStore('modal', {
  state: () => ({ isopen: false, ishovered: false }),
  actions: {
    toggle() {
      this.isopen = !this.isopen
      //console.log(this.isopen)
    },
    MouseOverHandler() {
      this.ishovered = !this.ishovered
      console.log('mousover event')
    },
    MouseOutHandler() {
      this.ishovered = !this.ishovered
      console.log('mousout event')
    },
    falseassigner() {
      this.isopen = false
    }
  },
  getters: {
    hiddenClass(state) {
      return !state.isopen ? 'hidden' : ''
    }
  }
})
