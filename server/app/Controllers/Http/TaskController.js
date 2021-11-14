'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthorizationService = use('App/Services/AuthorizationService')



class TaskController {
    async create({auth, request, params}){
    // grab user from lucid model
        const user = await auth.getUser();
    // grab description from payload 
        const { description } = request.all() 
    // get id from params
        const { id } = params; 
    //fetch project
        const project = await Project.find(id) 
    // verify user has access to project
        AuthorizationService.verifyPermission(project, user) 
    // create new Task from lucid model
        const task = new Task();
        task.fill({
            description,
        })
    // associate task with project
        await project.tasks().save(task)
    //return task back to user
        return task;
    }

    async index({auth, request, params}){
    // grab user from lucid model
        const user = await auth.getUser();
    // get id from params (id = params.id)
        const { id } = params; 
    //fetch project
        const project = await Project.find(id) 
    // verify user has access to project
        AuthorizationService.verifyPermission(project, user) 
    //return all tasks associated with project
        return await project.tasks().fetch();
    }

    async destroy({auth, request, params}){
        const user = await auth.getUser();
        const { id } = params; 
        const task = await Task.find(id)
        const project = await task.project().fetch()
        AuthorizationService.verifyPermission(project, user)
        await task.delete();
        return task;
    }

    async update({auth, request, params}){
        const user = await auth.getUser();
        const { id } = params; 
        const task = await Task.find(id)
        const project = await task.project().fetch()
        AuthorizationService.verifyPermission(project, user)
        task.merge(request.only([
            'description',
            'completed',
        ]))
        await task.save();
        return task;
    }
}

module.exports = TaskController
