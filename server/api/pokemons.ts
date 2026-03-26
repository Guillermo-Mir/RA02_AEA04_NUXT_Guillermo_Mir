import { pokemons } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  // --- 1. VALIDACIÓN DEL TOKEN JWT ---
  const authHeader = getRequestHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'No autoritzat: Falta el token' 
    })
  }

  const token = authHeader.split(' ')[1]
  const secretKey = 'mi_clave_secreta_super_segura' 
  let userId: number;

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, secretKey) as any
    
    // DEBUG: Revisa la consola de Nuxt para ver si 'id' existe aquí
    console.log('--- TOKEN DECODIFICADO ---', decoded)

    // Intentamos obtener el ID y forzamos que sea un número
    // Si en tu login guardaste 'user.id', aquí debe ser 'decoded.id'
    userId = parseInt(decoded.id || decoded.userId || decoded.sub)

    // Si el ID no es un número válido, lanzamos error antes de tocar la DB
    if (isNaN(userId)) {
      throw new Error('ID d\'usuari no trobat al token')
    }
    
  } catch (error) {
    console.error('Error validando JWT:', error)
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Token invàlid o ID d\'usuari inexistent' 
    })
  }

  // --- 2. CONFIGURACIÓN DE DB Y QUERY ---
  const db = useDb()
  const query = getQuery(event)
  
  // Validamos el ID del Pokémon de la URL si existe
  const rawTargetId = query.id ? Number(query.id) : null
  const targetId = (rawTargetId !== null && !isNaN(rawTargetId)) ? rawTargetId : null

  // --- MÉTODO GET ---
  if (event.method === 'GET') {
    if (targetId) {
      const result = await db
        .select()
        .from(pokemons)
        .where(and(eq(pokemons.id, targetId), eq(pokemons.userId, userId)))
      
      if (!result.length) throw createError({ statusCode: 404, message: 'Pokémon no trobat' })
      return result[0]
    }

    // Retornar solo los pokemons del usuario logueado
    return await db
      .select()
      .from(pokemons)
      .where(eq(pokemons.userId, userId))
  }

  // --- MÉTODO POST ---
  if (event.method === 'POST') {
    const body = await readBody(event)
    const created = await db
      .insert(pokemons)
      .values({ 
        name: body.name,
        type: body.type,
        generation: body.generation,
        userId: userId 
      })
      .returning()
    return created[0]
  }

  // --- MÉTODO PUT ---
  if (event.method === 'PUT') {
    const body = await readBody(event)
    const idToUpdate = targetId || Number(body.id)
    
    if (!idToUpdate || isNaN(idToUpdate)) {
      throw createError({ statusCode: 400, message: 'ID de Pokémon necessari' })
    }

    const updated = await db
      .update(pokemons)
      .set({ 
        name: body.name,
        type: body.type,
        generation: body.generation,
      })
      .where(and(eq(pokemons.id, idToUpdate), eq(pokemons.userId, userId)))
      .returning()
      
    if (!updated.length) throw createError({ statusCode: 404, message: 'No trobat o no autoritzat' })
    return updated[0]
  }

  // --- MÉTODO DELETE ---
  if (event.method === 'DELETE') {
    if (!targetId) throw createError({ statusCode: 400, message: 'Falta el ID a la URL' })

    const deleted = await db
      .delete(pokemons)
      .where(and(eq(pokemons.id, targetId), eq(pokemons.userId, userId)))
      .returning()

    if (!deleted.length) throw createError({ statusCode: 404, message: 'Pokémon no trobat' })
    return { success: true }
  }
})