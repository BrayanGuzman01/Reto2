import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Residente, ResidenteRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class ResidenteRepository extends DefaultCrudRepository<
  Residente,
  typeof Residente.prototype.idResidente,
  ResidenteRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Residente.prototype.idResidente>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Residente, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
