const checkEmail = (req, res, next) => {
    const { email } = req.body;

    const validateEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const nullEmail = 'O campo "email" é obrigatório';
    const wrongFormat = 'O "email" deve ter o formato "email@email.com"';
    
    if (!email || email.length === 0) return res.status(400).send({ message: nullEmail });
    if (!validateEmail.test(email)) return res.status(400).send({ message: wrongFormat });

    next();
};

const checkPass = (req, res, next) => {
    const { password } = req.body;

    const nullPass = 'O campo "password" é obrigatório';
    const wrongPassLength = 'O "password" deve ter pelo menos 6 caracteres';

    if (!password || password.length === 0) return res.status(400).send({ message: nullPass });
    if (password.length < 6) return res.status(400).send({ message: wrongPassLength });

    next();
};

module.exports = {
    checkEmail,
    checkPass,
};
