const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException');
const InvalidAccessException = use('App/Exceptions/InvalidAccessException');

class AuthorizationService {
    verifyPermission (resource, user) {
        console.log(resource, user)
        if(resource == null){
            throw new ResourceNotExistException();
        }
        if(resource.user_id !== user.id){
            throw new InvalidAccessException();
        }
    }
}

module.exports = new AuthorizationService();