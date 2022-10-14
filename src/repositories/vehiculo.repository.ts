import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Residente, Parqueadero} from '../models';
import {ResidenteRepository} from './residente.repository';
import {ParqueaderoRepository} from './parqueadero.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.idVehiculo,
  VehiculoRelations
> {

  public readonly residente: BelongsToAccessor<Residente, typeof Vehiculo.prototype.idVehiculo>;

  public readonly parqueadero: HasOneRepositoryFactory<Parqueadero, typeof Vehiculo.prototype.idVehiculo>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ResidenteRepository') protected residenteRepositoryGetter: Getter<ResidenteRepository>, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.parqueadero = this.createHasOneRepositoryFactoryFor('parqueadero', parqueaderoRepositoryGetter);
    this.registerInclusionResolver('parqueadero', this.parqueadero.inclusionResolver);
    this.residente = this.createBelongsToAccessorFor('residente', residenteRepositoryGetter,);
    this.registerInclusionResolver('residente', this.residente.inclusionResolver);
  }
}
