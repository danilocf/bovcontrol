'use strict'

class FarmImage {
  get validateAll() {
    return true
  }
  
  get rules () {
    return {
      image: 'file|file_ext:png,jpg|file_size:2mb|file_types:image'
    }
  }
  
  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = FarmImage
