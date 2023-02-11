import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization
    // console.log(accessToken)
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken.split(' ')[1], process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired'
        })

        req.user = user
        next()
    })
}

export const isAdmin = (req, res, next) => {
    const { roleCode } = req.user
    if (roleCode !== 'R1') return res.status(401).json({
        err: 1,
        msg: 'Require admin role'
    })
    next()
}

export default verifyToken