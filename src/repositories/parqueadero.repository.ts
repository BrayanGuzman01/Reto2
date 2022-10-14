import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parqueadero, ParqueaderoRelations} from '../models';

export class ParqueaderoRepository extends DefaultCrudRepository<
  Parqueadero,
  typeof Parqueadero.prototype.idParqueadero,
  ParqueaderoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Parqueadero, dataSource);
  }
}
