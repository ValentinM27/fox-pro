const uuid = require('uuid');
const connection = require('../database/db');

/**
 * Permet de générer un uuid
 * Vérifie que l'identifiant est bien unique
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function generateUuid(req, res, next){
    
    const IDPERSON = uuid.v4();

    const sql = `SELECT IDPERSON FROM PERSON WHERE IDPERSON = "${IDPERSON}"`;

    connection.query(sql, (err, results) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (results === undefined || results.length === 0 || results === null){
            res.locals.IDPERSON = IDPERSON;
            next();
        } 
        else {
            console.log("hey");
            generateUuid();
        } 
    })

}

module.exports = generateUuid;

