import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Residente,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoResidenteController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/residente', {
    responses: {
      '200': {
        description: 'Residente belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Residente)},
          },
        },
      },
    },
  })
  async getResidente(
    @param.path.string('id') id: typeof Vehiculo.prototype.idVehiculo,
  ): Promise<Residente> {
    return this.vehiculoRepository.residente(id);
  }
}
