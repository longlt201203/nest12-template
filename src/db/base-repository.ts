import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, datasource: DataSource) {
    super(target, datasource.createEntityManager());
  }
}
