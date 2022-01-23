/**
 * Permet de tester la connexion à l'API
 * @param {*} req 
 * @param {*} res 
 */
exports.test = (req,res) =>  {
    res.status(200).json({message : "The API is working well !"});
}

