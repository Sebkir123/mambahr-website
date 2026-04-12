'use server'

export async function submitWaitlist(formData: FormData) {
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const size = formData.get('size') as string
  // TODO: save to DB or send to Resend/Loops
  console.log('Access request:', { email, company, size })
  return { success: true }
}
