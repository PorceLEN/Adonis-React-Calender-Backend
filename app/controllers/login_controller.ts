import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator } from '../../validators/login_validator.js'

export default class LoginController {
  public async handleLogin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginUserValidator)

      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      console.log(user);
      
      ///////
    } catch (err) {
      console.error('Erreurs détectées :', err)
    }
  }
}

//////////////??