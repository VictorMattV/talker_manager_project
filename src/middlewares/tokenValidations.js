const checkToken = (req, res, next) => {
    const { authorization } = req.headers;

    const tokenNotFound = 'Token não encontrado';
    const invalidToken = 'Token inválido';

    if (!authorization) return res.status(401).send({ message: tokenNotFound });
    if (authorization.length !== 16) return res.status(401).send({ message: invalidToken });

    next();
};

module.exports = {
   checkToken,
};