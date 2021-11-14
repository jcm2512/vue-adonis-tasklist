'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotExistException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({
      error: "Resource does not exist"
    })
  }
}

module.exports = ResourceNotExistException
