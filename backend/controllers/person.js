const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_TOKEN_} = require('../ressources/jwtToken.json');const { connect } = require('../database/db');
``

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

/**
 * Permet à un utilisateur de se connecter
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    const {EMAIL, PASSWORD_P} = req.body;

    connection.query(`SELECT IDPERSON, PASSWORD_P FROM PERSON WHERE EMAIL = "${EMAIL}"`, (err, results) => {
        
        if(results.length !== 0){
            bcrypt.compare(PASSWORD_P, results[0].PASSWORD_P)
            .then( valid => {
                if(!valid){
                    res.status(401).json({message : "Mot de passe incorrect"});
                } else {
                    res.status(200).json({
                        message : "Connexion réussie",
                        token : jwt.sign(
                            {IDPERSON : results[0].IDPERSON}, 
                            JWT_SECRET_TOKEN_,
                            {expiresIn : '24h'}
                        )
                    })
                }
            })
        } 
        
        else if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else res.status(404).json({message : "L'utilisateur n'existe pas"})
    })
}

exports.retrieveDate = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;

    const sql = `SELECT LASTNAME_P, FIRSTNAME_P, EMAIL, BIRTHDAY_DATE, GENDER_P FROM PERSON WHERE IDPERSON = "${IDPERSON}"`;

    connection.query(sql, (err, results) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if(results === undefined || results.length === 0) res.status(404).json({message : "Utilisateur inconnu"})

        else res.status(200).json({PERSON : results});
    })
}

/**
 * Permet à l'utilisateur de changer de mot de passe
 * @param {*} req 
 * @param {*} res 
 */
exports.changePassword = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const {PASSWORD_P, validatePASSWORD_P} = req.body;

    if(PASSWORD_P === validatePASSWORD_P){
        bcrypt.hash(PASSWORD_P, 10)
        .then( hash => {
            const sql = `UPDATE PERSON SET PASSWORD_P = "${hash}" WHERE IDPERSON = "${IDPERSON}"`;

            connection.query(sql, (err) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else res.status(200).json({message : "Mot de passe mis à jour"});
            })
        })
        .catch (error => res.status(500).json({message : error}));
    } else res.status(403).json({message : "Veuillez saisir deux fois le même mot de passe"});
}

exports.delete = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;

    const sql = `DELETE FROM PERSON WHERE IDPERSON = "${IDPERSON}"`;

    connection.query(sql, (err) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else res.status(200).json({message : "Utilisateur supprimé"});
    })
}

/**
 * Permet de mettre à jour le mail de l'utilisateur
 * @param {*} req 
 * @param {*} res 
 */
exports.changeEmail = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const {EMAIL, validateEMAIL} = req.body;

    if(EMAIL === validateEMAIL) {
        const sql = `SELECT EMAIL FROM PERSON WHERE EMAIL = '${EMAIL}'`;

        connection.query(sql, (err, result) => {
            if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

            else if(result === undefined || result.length === 0) {
                const sql = `UPDATE PERSON SET EMAIL = '${EMAIL}' WHERE IDPERSON = '${IDPERSON}'`;

                connection.query(sql, (err) => {
                    if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                    else res.status(200).json({message : "Email mis à jour"});
                })
            }
            else res.status(403).json({message : "Ce mail est déjà utilisé"});
        })
    }
}

/**
 * Permet de mettre à jour les données de l'utilisateur 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const {LASTNAME_P, FIRSTNAME_P, GENDER_P, BIRTHDAY_DATE} = req.body;

    const sql = `UPDATE PERSON SET`;

    if(LASTNAME_P !== undefined) {
        connection.query(sql+` LASTNAME_P = "${LASTNAME_P}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour LASTNAME", Erreur : err});
        })
    }

    if(FIRSTNAME_P !== undefined) {
        connection.query(sql+` FIRSTNAME_P = "${FIRSTNAME_P}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour FIRSTNAME", Erreur : err});
        })
    }

    if(GENDER_P !== undefined) {
        connection.query(sql+` GENDER_P = "${GENDER_P}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour GENDER", Erreur : err});
        })
    }

    if(BIRTHDAY_DATE !== undefined) {
        console.log("here")
        connection.query(sql+` BIRTHDAY_DATE = "${BIRTHDAY_DATE}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour BIRTHDA_DATE", Erreur : err});  
        })
    } 
    
    res.status(200).json({message : "Utilisateur mis à jour"});  
}

/**
 * Permet de rechercher des utilisateurs
 * @param {*} req 
 * @param {*} res 
 */
exports.searchUser = (req, res) => {
    const name = req.params.name;

    const _name_Array = name.split(' ');

    const sql = `SELECT LASTNAME_P, FIRSTNAME_P, EMAIL, BIRTHDAY_DATE, GENDER_P
            FROM PERSON
            WHERE LASTNAME_P = "${_name_Array[0]}" OR FIRSTNAME_P = "${_name_Array[1]}"
            OR LASTNAME_P = "${_name_Array[1]}" OR FIRSTNAME_P = "${_name_Array[0]}"`;

    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if(results === undefined || results.length === 0 || results === null) res.status(404).json({message : "Aucunes personnes ne correspond à votre recherche"});

        else res.status(200).json({PERSONS : results});
    })
}