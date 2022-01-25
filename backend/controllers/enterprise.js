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
    const IDENTERPRISE = req.params.id;

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

        else if (results === undefined || results.length === 0 || results ===0) 
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