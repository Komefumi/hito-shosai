import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export enum CustomTypeUnqualifiedEnum {
  NoteFor = 'note_for',
}

export enum NoteForTypeValueEnum {
  Profile = 'profile',
  Scenario = 'scenario',
}

export enum TableNameUnqualifiedEnum {
  DatabaseWithinApplication = 'database_within_application',
  Profile = 'profile',
  Scenario = 'scenario',
  Note = 'note',
}

export interface Database {
  database_within_application_collection: DatabaseWithinApplicationTable;
  profile_collection: ProfileTable;
  scenario_collection: ScenarioTable;
  note_collection: NoteTable;
}

interface BaseTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface DatabaseWithinApplicationTable extends BaseTable {}

export interface ProfileTable extends BaseTable {
  database_id: string;
}

export interface ScenarioTable extends BaseTable {
  description: string;
}

export interface NoteTable extends BaseTable {
  content: string;
}

export type DatabaseWithinApplication = Selectable<DatabaseWithinApplicationTable>;
export type NewDatabaseWithinApplication = Insertable<DatabaseWithinApplicationTable>;
export type Update__DatabaseWithinApplication = Updateable<DatabaseWithinApplicationTable>;

export type Profile = Selectable<ProfileTable>;
export type NewProfile = Insertable<ProfileTable>;
export type UpdateProfile = Updateable<ProfileTable>;

export type Scenario = Selectable<ScenarioTable>;
export type NewScenario = Insertable<ScenarioTable>;
export type UpdateScenario = Updateable<ScenarioTable>;

export type Note = Selectable<NoteTable>;
export type NewNote = Insertable<NoteTable>;
export type UpdateNote = Updateable<NoteTable>;
