export const state = () => ({
  transfers: []
})

export const getters = {
  transfers(state){
    return state.transfer.slice().reverse()
  },
  transferLength(state){
    return state.transfers.length
  },

  totalTransfer(state){
    return state.transfers.reduce((a, b) => a + b.amount, 0)
  }
}

export const mutations = {
  Set_Transfer(state, payload){
    state.transfers = payload
  }
}


export const actions = {
  async fetchAllTransfer({commit}){
   const response = await this.$axios.$get('/transfers')
   commit('Set_Transfer', response)
  },

  async deleteTransfer(context, id){
    await this.$axios.delete(`/transfers/${id}`)
  },

  async updateTransfer(context, transfer){
    await this.$axios.$put(`/transfers/${transfer.id}/`, transfer)
  },

  async creteNewTransfer(context, newForm){
    await this.$axios.$post('/create_transfer/', newForm)
  }
}