'use strict'

const Project = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService')

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
        AuthorizationService.verifyPermission(project, user)
        await project.delete();
        return project;
    }

    async update({auth, request, params}){
        const user = await auth.getUser();
        const { id } = params; // same as // const id = params.id
        const project = await Project.find(id)
        AuthorizationService.verifyPermission(project, user)
        project.merge(request.only('title'))
        await project.save( )
        return project;
    }
}

module.exports = ProjectController
