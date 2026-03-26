import { eq } from "drizzle-orm"
import { registerUser, throwIfUserExist } from "~~/server/utils/registerUtils"
import jwt from "jsonwebtoken" 

export default defineEventHandler(async(event) =>{
    const { name, email, password } = await readBody(event)
    
    if(!name || !email || !password){
        throw createError({statusCode:400, statusMessage: "Falten camps per introduir"})
    }

    await throwIfUserExist(email)

    const newUser = await registerUser(name, email, password)

    const { password: repassword, ...userWithoutPassword } = newUser

    await setUserSession(event, {
        user: userWithoutPassword
    })

    const secretKey = 'mi_clave_secreta_super_segura'; 
    const token = jwt.sign(
        { 
            id: newUser.id,      
            email: newUser.email 
        }, 
        secretKey, 
        { expiresIn: '7d' } 
    );

    return {
        user: userWithoutPassword,
        token: token 
    }
})