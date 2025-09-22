import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    pseudo: vine
      .string()
      .trim()
      .minLength(4)
      .alphaNumeric()
      .regex(/^[a-zA-Z0-9_]{3,20}$/)
      .unique(async (db, value) => {
        const users = await db.from('users').where('pseudo', value).first()
        return !users
      }),
    email: vine
      .string()
      .toLowerCase()
      .email()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .unique(async (db, value) => {
        const users = await db.from('users').where('email', value).first()
        return !users
      }),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .confirmed({ confirmationField: "confirmPassword" }),
      confirmPassword: vine.string()
  })
)

// Régler le soucis du validator