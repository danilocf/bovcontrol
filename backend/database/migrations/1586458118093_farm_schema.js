'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FarmSchema extends Schema {
  up () {
    this.create('farms', (table) => {
      table.increments()
      // TODO: .unique()
      table.string('name', 240).notNullable()
      table.string('owner', 240).notNullable()
      table.string('address', 240).notNullable()
      table.string('lat', 240).notNullable()
      table.string('long', 240).notNullable()
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('farms')
  }
}

module.exports = FarmSchema
