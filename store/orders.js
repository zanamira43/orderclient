export const state = () => ({
  items: [],
})

export const getters = {
  itemLength(state){
    return state.items.length
  }
}

export const mutations  = {
  // order mutations
  SET_ITEMS(state, payload){
    state.items = payload
  },
}

export const actions = {
  // order actions
  async getAllOrdres({commit}){
    let response = await this.$axios.$get("/orders/list")
    commit('SET_ITEMS', response.items)
    
    // commit('SET_ITEMS', response.items.filter(item => {
    //   if(item.accepted == false){
    //     return item
    //   }else{
    //     return null
    //   }
    // }))
  },

  async uploadOrderImage({commit}, formdata, config){
    await this.$axios.$post('/orders/image-upload/', formdata, config)
  },

  async updateOrderAction({commit},item){
    const newItem = {
      'name': item.name,
      'quantity': item.quantity,
      'price': item.price,
      'description': item.description
    }
   await this.$axios.put(`/orders/detail/${item.id}/`, newItem)
   
  },

  async deleteOrder({commit}, id){
    await this.$axios.delete(`/orders/detail/${id}`)
  },
}