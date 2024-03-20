import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./core/errors/errorHandler";
import "./core/db/typeorm.config";
import "./core/env.config";
import userRouters from "./apis/router";
import { authConfig } from "./core/auth.config";

(() => {
	const app: Express = express();
	const port = process.env.PORT || 4231;
	const auth = authConfig(app);

	app.use(cors());
	app.use(express.json());

	app.use("/api/v1/auth", userRouters);
	app.use(errorHandler);

	app.listen(port, () => {
		console.log(
			`Server is running on port: http://localhost:${port}`
		);
	});
})();

/* 
  & init project, install express;
  $ npm init
  $ npm i express
  & nodemon with ts;
  $ npm install -D nodemon typescript ts-node
  & edit tsconfig.json;
    "outDir": "./dist"  
  & add start and build in package.josn script;
  	"start": "npx nodemon --exec ts-node ./src/app.ts",
		"build": "tsc"
  & dotenv to use process.env;
  $ npm install dotenv
  $ npm install --save-dev @types/dotenv

  & mongoose;
  $ npm install mongoose
  $ npm install --save-dev @types/mongoose
  & mySql;
  $ npm install typescript @types/node mysql2
  $ npm install --save-dev @types/mysql
  & TypeOrm;
  $ npm install typeorm mysql reflect-metadata
  $ npm install --save-dev typescript @types/node ts-node

  & send http request to other server;
  $ npm install axios

  & add passport;
  $ npm install passport passport-jwt jsonwebtoken
  $ npm install @types/passport @types/passport-jwt @types/jsonwebtoken --save-dev

  & add types/bcrypt;
  $ npm i bcrypt
  $ npm i @types/bcrypt --save-dev

  & add class-validator;
  $ npm install class-validator class-transformer reflect-metadata

  & add express-session;
  $ npm install express-session
  $ npm install @types/express-session @types/express --save-dev

  & add mongodb session, cz the typeorm store query builder not supported by MongoDB;
  $ npm install connect-mongodb-session express-session

  & add jsonwebtoken;
  $ npm i jsonwebtoken
  $ npm i @types/jsonwebtoken --save-dev

  & handle cros issue;
  $ npm install cors @types/cors

  & set env;
  $ npm install --save-dev cross-env

  & logger;
  $ npm install winston
  $ npm install @types/winston --save-dev

  & create docker file Dockerfile: my image name is movie-backend;
  $ docker build -t <your-image-name> .
  $ docker run -p 8800:3344 -d <your-image-name>

  & stop the docker service in local;
  $ docker ps
  $ docker stop <container-id-or-name>
  $ docker rm <container-id-or-name> // optional, this will remove the image;
  $ docker run -p 8800:3344 -d <your-image-name> // recreate the image;
*/
