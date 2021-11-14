'use strict'

class ProjectController {
    async index({auth}) {
        const user = await auth.getUser();
        return await user.projects().fetch()
    }
}

module.exports = ProjectController
