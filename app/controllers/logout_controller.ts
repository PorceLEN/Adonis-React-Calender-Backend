import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

     return response.status(201).json({
        message: "Utilisateur déconnecté",
      })
  }
}
