import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';

import { generateSchema } from '../util/schemas';

const typescriptTypes = generateNamespace('RentApp', generateSchema());

fs.writeFile(
  path.join(__dirname, '../types/schema.d.ts'),
  typescriptTypes,
  err => {
    console.log(err);
  }
);
