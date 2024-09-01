import z from 'zod'
import useDb from '../utils/useDb'
import checkInviteCode from '../utils/checkInviteCode'

const schema = z.object({
  email: z.string().email({ message: 'email.invalid' }),
  inviteCode: z.string({ message: 'inviteCode.error' }).transform((v) => v.toUpperCase()),
  acceptedTermsOfService: z.boolean().refine(v => !!v, { message: 'termsOfService.notAccepted' })
}).required()

const db = useDb()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  // validate schema
  const parsedBody = schema.safeParse(body)

  // validate invite code, and return invite code info
  const inviteCodeInfo = checkInviteCode(parsedBody.data?.inviteCode)

  const isAlreadyRegistered = db.data.users.some(user => parsedBody.data?.email === user.email)

  if(parsedBody.success && inviteCodeInfo && !isAlreadyRegistered) {

    const ip_address = getRequestIP(event)

    const referral_code = `UGC-${parsedBody.data.email.split('@')[1].substring(0, 2)}-0${db.data.users.length + 3492}`.toUpperCase()

    // save info to json
    db.data.users.push({
      email: parsedBody.data.email,
      invite_code: {
        code: parsedBody.data.inviteCode,
        type: inviteCodeInfo.type,
        value: inviteCodeInfo.value
      },
      ip_address: ip_address ?? '',
      referrer: inviteCodeInfo?.referrer,
      referral_code: referral_code
    })

    db.write()

    // send info to discord
    
    const fetchBody = {
      content: `🤝 <us> ${parsedBody.data.email}, ${parsedBody.data.inviteCode}; <ue>`
    }

    await fetch('https://discord.com/api/webhooks/1279456960818970755/Nb8KfEvif4w42-6Wkeo5dt9-i8u-SyMBOsNGwHQijxP3V9PKZ2eaIkQD3YnUWAHiG35W', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody)
    })

    // no way to check if user has already signed up.

    return { success: true, referral_code: referral_code }

  } else if(parsedBody.success && inviteCodeInfo && isAlreadyRegistered) {

    const user = db.data.users.find(user => user.email === parsedBody.data.email)

    return { success: true, referral_code: user?.referral_code ?? '' }

  } else {

    setResponseStatus(event, 500)
    return { success: false, referral_code: null }

  }

})