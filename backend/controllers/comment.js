const connection = require("../database/db");

/**
 * Permet de tester le controleur de comment
 * @param {*} req 
 * @param {*} res 
 */
exports.test = (req, res) => {
    res.status(200).json({message : "commentCtrl is working !"});
}

/**
 * Permet de créer un commentaire
 * @param {*} req 
 * @param {*} res 
 */
exports.createComment = (req, res) => {
    const IDPERSON = res.locals.IDPERSON;
    const IDPROJECT = req.params.idproject;

    const sql = `SELECT IDENTERPRISE FROM PROJECT WHERE IDPROJECT = '${IDPROJECT}'`;

    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (result !== undefined && result.length !== 0) {
            const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
                        UNION
                        (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;
            
            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else if(result !== undefined && result.length !== 0) {
                    const {CONTENT_COMMENT, POST_DATE_COMMENT} = req.body;

                    const sql = `INSERT INTO COMMENT (CONTENT_COMMENT, POST_DATE_COMMENT, IDCREATOR, IDPROJECT) 
                                VALUES ("${CONTENT_COMMENT}", "${POST_DATE_COMMENT}", "${IDPERSON}", "${IDPROJECT}");`

                    connection.query(sql, (err) => {
                        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                        else res.status(200).json({message : "Commentaire posté"});
                    })
                }

                else res.status(403).json({message : "Vous n'avez pas les droits pour commenter ce projet"})
            })
        }

        else res.status(404).json({message : "Project inexistant"});
    })
}

/**
 * Permet de récupérer les commentaires d'un projet
 * @param {*} req 
 * @param {*} res 
 */
exports.getComment = (req, res) => {
    const IDPROJECT = req.params.project;
    const IDENTERPRISE = req.params.enterprise;
    const IDPERSON = res.locals.person;

    const sql = `(SELECT IDPERSON FROM IS_PART_OF WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDPERSON="${IDPERSON}")
                UNION
                (SELECT IDOWNER FROM ENTERPRISE WHERE IDENTERPRISE="${IDENTERPRISE}" AND IDOWNER="${IDPERSON}")`;
    
    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

        else if (result !== undefined && result.length !== 0) {
            const sql = `SELECT CONTENT_COMMENT, POST_DATE_COMMENT, FIRSTNAME_P, LASTNAME_P, ID_PERSON_ 
                        FROM COMMENT INNER JOIN PERSON ON COMMENT.IDCREATOR = PERSON.IDPERSON 
                        WHERE COMMENT.IDPROJECT="${IDPROJECT}"`;
            
            connection.query(sql, (err, result) => {
                if(err) res.status(500).json({message : "Erreur serveur", Erreur : err});

                else res.status(200).json({COMMENTS : result});
            })
        }
        else res.status(403).json({message : "Vous n'avez pas les droits pour visualiser ce projet"});
    })
}