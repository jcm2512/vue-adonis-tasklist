'use strict'

const Project = use('App/Models/Project')

class ProjectController {
    async index({auth}) {
        const user = await auth.getUser(); // grab user from lucid model
        return await user.projects().fetch()
    }

    async create({auth, request}){
        const user = await auth.getUser(); // grab user from lucid model
        const { title } = request.all() // grab title from payload
        const project = new Project() // create project and fill in title   
        project.fill({
            title,
        })
        await user.projects().save(project) // associate project with user
        return project
    }
}

module.exports = ProjectController
