const connection = require('../database/db');

/**
 * Permet de tester le controller de projets
 * @param req
 * @param res
 */
exports.test = (req, res) => {
    res.status(200).json({message : "projectCtrl is working well !"});
}

/**
 * Permet de créer un projet
 * @param req
 * @param res
 */
exports.createProject = (req,res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
                UNION
                (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;

    connection.query(sql, (err, result) => {

        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if(result !== undefined && result.length !== 0) {

            const {NAME_PROJECT, STATUT, DESCRIPTION_P, START_DATE_P, END_DATE_P} = req.body;

            if(!NAME_PROJECT || !STATUT || !DESCRIPTION_P || !START_DATE_P || !END_DATE_P) {
                res.status(403).json({message : "Veuillez saisir toutes les données demandées"});
            } else { 
                const sql = `INSERT INTO PROJECT (NAME_PROJECT, STATUT, DESCRIPTION_P,
                START_DATE_P, END_DATE_P, IDCREATOR, IDENTERPRISE)
                VALUES ( "${NAME_PROJECT}", "${STATUT}", "${DESCRIPTION_P}", "${START_DATE_P}", "${END_DATE_P}", "${IDPERSON}", "${IDENTERPRISE}")`;

                connection.query(sql, (err) => {
                    if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                    else res.status(200).json({message : "Projet crée !"});
                })
            }

            
        }

        else res.status(403).json({message : "Vous n'avez pas les droits pour créer un projet"});
    })
}

/**
 * Permet de récupérer les projets d'une entreprise grâce à son ID
 * Besoin que la personnes envoyant soit membre de l'entreprise
 * @param req
 * @param res
 */
exports.getProjectsByIDenterprise = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
                UNION
                (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

        else if(result !== undefined && result.length !== 0) {
            const sql = `SELECT IDPROJECT, NAME_PROJECT, STATUT, DESCRIPTION_P, START_DATE_P, END_DATE_P, LASTNAME_P, FIRSTNAME_P
                        FROM PROJECT INNER JOIN PERSON ON PROJECT.IDCREATOR = PERSON.IDPERSON 
                        WHERE PROJECT.IDENTERPRISE="${IDENTERPRISE}"`;

            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else if(result !== undefined || result.length !== 0) res.status(200).json({PROJECTS : result});

                else res.status(404).json({message : "Vous n'avez actuellement aucun projet pour cette entreprise"});
            })
        }

        else res.status(403).json({message : "Vous n'avez pas les droits pour visualiser les projets de cette entreprise"});
    })
}

/**
 * Permet de supprimer un projet
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProject = (req, res) => { 
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;
    const IDPROJECT = req.params.idproject;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
    UNION
    (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

        else if(result !== undefined && result.length !== 0) {
            const sql = `SELECT IDENTERPRISE, IDPROJECT FROM PROJECT WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPROJECT="${IDPROJECT}"`;

            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message: "Erreur serveur", Error: err});

                else if(result !== undefined && result.length !== 0) {
                    const sql = `DELETE FROM PROJECT WHERE IDPROJECT="${IDPROJECT}"`;

                    connection.query(sql, (err) => { 
                        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

                        else res.status(200).json({message: "Projet supprimé"});
                    })
                }

                else res.status(403).json({message : "Ce projet n'appartient pas à cette entreprise ou n'existe pas"});
            })
        }

        else res.status(403).json({message : "Vous n'avez pas les droits pour visualiser les projets de cette entreprise"});
    })
}

/**
 * Permet de récupérer les informations d'un projet via son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getProjectByID = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;
    const IDPROJECT = req.params.idproject;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
                UNION
                (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

        else if(result !== undefined && result.length !== 0) {
            const sql = `SELECT IDENTERPRISE, IDPROJECT FROM PROJECT WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPROJECT="${IDPROJECT}"`;

            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message: "Erreur serveur", Error: err});

                else if(result !== undefined && result.length !== 0) {
                    const sql = `SELECT IDPROJECT, NAME_PROJECT, STATUT, DESCRIPTION_P, START_DATE_P, END_DATE_P, LASTNAME_P, FIRSTNAME_P, ID_PERSON_
                                FROM PROJECT INNER JOIN PERSON ON PROJECT.IDCREATOR = PERSON.IDPERSON 
                                WHERE IDPROJECT="${IDPROJECT}"`;

                    connection.query(sql, (err, result) => { 
                        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

                        else res.status(200).json({PROJECT : result});
                    })
                }

                else res.status(403).json({message : "Ce projet n'appartient pas à cette entreprise ou n'existe pas"});
            })
        }

        else res.status(403).json({message : "Vous n'avez pas les droits pour visualiser les projets de cette entreprise"});
    })
}

/**
 * Permet de mettre à jour un projet 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProject = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDENTERPRISE = req.params.identerprise;
    const IDPROJECT = req.params.idproject;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
    UNION
    (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Erreur serveur", Error: err});

        else if(result !== undefined && result.length !== 0) {

            const sql = `SELECT IDENTERPRISE, IDPROJECT FROM PROJECT WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPROJECT="${IDPROJECT}"`;

            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message: "Erreur serveur", Error: err});

                else if(result !== undefined && result.length !== 0) {
                    const {NAME_PROJECT, STATUT, DESCRIPTION_P} = req.body;

                    const sql = `UPDATE PROJECT SET`;

                    if(NAME_PROJECT !== undefined && NAME_PROJECT.length !== 0) {
                        connection.query(sql+` NAME_PROJECT = "${NAME_PROJECT}" WHERE IDPROJECT = "${IDPROJECT}"`, (err) => {
                            if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
                        })
                    }

                    if(DESCRIPTION_P !== undefined && DESCRIPTION_P.length !== 0) {
                        connection.query(sql+` DESCRIPTION_P = "${DESCRIPTION_P}" WHERE IDPROJECT = "${IDPROJECT}"`, (err) => {
                            if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
                        })
                    }

                    if(STATUT !== undefined && STATUT.length !== 0) {
                        connection.query(sql+` STATUT = "${STATUT}" WHERE IDPROJECT = "${IDPROJECT}"`, (err) => {
                            if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});
                        })
                    }
                    
                    res.status(200).json({message : "Projet mis à jour"});  
                }
                
                else res.status(403).json({message : "Ce projet n'appartient pas à cette entreprise ou n'existe pas"});
            })
        }

        else res.status(403).json({message : "Vous n'avez pas les droits pour modifier les projets de cette entreprise"});
    })
}   

