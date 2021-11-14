
class AuthorizationService {
    verifyPermission (resource, user) {
        if(resource.user_id !== user.id){
            throw new Error(); // todo: invalid access exception
        }
    }
}

module.exports = new AuthorizationService();