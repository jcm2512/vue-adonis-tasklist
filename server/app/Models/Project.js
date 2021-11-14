'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    // Project belongs to a user
    user() {
        return this.belongsTo('App/Models/User')
    }
    // Project has many tasks
    tasks () {
        return this.hasMany('App/Models/Task')
      }
}

module.exports = Project
