import Koa from 'koa';
import cors from '@koa/cors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import { logger } from './logger';
import { protectedRouter, unprotectedRouter } from './routes';
import { createConnection } from 'typeorm';
import { JWT_SECRET } from './constants';
import 'reflect-metadata';


createConnection().then(() => {
  // 初始化 Koa 应用实例
  const app = new Koa();
  // 注册中间件
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());



  // 响应用户请求
  // app.use((ctx) => {
  //   ctx.body = 'Hello Koa';
  // });


  // 调用 router 对象的 routes 方法获取到对应的 Koa 中间件，
  // 还调用了 allowedMethods 方法注册了 HTTP 方法检测的中间件，
  // 这样当用户通过不正确的 HTTP 方法访问 API 时，就会自动返回 405 Method Not Allowed 状态码。
  // app.use(router.routes()).use(router.allowedMethods());

  
  app.use(async (ctx,next)=>{
    try{
      await next();
    }catch(err){
      //只返回JSON格式的响应
      ctx.status = err.status || 500;
      ctx.body = {
        message:err.message
      }
    }
  })
  //  无需JWT Token即可访问
  app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

  //注册JWT中间件
  app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

  //需要JWT Token才可访问
  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());


  // 运行服务器
  app.listen(3000);

}).catch((err: string) => {
  console.log('TypeORM connection error:', err)
})














