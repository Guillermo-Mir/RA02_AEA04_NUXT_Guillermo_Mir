import { pokemons } from '../db/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const db = useDb()
  const userId = Number(session.user.id)
  
  // Extraemos el ID de la URL (?id=X) para todos los métodos
  const query = getQuery(event)
  const targetId = query.id ? Number(query.id) : null

  // --- MÉTODO GET ---
  if (event.method === 'GET') {
    if (targetId) {
      // Obtener un solo Pokémon (para el formulario de edición)
      const result = await db
        .select()
        .from(pokemons)
        .where(and(eq(pokemons.id, targetId), eq(pokemons.userId, userId)))
      
      if (!result.length) throw createError({ statusCode: 404, message: 'No trobat' })
      return result[0]
    }

    // Lista completa (si no hay ID)
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
      .values({ ...body, userId })
      .returning()
    return created[0]
  }

  // --- MÉTODO PUT ---
  if (event.method === 'PUT') {
    const body = await readBody(event)
    // Usamos el targetId de la URL si existe, si no, el del body
    const idToUpdate = targetId || Number(body.id)
    
    const updated = await db
      .update(pokemons)
      .set({ ...body, userId }) // Aseguramos que el userId no cambie
      .where(and(eq(pokemons.id, idToUpdate), eq(pokemons.userId, userId)))
      .returning()
      
    if (!updated.length) throw createError({ statusCode: 404, message: 'No trobat o no autoritzat' })
    return updated[0]
  }

  // --- MÉTODO DELETE ---
  if (event.method === 'DELETE') {
    // Intentamos pillar el ID de la URL (?id=X) primero
    const idToDelete = targetId 
    
    if (!idToDelete) throw createError({ statusCode: 400, message: 'Falta el ID' })

    const deleted = await db
      .delete(pokemons)
      .where(and(eq(pokemons.id, idToDelete), eq(pokemons.userId, userId)))
      .returning()

    if (!deleted.length) throw createError({ statusCode: 404, message: 'No trobat' })
    return { success: true }
  }
})