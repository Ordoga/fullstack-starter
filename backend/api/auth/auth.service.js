import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import {userService} from '../user/user.service.js'

const cryptr = new Cryptr(process.env.SECRET || 'Or-Liron')


export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(username, password) {

    
    const user = await userService.getUserByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
        
    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({username, password, fullname}) {
    
    const saltRounds = 10

    if (!username || !password || !fullname) return Promise.reject('Missing required signup information')

    const userExist = await userService.getUserByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    const response = await userService.addUser({ username, password: hash , fullname})
    return response
}

function getLoginToken(user) {
    const userInfo = {_id : user._id, fullname: user.fullname}
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}