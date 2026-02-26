
import { pokemons } from '../db/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const db = useDb()
  const userId = Number(session.user.id)


if (event.method === 'GET') {
  const query = getQuery(event)
  
  if (query.id) {
    const result = await db
      .select()
      .from(pokemons)
      .where(and(eq(pokemons.id, Number(query.id)), eq(pokemons.userId, userId)))
    if (!result.length) throw createError({ statusCode: 404, message: 'No trobat' })
    return result[0]
  }

  return await db
    .select()
    .from(pokemons)
    .where(eq(pokemons.userId, userId))
}



  if (event.method === 'POST') {
    const body = await readBody(event)
    const created = await db
      .insert(pokemons)
      .values({ ...body, userId })
      .returning()
    return created[0]
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    const { id, ...fields } = body
    const updated = await db
      .update(pokemons)
      .set(fields)
      .where(and(eq(pokemons.id, Number(id)), eq(pokemons.userId, userId)))
      .returning()
    if (!updated.length) throw createError({ statusCode: 404, message: 'No trobat o no autoritzat' })
    return updated[0]
  }


  if (event.method === 'DELETE') {
    const body = await readBody(event)
    const query = getQuery(event)
    await db
      .delete(pokemons)
      .where(and(eq(pokemons.id, Number(body.id)), eq(pokemons.userId, userId)))
    return { success: true }
  }
})