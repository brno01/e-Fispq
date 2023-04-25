import * as dotenv from 'dotenv-yaml';
import { resolve as resolvePath } from 'path';

let typeEnv = '../.env';
if (process.env.NODE_ENV === 'development') {
  typeEnv = '.env.yml';
} else {
  typeEnv = '.env.local.yml';
}
dotenv.config({ path: resolvePath(process.cwd(), typeEnv) });
