import path from 'path';
import { app } from 'electron';

export const ROOT_PATH = path.join(__dirname, '..', '..');
export const DB_PATH = path.join(app.getPath('userData'), 'db.sqlite');
console.log({ DB_PATH });
