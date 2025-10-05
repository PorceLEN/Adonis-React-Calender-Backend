import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async authConnexion({ auth, response }: HttpContext) {
    try {
      await auth.use("web").check()

      const user = auth.use("web").user

      if (!user) {
        return response.json({ loggedIn: false, user: null })
      }

      return response.json({
        loggedIn: true,
        user: {
          email: user.email,
          pseudo: user.pseudo,
        },
      })
    } catch (error) {
      return response.json({
        loggedIn: false,
        user: null,
      })
    }
  }
}
