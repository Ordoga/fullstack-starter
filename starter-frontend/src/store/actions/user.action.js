// import { ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/station.reducer";
import { store } from "../store";
import { UserService } from "../../services/user.service";
import { SET_USER } from "../reducers/user.reducer"

// Authentication Actions

export async function login(cretentials = {}){
    try{
        const userInSessionStorage = UserService.getLoggedInUser()
        if(userInSessionStorage){
          store.dispatch({type:SET_USER, user : userInSessionStorage})
          return userInSessionStorage
        }else{
          const loggedInUser = await UserService.login(cretentials)
          if(loggedInUser){
            store.dispatch({type:SET_USER, user : loggedInUser})
            return loggedInUser
          }
        }
    }catch(err){
        console.log('No logged in user')
    }
}

export async function signup(credentials = {}){
  const newUser = await UserService.signup(credentials)
  store.dispatch({type:SET_USER, user : newUser})
}

export async function logout(){
  await UserService.logout()
  store.dispatch({type:SET_USER, user: null})
}