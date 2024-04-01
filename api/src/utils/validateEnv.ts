import { cleanEnv, port, str } from "envalid";

const validateEnv = () =>{
  cleanEnv(process.env, {
    NODE_ENV: str(), 
    PORT: port(),
    DATABASE_URL: str(),
    JWT_SECRET_KEY: str(),
    CLIENT_URL: str(),
  })
}

export default validateEnv;