const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_TOKEN_} = require('../ressources/jwtToken.json');const { connect } = require('../database/db');
const transporter = require('../packages/mail.js')

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
    const {LASTNAME_P, FIRSTNAME_P, EMAIL, PASSWORD_P, validatePASSWORD_P} = req.body;

    connection.query(`SELECT IDPERSON FROM PERSON WHERE EMAIL = "${EMAIL}"`, function(err, results){
        
        if(results.length === 0){
            // Test de correspondance des deux champs de mot de passe
            if(PASSWORD_P === validatePASSWORD_P){
                // Récupération UUID et ID_PERSON_
                const IDPERSON = res.locals.IDPERSON;
                const ID_PERSON_ = res.locals.ID_PERSON_;

                // Hash du mot du passe
                bcrypt.hash(PASSWORD_P, 10)
                .then(hash => {
                    const sql = (`INSERT INTO PERSON (IDPERSON,LASTNAME_P, FIRSTNAME_P, ID_PERSON_, EMAIL, PASSWORD_P) 
                    VALUE ("${IDPERSON}", "${LASTNAME_P}", "${FIRSTNAME_P}", "${ID_PERSON_}", "${EMAIL}", "${hash}")`);

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

    connection.query(`SELECT IDPERSON, ID_PERSON_, PASSWORD_P FROM PERSON WHERE EMAIL = "${EMAIL}"`, (err, results) => {
        
        if(results.length !== 0){
            bcrypt.compare(PASSWORD_P, results[0].PASSWORD_P)
            .then( valid => {
                if(!valid){
                    res.status(401).json({message : "Mot de passe incorrect"});
                } else {
                    res.status(200).json({
                        message : "Connexion réussie",
                        ID_PERSON_ : results[0].ID_PERSON_,
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

/**
 * Permet de récupérer les données de l'utilisateur connecté
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveDate = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;

    const sql = `SELECT LASTNAME_P, FIRSTNAME_P, EMAIL, ID_PERSON_ FROM PERSON WHERE IDPERSON = "${IDPERSON}"`;

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

/**
 * Permet de supprimer un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
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
    const {LASTNAME_P, FIRSTNAME_P} = req.body;

    const sql = `UPDATE PERSON SET`;

    if(LASTNAME_P !== undefined && LASTNAME_P.length !== 0) {
        connection.query(sql+` LASTNAME_P = "${LASTNAME_P}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour LASTNAME", Erreur : err});
        })
    }

    if(FIRSTNAME_P !== undefined && FIRSTNAME_P.length !== 0) {
        connection.query(sql+` FIRSTNAME_P = "${FIRSTNAME_P}" WHERE IDPERSON = "${IDPERSON}"`, (err) => {
            if(err) res.status(500).json({message : "Erreur serveur, mise à jour FIRSTNAME", Erreur : err});
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

    const sql = `SELECT LASTNAME_P, FIRSTNAME_P, EMAIL, ID_PERSON_
            FROM PERSON
            WHERE ID_PERSON_ LIKE "%${name}%"`

    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if(results === undefined || results.length === 0 || results === null) res.status(404).json({message : "Aucunes personnes ne correspond à votre recherche"});

        else res.status(200).json({PERSONS : results});
    })
}

/**
 * Permet d'envoyer un email de demande  réinitialisation de mdp
 * @param {*} req 
 * @param {*} res 
 */
exports.handleReqResetPassword = (req,res) => {
    const userEmail = req.body.EMAIL;
    const expirationDate = new Date().toISOString().slice(0, 10);

    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // Génération du token
    for ( let i = 0; i < 24 ; i++ ) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const sql = `INSERT INTO RESETPASSWORD (userEmail, resetTOKEN, expirationDate) 
                VALUES ("${userEmail}", "${token}", "${expirationDate}")`;

    connection.query(sql, function(err){
        if(err){
            res.status(500).json({message : "Request failed"});
        } else {

            /**
             * Data de l'email
             * @type {{subject: string, from: string, html: string, to: *, text: string}}
             */
            const mailData = {
                from: 'sportmate.mail@gmail.com',  // sender address
                to: userEmail,   // list of receivers
                subject: 'Changement de mot de passe',
                text: "Changer votre mot de passe Fox'Pro",
                html: `<b>Bonjour ! </b> 
                    <br>Il semblerait que vous vouliez changer de mot de passe !<br/>
                    <a href=http://localhost:3000/init?token=${token}>Réinitialiser mon mot de passe</a>`
            }

            /**
             * Envoie de l'email
             */
            transporter.sendMail(mailData, function(err){
                if(err){
                    res.status(200).json({message : "Failed to delivered", Erreur : err});
                } else {
                    res.status(200).json({message : "Mail envoyé !"});
                }
            })
        }
    })
}


/**
 * Permet de réinitialiser le mdp de l'utilisateur
 * @param {*} req 
 * @param {*} res 
 */
exports.handleResetPassword = (req,res) => {
    const Email = req.body.EMAIL;
    const TOKEN = req.body.token;
    const PASSWORD = req.body.PASSWORD_P;
    const validatePASSWORD = req.body.validatePASSWORD_P;

    const sql = `SELECT userEmail FROM RESETPASSWORD WHERE resetToken = "${TOKEN}" && userEmail = "${Email}"`;

    connection.query(sql, function(err, result){

        if(err){
            res.status(500).json({message : "Erreur serveur", Erreur : err});
        }

        else if (result === undefined || result.length === 0){
            res.status(404).json({message : "Mail non valide ou lien expiré"});
        }

        else if (result[0].userEmail === Email && PASSWORD === validatePASSWORD ){
            bcrypt.hash(PASSWORD, 10)
                .then(hash => {
                    const sql = `UPDATE PERSON
                     SET PASSWORD_P = "${hash}"
                     WHERE EMAIL = "${Email}"`;

                    connection.query(sql, function (err){
                        if(err) {
                            res.status(500).json({erreur : err});
                        } else {
                            const sql = `DELETE FROM RESETPASSWORD WHERE userEmail = "${Email}" && resetTOKEN = "${TOKEN}"`;

                            connection.query(sql, function(err){
                                if(err){
                                    res.status(500).json({message : "Erreur serveur", Erreur : err});
                                } else {
                                    res.status(200).json({message : "Mot de passe mis à jour"});
                                }
                            })
                        }
                    })
                })
                .catch(error => res.status(500).json({message : error}))
        } else {
            res.status(403).json({message : "Veuillez saisir deux fois le même mot de passe"});
        }
    })
}