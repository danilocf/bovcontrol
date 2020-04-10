'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .resource('farms', 'FarmController')
  .apiOnly()
  .validator(new Map([
    [['farms.store'], ['Farm']]
  ]))

Route
  .post('/farms/:id/image', 'FarmController.upload')
  .validator('FarmImage')

Route.get('/farms/:id/image', 'FarmController.show')
