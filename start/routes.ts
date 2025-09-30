/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller';
import LoginController from '#controllers/login_controller';
import LogoutController from '#controllers/logout_controller';
import RegisterController from '#controllers/register_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// post

router.post("/login", [LoginController, "handleLogin"]).use(middleware.guest())
router.post("/register", [RegisterController, "handleRegister"]).use(middleware.guest())

// delete

router.delete("/logout", [LogoutController, "logout"]).use(middleware.auth())

// get

router.get("/me", [AuthController, "authConnexion"]).use(middleware.auth())