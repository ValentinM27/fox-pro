/**
 * Permet de tester un mot de passe à la création ou la modification d'un compte
 * @param req
 * @param res
 * @param next
 */
 module.exports = (req, res, next) =>{

    const {PASSWORD_P} = req.body;

    let nbChar = 0, nbMaj = 0, nbNum = 0;

    for(let i = 0; i < PASSWORD_P.length; i++){

        const thisChar = PASSWORD_P.charAt(i);
        nbChar ++;

        if(thisChar === thisChar.toUpperCase()){
            nbMaj ++;
        }
        if (Number.isInteger(parseInt(thisChar))){
            nbNum ++;
        }
    }

    if(nbChar >= 8 && nbNum >=1 && nbMaj >= 1){
        next();
    } else {
        res.status(403).json({message : "Saisir un mot de passe de 8 caractères minimum, avec une majuscule et un chiffre"});
    }
}