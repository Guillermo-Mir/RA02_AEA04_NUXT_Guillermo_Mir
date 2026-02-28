# Projecte Nuxt + Vue

## Arquitectura del projecte

Aquest projecte està compost per dues parts integrades en un mateix framework:

1. **Backend (Nuxt Server + Drizzle ORM)** - Gestiona la lògica de l’aplicació i proveeix una API REST a les carpetes `server/api/` i `server/routes/`.  
   - Emmagatzema les dades en una base de dades local **SQLite**.  
   - Gestiona sessions de forma segura mitjançant **`useUserSession`** (amb cookies encriptades), suportant tant credencials locals com GitHub OAuth.

2. **Frontend (Vue.js integrat a Nuxt)** - És una aplicació que consumeix l’API interna del backend.  
   - Mostra llistats de Pokemons, formularis de registre i login, i pàgines protegides d'administració.  
   - Les rutes protegides comproven la sessió de l’usuari mitjançant un **middleware (`auth.ts`)** per validar l'accés.

---

## Endpoints del backend

| Endpoint          | Mètode | Descripció |
|-------------------|--------|------------|
| `/auth/login`     | POST   | Autentica un usuari i genera la sessió. |
| `/auth/register`  | POST   | Registra un usuari nou i el desa a la base de dades SQLite. |
| `/auth/github`    | GET    | Autentica un usuari a través de GitHub OAuth. |
| `/api/pokemons`   | GET    | Retorna el llistat de Pokemons de l'usuari autenticat. |
| `/api/pokemons`   | POST   | Crea un nou Pokemon vinculat a l'ID de l'usuari actual. |
| `/api/pokemons/:id`| PUT    | Modifica les dades d'un Pokemon existent pel seu ID. |
| `/api/pokemons/:id`| DELETE | Elimina un Pokemon pel seu ID. |

---

## Flux d’autenticació

1. **Registre** L’usuari envia el formulari de registre a `/auth/register`. El backend encripta la contrasenya, crea un nou usuari i el desa a la base de dades SQLite.

2. **Login** L’usuari envia el formulari de login a `/auth/login` amb el seu email i contrasenya (o fa servir GitHub OAuth).  
   - Si les credencials són correctes, el backend inicialitza la sessió amb `useUserSession` i envia una cookie segura.  
   - Si són incorrectes, el backend retorna un error 401.

3. **Accés a rutes protegides** Quan l’usuari intenta accedir a una ruta protegida (com `/createPokemon` o `/admin`), el middleware `auth.ts` comprova l'estat de la sessió.  
   - Si la sessió és vàlida, l'usuari pot accedir a la pàgina i a les seves dades.  
   - Si no és vàlid, el frontend redirigeix automàticament l’usuari a la pàgina de login.

4. **Logout** Quan l’usuari fa logout, es destrueix la sessió de `useUserSession`. El backend esborra la cookie de sessió i el frontend redirigeix l’usuari a la pàgina de login.

---

## Posada en marxa

1. Instal·la les dependències amb `npm install`.
2. Crea un fitxer `.env` amb les variables necessàries (ex: `NUXT_SESSION_PASSWORD`, credencials de GitHub).
3. Configura la base de dades executant `npx drizzle-kit push`.
4. Arrenca el projecte amb `npm run dev`.
