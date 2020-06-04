import Router from '@koa/router';


import AuthController from './controllers/auth';
import UserController from './controllers/user';

const unprotectedRouter = new Router();

//auth相关路由
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

const protectedRouter = new Router();
//users相关路由
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);

export  { protectedRouter, unprotectedRouter };
