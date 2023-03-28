const AdminController = require("../controllers/Admin.controller")
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get('/api/admin/find/:id', AdminController.findoneSingleAdmin);
  app.get('/api/admin', AdminController.getAllAdmins);
  app.post('/api/admin', AdminController.createNewAdmin);
  app.post('/api/admin/login', AdminController.adminLogin);
  app.post('/api/admin/logout', AdminController.adminLogout);
  app.get('/api/admin/authenticate', authenticate )
}