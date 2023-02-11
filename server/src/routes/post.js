import express from 'express'
import * as postController from '../controllers/post'
import verifyToken, { isAdmin } from '../middleware/verifyToken'

const router = express.Router();

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)

router.use(verifyToken)
router.post('/create-new', postController.createNewPost)
router.get('/limit-admin', postController.getPostsLimitAdmin)
router.put('/update', postController.updatePost)
router.delete('/delete', postController.deletePost)
router.post('/post-like', postController.createPostLike)
router.delete('/delete-like', postController.deletePostLike)
router.get('/get-like', postController.getPostLike)





router.use(isAdmin)
router.delete('/admin', postController.deletePostAdmin)
router.get('/admin', postController.getPostsLimit)
router.put('/admin', postController.updatePostAdmin)


export default router