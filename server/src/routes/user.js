import express from 'express'
import verifyToken, { isAdmin } from '../middleware/verifyToken'
import * as controllers from '../controllers/user'

const router = express.Router();


router.get('/get-user', controllers.getUserByPhone)
router.put('/create-passwood', controllers.createPasswoodUser)

router.use(verifyToken)
router.get('/get-current', controllers.getCurrent)
router.put('/update', controllers.updateUser)
router.put('/update-passwood', controllers.updatePasswoodUser)



router.use(isAdmin)
router.get('/', controllers.getUsers)
router.put('/', controllers.updateUserAdmin)
router.delete('/', controllers.deleteUser)



export default router