import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { resolve } from 'node:path'

interface DatabaseSchema {
  users: {
    email: string
    invite_code: string
    ip_address: string
  }[]
}

const defaultData: DatabaseSchema = {
  users: []
}

const _db = new Low<DatabaseSchema>(new JSONFile(resolve('./database/db.json')), defaultData)

const useDb = () => _db

export default useDb