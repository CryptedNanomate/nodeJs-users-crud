
const express = require('express');
const route  = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
//  root routes exported from another file

route.get('/',services.homeRoute);   
// adding users
route.get('/add_user',services.add_user);
// update users
route.get('/update-user',services.update_user);
// API


route.post('/api/users',controller.create);
route.get('/api/users',controller.find);

route.patch('/api/users/:id',controller.update);
// patch http method used instead of put bcs single resource is updated...

route.delete('/api/users/:id',controller.delete);




module.exports = route;