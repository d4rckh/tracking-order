module.exports = (req, res, next) => {
    if (req.user.admin) next()
}