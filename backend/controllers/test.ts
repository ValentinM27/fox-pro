import express = require('express');

/**
 * Permet de tester le controleur de test
 * @param req
 * @param res
 */
exports.test = (req : express.Request, res : express.Response) => {
    res.status(200).json({message : "Test controller is working !"});
}
