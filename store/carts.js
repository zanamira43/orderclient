export const state = () => ({
  cart: [],
})

export const getters = {
  cartLength(state){
    return state.cart.length
  },
  cartAllTotal(state){
    return state.cart.reduce((acc, ca) => acc + ca.total , 0)
  },
  cartRecievedLength(state){
    return state.cart.filter(ca => ca.received).length
  },
  cartTotalByReceived(state){
    return state.cart.filter((cart) => cart.received)
        .reduce((sum, record) => { 
          if(record.rtotal > 0 ){
            return sum + record.rtotal
          } else {
            return sum + record.total 
          }
          
        },0)
  
  
  },

}

export const mutations  = {
  // card mutations
  SET_CART(state, payload){
    const newCart = payload.map(py => {
     
        const cart = {
          "id": py.id,
          "name": py.name,
          "quantity": py.quantity,
          "rquantity": py.rquantity,
          "price": py.price,
          "total": py.quantity * py.price,
          "rtotal": py.rquantity * py.price,
          "image": py.image,
          "slug": py.slug,
          "updated": py.updated,
          "received": py.received
        }
        return cart

    })
    state.cart = newCart
  }
}



export const actions = {
  // order actions
  async getAllCarts({commit}){
    let response = await this.$axios.$get("/orders/list")
    commit('SET_CART', response.items.filter(item => item.accepted)) 
  },

  // add to cart
  async addItemtoCart(context, item){
    item.accepted = true
    await this.$axios.put(`/orders/accepted/${item.slug}`, item)
  },
  async removeFromCard(context, cart){
    cart.accepted = false
    await this.$axios.put(`/orders/accepted/${cart.slug}`, cart)
  },


  // cart received 
  async changeCartReceived({commit}, cart){
    if(cart.received){
      cart.received = true
      await this.$axios.put(`/orders/received/${cart.slug}`, cart)
    }else{
      cart.received = false
      await this.$axios.put(`/orders/received/${cart.slug}`, cart)
    }
  },
  
  // update cart recieved quantity
  async updateCartQuantity({commit}, cart){
    await this.$axios.put(`/orders/detail/${cart.slug}/`, cart)
  }
}