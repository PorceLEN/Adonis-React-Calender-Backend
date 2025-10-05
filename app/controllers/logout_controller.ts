import type { HttpContext } from '@adonisjs/core/http'


export default class LogoutController {
  async logout({ response, auth }: HttpContext) {
    try {

      const user = auth.getUserOrFail().pseudo;

      await auth.use('web').logout()

      const jsonResponse = {
        message: 'Utilisateur déconnecté',
      }

      console.log(`Vous vous êtes déconnecté en tant que ${user}`)

      return response.status(200).json(jsonResponse)
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error)

      return response.status(400).json({
        message: 'Erreur lors de la déconnexion',
        error: error.message,
      })
    }
  }
}
