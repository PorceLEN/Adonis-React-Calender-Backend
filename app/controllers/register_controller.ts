import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '../../validators/register_validator.js'

export default class RegisterController {
  public async handleRegister({ request, response }: HttpContext) {
    try {
      const { pseudo, email, password } = await request.validateUsing(registerUserValidator)

      const user = await User.create({
        pseudo,
        email,
        password,
      })

      const jsonResponse = response.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
        },
      })

      console.log(jsonResponse)

      return jsonResponse
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
      })
    }
  }
}
