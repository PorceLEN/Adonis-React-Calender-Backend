/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginController from '#controllers/login_controller';
import RegisterController from '#controllers/register_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// post

router.post("/login", [LoginController, "handleLogin"]);
router.post("/register", [RegisterController, "handleRegister"]);
