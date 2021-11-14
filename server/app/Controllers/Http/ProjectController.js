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

    async destroy({auth, request, params}){
        const user = await auth.getUser();
        const { id } = params; // same as // const id = params.id
        const project = await Project.find(id)
        if (project.user_id !== user.id){
            return response.status(403)
        }
        await project.delete();
        return project;
    }
}

module.exports = ProjectController
