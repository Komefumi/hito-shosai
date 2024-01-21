import SQLite from 'better-sqlite3';
import {
  ColumnDefinitionBuilder,
  Kysely,
  type Migration,
  type MigrationProvider,
  SqliteDialect,
  sql,
} from 'kysely';
import { CustomTypeUnqualifiedEnum, TableNameUnqualifiedEnum } from '../type-system/db';
import firstMigration from '../db-migration/1_initial';
import { DB_PATH } from './config';

const dialect = new SqliteDialect({
  database: new SQLite(DB_PATH),
});

export class OurMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, Migration>> {
    return [firstMigration].reduce(
      (record, currentMigraiton, index) => {
        record[index] = currentMigraiton;
        return record;
      },
      {} as Record<string, Migration>,
    );
  }
}

export const db = new Kysely<unknown>({
  dialect,
});

export function qualifyCustomType(type_name: CustomTypeUnqualifiedEnum) {
  return `${type_name}__type`;
}

export function qualifyTableName(table_name: TableNameUnqualifiedEnum) {
  return `${table_name}__collection`;
}

function makeArgListTimestampColumn(column_name: string) {
  return [column_name, 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()] as [
    string,
    any,
    (col: ColumnDefinitionBuilder) => ColumnDefinitionBuilder,
  ];
}

export function createBaseTable(args: { db: Kysely<any>; table_name: TableNameUnqualifiedEnum }) {
  const { db, table_name } = args;
  return db.schema
    .createTable(qualifyTableName(table_name))
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn(...makeArgListTimestampColumn('created_at'))
    .addColumn(...makeArgListTimestampColumn('updated_at'));
}
