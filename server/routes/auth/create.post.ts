import {eq} from "drizzle-orm"
import { createPokemon, throwIfUserExist } from "~~/server/utils/createPokemonUtils"

export default defineEventHandler(async(event) =>{
    //1. Accedeixo als camps del formulari

    const {name,type,generation} = await readBody(event)
    
    if(!name || !type || !generation){
        throw createError({statusCode:400, statusMessage: "Falten camps per introduir"})
    }

    await throwIfUserExist(type)

    const newPokemon = await createPokemon(name, type, generation)


    return newPokemon
})