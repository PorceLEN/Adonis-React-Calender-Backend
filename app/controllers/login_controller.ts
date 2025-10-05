import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator } from '../../validators/login_validator.js'

export default class LoginController {
  public async handleLogin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginUserValidator)

      const user = await User.verifyCredentials(email.toLowerCase(), password)

      await auth.use('web').login(user)

      const jsonResponse = {
        message: 'Connexion réussie',
        user: {
          pseudo: user.pseudo,
          email: user.email,
        },
      }

      console.log(
        `| ${jsonResponse.message} ! | Bienvenue ${JSON.stringify(jsonResponse.user.pseudo, null, 2)} ! |`
      )

      return response.status(200).json(jsonResponse.user.pseudo)
    } catch (error) {
      const errorResponse = {
        message: 'Identifiants invalides',
        error: error.message,
      }

      console.error('Erreur login :', JSON.stringify(errorResponse, null, 2))
      return response.status(400).json(errorResponse)
    }
  }
}
