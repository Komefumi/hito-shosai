// import * as path from 'path';
// import { promises as fs } from 'fs';
import {
  Migrator,
  // FileMigrationProvider
} from 'kysely';
import { OurMigrationProvider, db } from './db';
// import { MIGRATION_LIST_PATH } from './config';

export async function migrateDB() {
  const migrator = new Migrator({
    db,
    provider: new OurMigrationProvider(),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}
