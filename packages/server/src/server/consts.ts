import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '../../');
