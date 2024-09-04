import { useDb } from "#imports"

interface GlobalCode {
  code: Uppercase<string>
  value: {
    receiver: number
  }
}

interface AffiliateCode {
  value: {
    receiver: number
    sender: number
  }
}

interface Codes {
  global: GlobalCode[],
  affiliate: AffiliateCode
}

const codes: Codes = {
  global: [
    {
      code: 'LINKEDIN280',
      value: {
        receiver: 280
      }
    }
  ],
  affiliate: {
    value: {
      receiver: 140,
      sender: 60
    }
  }
}

interface CheckInviteCodeReturn {
  type: 'global' | 'referral'
  referrer?: string
  value: {
    receiver: number
    sender?: number
  }
}

export default function checkInviteCode(inviteCode?: string): CheckInviteCodeReturn | null {

  if(!inviteCode) return null

  const db = useDb()

  // check if it's a global code
  for(const c of codes.global) {

    // check next global if code doesnt match
    if(c.code !== inviteCode) continue


    // handle code, and directly return from function

    return {
      type: 'global',
      value: {
        receiver: c.value.receiver
      }
    }

  }

  // check affiliate codes
  for(const u of db.data.users) {

    // invite code matches referral code of a user
    if(u.referral_code !== inviteCode) continue

    return {
      type: 'referral',
      referrer: u.email,
      value: codes.affiliate.value
    }

  }

  return null

}