const connection = require('../database/db');

/**
 * Permet de tester le controller Enterprise
 * @param {*} req 
 * @param {*} res 
 */
exports.test = (req, res) => {res.status(200).json({message : "enterpriseCtrl is working well !"})};

/**
 * Permet de créer un entreprise
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const {NAME_ENTERPRISE, DESCRIPTION_ENT} = req.body;

    const sql = `INSERT INTO ENTERPRISE (NAME_ENTERPRISE, DESCRIPTION_ENT, IDOWNER) 
                VALUES ("${NAME_ENTERPRISE}", "${DESCRIPTION_ENT}", "${IDPERSON}")`;
    
    connection.query(sql, (err) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
        
        else res.status(200).json({message : "Entreprise créée !"});
    })
}

/**
 * Permet de récupérer une entreprise par son IDENTERPRISE 
 * @param {*} req 
 * @param {*} res 
 */
exports.getByID = (req, res) => {
    const IDENTERPRISE = req.params.identerprise;

    const sql = `SELECT IDENTERPRISE, NAME_ENTERPRISE, DESCRIPTION_ENT,
            LASTNAME_P, FIRSTNAME_P, EMAIL
            FROM ENTERPRISE 
            INNER JOIN PERSON ON ENTERPRISE.IDOWNER = PERSON.IDPERSON
            WHERE IDENTERPRISE = "${IDENTERPRISE}"`;

    connection.query(sql, (err, result) => {
        if (err) res.status(500).json({message : "Erreur serveur !", Erreur : err});

        else if (result === undefined || result.length === 0 || result ===0) 
            res.status(404).json({message : "Aucune entreprise associée à cet ID !"});

        else res.status(200).json({ENTERPRISE : result});
    })
}

/**
 * Permet de récupérer les entreprises de l'utilisateur connecté
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getByCurrentUser = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;

    const sql = `SELECT IDENTERPRISE, NAME_ENTERPRISE, DESCRIPTION_ENT
                FROM ENTERPRISE WHERE IDOWNER = '${IDPERSON}'`;

    connection.query(sql, (err, results) => {
        if (err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (results === undefined || results.length === 0 || results ===0) 
            res.status(404).json({message : "Vous n'avez aucune entreprise !"});

        else res.status(200).json({ENTERPRISES : results});
    })
}

/**
 * Permet de récupérer les entreprises d'un utilisateur grâce à son ID_PERSON_
 * @param {*} req 
 * @param {*} res 
 */
exports.getByID_PERSON_ = (req, res) => {
    const ID_PERSON_ = req.params.user;

    const sql = `SELECT IDENTERPRISE, NAME_ENTERPRISE, DESCRIPTION_ENT,
                LASTNAME_P, FIRSTNAME_P, EMAIL
                FROM ENTERPRISE 
                INNER JOIN PERSON ON ENTERPRISE.IDOWNER = PERSON.IDPERSON
                WHERE ID_PERSON_ = "${ID_PERSON_}"`

    connection.query(sql, (err, results) => {
        if (err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (results === undefined || results.length === 0 || results ===0) 
            res.status(404).json({message : "Cet utilisateur n'a pas d'entreprise !"});

        else res.status(200).json({ENTERPRISES : results})
    })
}

/**
 * Permet de mettre à jour les données d'un entreprise 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;

    const {NAME_ENTERPRISE, DESCRIPTION_ENT} = req.body;

    connection.query(`SELECT IDENTERPRISE FROM ENTERPRISE WHERE IDENTERPRISE = '${IDENTERPRISE}' AND IDOWNER = '${IDPERSON}'`, (err, result) => {
        if (err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (result === undefined || result === null || result.length === 0) res.status(404).json({message : "Vous n'êtes pas le propriétaire de cette entreprise !"});
        
        else {
            if(NAME_ENTERPRISE !== undefined){
                const sql = `UPDATE ENTERPRISE SET NAME_ENTERPRISE = '${NAME_ENTERPRISE}' WHERE IDENTERPRISE = '${IDENTERPRISE}'`;

                connection.query(sql, (err) => {
                    if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
                })
            }

            if(DESCRIPTION_ENT !== undefined){
                const sql = `UPDATE ENTERPRISE SET DESCRIPTION_ENT = '${DESCRIPTION_ENT}' WHERE IDENTERPRISE = '${IDENTERPRISE}'`;

                connection.query(sql, (err) => {
                    if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
                })
            }

            res.status(200).json({message : "Entreprise mise à jour !"});
        }
    })
}

/**
 * Permet de supprimer une entreprise dont on est le propriétaire
 * @param {*} res 
 * @param {*} res 
 */
exports.delete = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;

    const sql = `SELECT IDENTERPRISE FROM ENTERPRISE WHERE IDENTERPRISE = "${IDENTERPRISE}" AND IDOWNER = "${IDPERSON}"`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (result === undefined || result.length === 0) res.status(200).json({message : "Vous ne pouvez pas supprimer une entreprise dont vous n'êtes pas le propriétaire ! "});

        else {
            const sql = `DELETE FROM ENTERPRISE WHERE IDENTERPRISE = "${IDENTERPRISE}"`;

            connection.query(sql, (err) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else res.status(200).json({message : "Entreprise supprimée !"});
            })
        }
    })
}

/**
 * Permet à un product manager ou admin de l'entreprise d'ajouter des employés à l'entreprise
 * @param {*} req 
 * @param {*} res 
 */
exports.addToEnterprise = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.body.IDENTERPRISE;

    const sql =  `SELECT IS_PM, IS_ADMIN FROM IS_PART_OF WHERE IDPERSON = "${IDPERSON}" AND IDENTERPRISE="${IDENTERPRISE}"`;

    // Vérification du statut de la personne précédant à l'opération
    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
        
        else if (result === undefined || result.length === 0) res.status(403).json({message : "Vous ne faite pas partie de cette entreprise !"});

        else if (result[0].IS_PM === 0 && result[0].IS_ADMIN === 0) res.status(403).json({message : "Vous devez être administrateur ou chef de projet pour ajouter des employés à l'entreprise"});

        else {
            const {ID_PERSON_, IS_PM, IS_ADMIN} = req.body;

            const sql = `SELECT IDPERSON FROM PERSON WHERE ID_PERSON_ = '${ID_PERSON_}'`;

            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else if (result === undefined || result.length === 0) res.status(404).json({message : "Utilisateur inexistant"});

                else {
                    const sql = `SELECT IDPERSON, IDENTERPRISE FROM IS_PART_OF WHERE IDPERSON = '${IDPERSON}' AND IDENTERPRISE = '${IDENTERPRISE}'`;

                    connection.query(sql, (err, result) => {
                        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                        else if (result !== undefined && result.length !== 0) res.status(403).json({message : "La personne à ajouter est déjà membre de l'entreprise !"})

                        else {
                            const sql = `INSERT INTO IS_PART_OF (IDPERSON, IDENTERPRISE, IS_PM , IS_ADMIN) VALUES ("${result[0].IDPERSON}", "${IDENTERPRISE}", "${IS_PM}", "${IS_ADMIN}")`;

                            connection.query(sql, (err) => {
                                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                                else res.status(200).json({message : "Membre ajouté !"});
                            })  
                        }
                    })
                }
            })
        }
    })
}