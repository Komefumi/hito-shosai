import {
  Kysely,
  // sql,
  ColumnDefinitionBuilder,
  Migration,
} from 'kysely';
import {
  createBaseTable as createBaseTable__Base,
  // qualifyCustomType,
  qualifyTableName,
} from '../lib/db';
import {
  // CustomTypeUnqualifiedEnum,
  // NoteForTypeValueEnum,
  TableNameUnqualifiedEnum,
} from '../type-system/db';

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

    /*
    function createTypeBase(base_name: CustomTypeUnqualifiedEnum) {
      return db.schema.createType(qualifyCustomType(base_name));
    }

    const typeBuilderSequence = [
      createTypeBase(CustomTypeUnqualifiedEnum.NoteFor).asEnum([
        NoteForTypeValueEnum.Profile,
        NoteForTypeValueEnum.Scenario,
      ]),
    ];
    */

    const tableBuilderSequence = [
      createBaseTable(TableNameUnqualifiedEnum.DatabaseWithinApplication),
      createBaseTable(TableNameUnqualifiedEnum.Profile).addColumn(...argListAddColumnDatabaseId),
      createBaseTable(TableNameUnqualifiedEnum.Scenario)
        .addColumn(...argListAddColumnDatabaseId)
        .addColumn('description', 'text'),
      createBaseTable(TableNameUnqualifiedEnum.Note).addColumn('for', 'varchar(20)'),
    ];

    /*
    for (let typeBuilder of typeBuilderSequence) {
      const sql = typeBuilder.compile();
      console.log({ sql });
      await typeBuilder.execute();
    }
    */

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
    /*
    const customTypeQualifiedSequence = [CustomTypeUnqualifiedEnum.NoteFor].map(qualifyCustomType);
    for (let typeName of customTypeQualifiedSequence) {
      await db.schema.dropType(typeName).execute();
    }
    */
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
