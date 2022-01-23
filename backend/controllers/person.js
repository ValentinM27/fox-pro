const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_TOKEN_} = require('../ressources/jwtToken.json');``

/**
 * Permet de tester le controleur 
 * @param {*} req 
 * @param {*} res 
 */
exports.test = (req, res) => {
    res.status(200).json({message : "personCtrl is working"});
}

/**
 * Permet de créer un compte
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
    const {LASTNAME_P, FIRSTNAME_P, BIRTHDAY_DATE, GENDER_P, EMAIL, PASSWORD_P, validatePASSWORD_P} = req.body;

    connection.query(`SELECT IDPERSON FROM PERSON WHERE EMAIL = "${EMAIL}"`, function(err, results){
        
        if(results.length === 0){
            // Test de correspondance des deux champs de mot de passe
            if(PASSWORD_P === validatePASSWORD_P){
                // Récupération UUID
                const IDPERSON = res.locals.IDPERSON;
                // Hash du mot du passe
                bcrypt.hash(PASSWORD_P, 10)
                .then(hash => {
                    const sql = (`INSERT INTO PERSON (IDPERSON,LASTNAME_P, FIRSTNAME_P, BIRTHDAY_DATE, GENDER_P, EMAIL, PASSWORD_P) 
                    VALUE ("${IDPERSON}", "${LASTNAME_P}", "${FIRSTNAME_P}", "${BIRTHDAY_DATE}", "${GENDER_P}", "${EMAIL}", "${hash}")`);

                    connection.query(sql, function(err) {
                        if(err) res.status(200).json({message : "Erreur serveur", Erreur : err});

                        else {
                            res.status(200).json({message : "Utilisateur crée"});
                        }
                    })
                }) .catch(error => res.status(500).json({Erreur : error}))
               
            } else res.status(403).json({message : "Veuillez saisir deux fois le même mot de passe"});
            
        }

        else if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else res.status(403).json({message : "Ce mail est déjà utilisé"});
    })
}