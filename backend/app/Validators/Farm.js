'use strict'

class Farm {
  get validateAll() {
    return true
  }
  
  get rules () {
    return {
      name: 'required|max:240',
      owner: 'required|max:240',
      address: 'required|max:240',
      lat: 'required|max:240',
      long: 'required|max:240'
    }
  }
  
  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = Farm
