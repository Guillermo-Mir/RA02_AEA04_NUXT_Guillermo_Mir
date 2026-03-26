import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken" 

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if(!email || !password){
        throw createError({statusCode:400, statusMessage: "Falten camps per introduir"})
    }

    const existingUser = await useDb().query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    if(!existingUser){
        throw createError({statusCode: 400, statusMessage: "Usuari no existeix"})
    }

    if(!existingUser.password){
        throw createError({statusCode: 400, statusMessage: "Invalid password Github"})
    }

    const isValid = await verifyPassword(existingUser.password, password)

    if(!isValid){
        throw createError({statusCode: 400, statusMessage: "Incorrect password"})
    }

    const {password: repassword, ...userWithoutPassword} = existingUser

    await setUserSession(event, {
        user: userWithoutPassword
    })

    const secretKey = 'mi_clave_secreta_super_segura'; 
    
    const token = jwt.sign(
        { 
            id: existingUser.id,      
            email: existingUser.email 
        }, 
        secretKey, 
        { expiresIn: '7d' } 
    );

    return {
        user: userWithoutPassword,
        token: token 
    }
});