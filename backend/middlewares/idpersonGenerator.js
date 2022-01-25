const { getByCurrentUser } = require('../controllers/enterprise');
const connection = require('../database/db');

/**
 * Permet de générer un string identifiant l'utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function generateIdPerson(req, res, next) {
    const ID_PERSON_ = req.body.LASTNAME_P + '.' + req.body.FIRSTNAME_P + '.' + (Math.round((Math.random() * 4000))).toString();

    const sql = `SELECT ID_PERSON_ FROM PERSON WHERE ID_PERSON_ = "${ID_PERSON_}"`; 

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (result === undefined || result.length === 0 || result === null){
            res.locals.ID_PERSON_ = ID_PERSON_;
            next();
        }

        else generateIdPerson();
    })
}

module.exports = generateIdPerson;