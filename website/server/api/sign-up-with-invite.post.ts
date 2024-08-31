import z from 'zod'

const code = 'SUPERCODE20'

const schema = z.object({
  email: z.string().email({ message: 'email.invalid' }),
  inviteCode: z.string().transform((v) => v.toUpperCase()).refine(v => v === code, { message: 'code.invalid' }),
  acceptedTermsOfService: z.boolean().refine(v => !!v, { message: 'termsOfService.notAccepted' })
}).required()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const parsedBody = schema.safeParse(body)

  if(parsedBody.success) {

    // send info to discord
    
    const fetchBody = {
      content: `${parsedBody.data.email}, ${parsedBody.data.inviteCode};`
    }

    await fetch('https://discord.com/api/webhooks/1279456960818970755/Nb8KfEvif4w42-6Wkeo5dt9-i8u-SyMBOsNGwHQijxP3V9PKZ2eaIkQD3YnUWAHiG35W', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody)
    })

    // no way to check if user has already signed up.

    return { success: true }

  } else {

    return { success: false }

  }


})