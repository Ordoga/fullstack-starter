import { httpService } from "./http.service";

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const UserService = {
    login,
    signup,
    logout,
    createMinimalUser,
    getLoggedInUser,
    getEmptyCredentials
}

async function login(credentials){
    const user = await httpService.post('auth/login', credentials)
    if(user){
        saveUserInLocalStorage(user)
        return user
    }
}

async function signup(credentials){
    const user = await httpService.post('auth/signup', credentials)
    if(user){
        saveUserInLocalStorage(user)
        return user
    }
}

async function logout(){
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function save(userToSave) {
    if (userToSave._id) {
        return await httpService.put(`user/${userToSave._id}`, userToSave)
    } else {
        return await httpService.post('user', userToSave)
    }
}

function saveUserInLocalStorage(user){
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedInUser(){
    try{
        const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
        return loggedInUser
    }catch(err){
        console.log('No logged in user')
    }
}

function createMinimalUser(user){
    return {
        id: user.id,
        username: user.username,
        imgUrl: user.imgUrl
    }
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}
