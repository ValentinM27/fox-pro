"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Permet de tester le controleur de test
 * @param req
 * @param res
 */
exports.test = (req, res) => {
    res.status(200).json({ message: "Test controller is working !" });
};
