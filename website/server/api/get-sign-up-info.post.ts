import z from 'zod'
import useDb from '../utils/useDb'
import checkInviteCode from '../utils/checkInviteCode'

const db = useDb()

const schema = z.object({
  email: z.string().email({ message: 'email.invalid' }),
  inviteCode: z.string({ message: 'inviteCode.error' }).transform((v) => v.toUpperCase())
}).required()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  // no reason bullshit wait time
  await new Promise((res) => setTimeout(res, 100 + (Math.random() * 200) ))

  // validate schema
  const parsedBody = schema.safeParse(body)

  // validate invite code, and return invite code info
  const inviteCodeInfo = checkInviteCode(parsedBody.data?.inviteCode)

  const isSemiAuthenticated = db.data.users.some(user => parsedBody.data?.email === user.email && parsedBody.data?.inviteCode === user.invite_code.code)

  if(parsedBody.success && inviteCodeInfo && isSemiAuthenticated) {

    // get total credits
    const initialCredits = db.data.users.find(user => parsedBody.data?.email === user.email && parsedBody.data?.inviteCode)?.invite_code.value.receiver ?? 0
    const credits = db.data.users
      .filter(user => user.referrer === parsedBody.data.email)
      .reduce((acc, user) => {
        
        return acc + (user.invite_code.value?.sender ?? 0)

      }, initialCredits)

    // send info to discord
    
    const fetchBody = {
      content: `👀 <ms> ${parsedBody.data.email}, ${parsedBody.data.inviteCode}; has logged back into check on their account <me>`
    }

    await fetch('https://discord.com/api/webhooks/1279456960818970755/Nb8KfEvif4w42-6Wkeo5dt9-i8u-SyMBOsNGwHQijxP3V9PKZ2eaIkQD3YnUWAHiG35W', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody)
    })

    // no way to check if user has already signed up.

    return { credits: credits, success: true }

  } else {

    setResponseStatus(event, 500)
    return { credits: null, success: false }

  }

})