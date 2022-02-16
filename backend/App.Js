const express = require('express');
const app = express();
app.use(express.json())

//Import des routes
const testRoutes = require('./routes/test.js');
const personRoutes = require('./routes/person.js');
const enterpriseRoutes = require('./routes/enterprise.js');
const projectRoutes = require('./routes/project.js');

//Set header, permet l'accès à l'API peut importe l'origine de l'appareil
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Redirection des requêtes vers les routes
app.use('/api/test', testRoutes);
app.use('/api/person', personRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/project', projectRoutes);

module.exports = app;