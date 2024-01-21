import { Kysely, ColumnDefinitionBuilder, type Migration } from 'kysely';
import { createBaseTable as createBaseTable__Base, qualifyTableName } from '../lib/db';
import { TableNameUnqualifiedEnum } from '../type-system/db';

const argListAddColumnDatabaseId: [
  string,
  any,
  (col: ColumnDefinitionBuilder) => ColumnDefinitionBuilder,
] = [
  'database_id',
  'integer',
  (col: ColumnDefinitionBuilder) =>
    col
      .references(qualifyTableName(TableNameUnqualifiedEnum.DatabaseWithinApplication) + '.id')
      .onDelete('cascade')
      .notNull(),
];

export default {
  async up(db: Kysely<any>): Promise<void> {
    function createBaseTable(table_name: TableNameUnqualifiedEnum) {
      return createBaseTable__Base({ db, table_name });
    }

    const tableBuilderSequence = [
      createBaseTable(TableNameUnqualifiedEnum.DatabaseWithinApplication),
      createBaseTable(TableNameUnqualifiedEnum.Profile).addColumn(...argListAddColumnDatabaseId),
      createBaseTable(TableNameUnqualifiedEnum.Scenario)
        .addColumn(...argListAddColumnDatabaseId)
        .addColumn('description', 'text'),
      createBaseTable(TableNameUnqualifiedEnum.Note).addColumn('for', 'varchar(20)'),
    ];

    for (let tableBuilder of tableBuilderSequence) {
      const sql = tableBuilder.compile();
      try {
        await tableBuilder.execute();
      } catch (error) {
        console.error(error);
        console.log({ sql });
        process.exit(1);
      }
    }

    console.log('All migrations complete');
  },

  async down(db: Kysely<any>): Promise<void> {
    const tableNameQualifiedSequence = [
      TableNameUnqualifiedEnum.Note,
      TableNameUnqualifiedEnum.Scenario,
      TableNameUnqualifiedEnum.Profile,
      TableNameUnqualifiedEnum.DatabaseWithinApplication,
    ].map(qualifyTableName);
    for (let tableName of tableNameQualifiedSequence) {
      await db.schema.dropTable(tableName).execute();
    }
  },
} as Migration;
