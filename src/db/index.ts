import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool, { schema })

export const adapter = new DrizzlePostgreSQLAdapter(
	db,
	schema.sessionTable,
	schema.userTable
)
