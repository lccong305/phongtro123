import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        let response = await postService.getPosts()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail get all posts controller' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { priceNumber, areaNumber, ...query } = req.query
    // console.log(query);
    try {
        let response = await postService.getPostsLimitService(query, { priceNumber, areaNumber })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail get all posts controller' + error
        })
    }
}
export const getPostsLimitAd = async (req, res) => {
    const { priceNumber, areaNumber, ...query } = req.query
    // console.log(query);
    try {
        let response = await postService.getPosts(query, { priceNumber, areaNumber })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail get all posts controller' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        let response = await postService.getNewPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail get new posts controller' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { categoryCode, title, priceNumber, areaNumber, label, area } = req.body
        const { id } = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label || !area) {
            return res.status(400).json({
                err: -1,
                msg: 'Missing inputs create new  posts controller' + error
            })
        }
        let response = await postService.createNewPostsService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail get new posts controller' + error
        })
    }
}

export const getPostsLimitAdmin =  async(req, res) => {
    const { page,...query } = req.query
    const { id } = req.user
    // console.log(query);
    try {
        if (!id) return res.status(400).json({ 
            err: 1,
            msg: 'Missing id from post controller getpostlitmitadmin'
        })
        let response = await postService.getPostsLimitAdminService(page, query, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail get all posts controller' + error
        })
    }
}

export const updatePost =  async(req, res) => {
    const { postId,overviewId, attributeId, imageId ,... payload} = req.body
    const { id } = req.user
    try {
        if (!postId || !id || !imageId || !overviewId || !attributeId) return res.status(400).json({ 
            err: 1,
            msg: 'Missing postid from post controller update post'
        })
        let response = await postService.updatePost(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail update posts controller' + error
        })
    }
}

export const deletePost =  async(req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id ) return res.status(400).json({ 
            err: 1,
            msg: 'Missing postid or idUser from post controller delete post'
        })
        let response = await postService.deletePost(postId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail update posts controller' + error

        })
    }
}
export const deletePostAdmin = async (req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.deletePostAdmin(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}
export const updatePostAdmin = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.updatePostAdmin(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}


export const createPostLike =  async(req, res) => {
    const {postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id) return res.status(400).json({ 
            err: 1,
            msg: 'Missing post id or idUser from post controller create postlike'
        })
        let response = await postService.createPostLike(id, postId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail update posts controller' + error

        })
    }
}

export const deletePostLike =  async(req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id ) return res.status(400).json({ 
            err: 1,
            msg: 'Missing postid or idUser from post controller delete postlike'
        })
        let response = await postService.deletePostLike(id, postId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail update posts controller' + error

        })
    }
}

export const getPostLike =  async(req, res) => {
    const { id } = req.user
    try {
        if (!id ) return res.status(400).json({ 
            err: 1,
            msg: 'Missing  idUser from post controller get postlike'
        })
        let response = await postService.getPostLike(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ 
            err: -1,
            msg: 'fail update posts controller' + error

        })
    }
}