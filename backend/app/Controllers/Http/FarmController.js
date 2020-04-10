'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Farm = use('App/Models/Farm')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with farms
 */
class FarmController {
  async index () {
    const farms = await Farm.all()
    return farms
  }
  
  async store ({ request }) {
    const data = request.only([
      'name',
      'owner',
      'address',
      'lat',
      'long'
    ])
    const farm = await Farm.create({ ...data })
    return farm
  }

  async show ({ params }) {
    const farm = await Farm.findOrFail(params.id)
    return farm
  }

  async update ({ params, request }) {
    const data = request.only([
      'name',
      'owner',
      'address',
      'lat',
      'long'
    ])
    const farm = await Farm.findOrFail(params.id)
    farm.merge({ ...data })
    await farm.save()
    return farm
  }
  
  async destroy({ params }) {
    const farm = await Farm.findOrFail(params.id)
    await farm.delete()
  }
  
  async upload({ params, request }) {
    const farm = await Farm.findOrFail(params.id)
    const image = request.file('image')
    const name = `${new Date().getTime()}.${image.subtype}`
    await image.move(Helpers.tmpPath('uploads'), {
      name,
      overwrite: true
    })
    farm.merge({ image: name })
    await farm.save()
    return farm
  }

  async show({ params, response }) {
    const farm = await Farm.findOrFail(params.id)
    return response.download(Helpers.tmpPath(`uploads/${farm.image}`))
  }
}

module.exports = FarmController
