import {eq} from "drizzle-orm"
import { registerUser, throwIfUserExist } from "~~/server/utils/registerUtils"

export default defineEventHandler(async(event) =>{
    //1. Accedeixo als camps del formulari

    const {name,email,password} = await readBody(event)
    
    if(!name || !email || !password){
        throw createError({statusCode:400, statusMessage: "Falten camps per introduir"})
    }

    await throwIfUserExist(email)

    const newUser = await registerUser(name, email, password)

    const {password: repassword, ...userWhithoutPassword} = newUser

    await setUserSession(event, {
        user: userWhithoutPassword
    })

    return userWhithoutPassword
})