import {eq} from "drizzle-orm"

export async function throwIfUserExist(name:string) {
    const existingPokemon = await useDb().query.pokemons.findFirst({
        where: eq(schema.pokemons.name, name)
    })

    if(existingPokemon){
        throw createError({statusCode: 400, statusMessage: "Pokemon existent"})
    }
}

export async function createPokemon(name:string, type:string, generation:number){
    const res = await useDb().insert(schema.pokemons).values({
        name, 
        type, 
        generation
    }).returning()

    const newPokemon = res.at(0);
    if(!newPokemon){
        throw createError({statusCode: 500, statusMessage: "Error al registrar el Pokemon"})
    }

    return newPokemon
}




