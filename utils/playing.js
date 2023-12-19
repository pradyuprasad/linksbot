import { createClient } from "@libsql/client/web"; 

const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})



const result = await client.execute(`SELECT * FROM users`)

console.log(result)