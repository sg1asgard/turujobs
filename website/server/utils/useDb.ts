import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { resolve } from 'node:path'

interface DatabaseSchema {
  users: {
    email: string
    invite_code: {
      type: 'global' | 'referral'
      code: string
      value: {
        receiver: number
        sender?: number
      }
    }
    ip_address: string
    referrer?: string
    referral_code: string
  }[]
}

const defaultData: DatabaseSchema = {
  users: []
}

const config = useRuntimeConfig()

console.log(resolve(config.dbJsonPath))

const _db = new LowSync<DatabaseSchema>(new JSONFileSync(resolve(config.dbJsonPath)), defaultData)
_db.read()

console.log(_db)

const useDb = () => _db

export default useDb