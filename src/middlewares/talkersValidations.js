const checkName = (req, res, next) => {
    const { name } = req.body;

    const nullName = 'O campo "name" é obrigatório';
    const shortName = 'O "name" deve ter pelo menos 3 caracteres';
    
    if (!name || name.length === 0) return res.status(400).send({ message: nullName });
    if (name.length < 3) return res.status(400).send({ message: shortName });

    next();
};

const checkAge = (req, res, next) => {
    const { age } = req.body;

    const nullAge = 'O campo "age" é obrigatório';
    const minAge = 'A pessoa palestrante deve ser maior de idade';
    
    if (!age || age.length === 0) return res.status(400).send({ message: nullAge });
    if (Number(age) < 18) return res.status(400).send({ message: minAge });

    next();
};

const checkTalk = (req, res, next) => {
    const { talk } = req.body;

    const nullTalk = 'O campo "talk" é obrigatório';
   
    if (!talk) return res.status(400).send({ message: nullTalk });

    next();
};

const checkWatched = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    
    const validateDate = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    const nullWatched = 'O campo "watchedAt" é obrigatório';
    const wrongFormat = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'; 

    if (!watchedAt) return res.status(400).send({ message: nullWatched });
    if (!validateDate.test(watchedAt)) return res.status(400).send({ message: wrongFormat });

    next();
};

const checkRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    const nullRate = 'O campo "rate" é obrigatório';
    const minMaxValue = 'O campo "rate" deve ser um inteiro de 1 à 5'; 
    
    if (Number(rate) < 1 || Number(rate) > 5) return res.status(400).send({ message: minMaxValue });
    if (!rate || rate.length === 0) return res.status(400).send({ message: nullRate });
    
    next();
};

module.exports = {
    checkName,
    checkAge,
    checkTalk,
    checkWatched,
    checkRate,
};