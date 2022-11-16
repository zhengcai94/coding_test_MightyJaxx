import { unAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resoureceUser) => {
    if(requestUser.userId === resoureceUser.toString()) return

    throw new unAuthenticatedError('Not Authorized to access this route');
}

export default checkPermissions;