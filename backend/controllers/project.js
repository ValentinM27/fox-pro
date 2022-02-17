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

    const sql = `SELECT IDPERSON, IS_PM, IS_ADMIN FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}"`;

    connection.query(sql, (err, result) => {

        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if(result !== undefined && result.length !== 0 && (result[0].IS_PM === 1 || result[0].IS_ADMIN === 1)) {

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

    const sql = `SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}"`;

    connection.query(sql, (err, result) => {
        if(err) res.status(200).json({message: "Erreur serveur", Error: err});

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
