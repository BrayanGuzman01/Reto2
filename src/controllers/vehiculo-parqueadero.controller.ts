import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Parqueadero,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoParqueaderoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Vehiculo has one Parqueadero',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parqueadero),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parqueadero>,
  ): Promise<Parqueadero> {
    return this.vehiculoRepository.parqueadero(id).get(filter);
  }

  @post('/vehiculos/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.idVehiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueaderoInVehiculo',
            exclude: ['idParqueadero'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) parqueadero: Omit<Parqueadero, 'idParqueadero'>,
  ): Promise<Parqueadero> {
    return this.vehiculoRepository.parqueadero(id).create(parqueadero);
  }

  @patch('/vehiculos/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Vehiculo.Parqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Partial<Parqueadero>,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.vehiculoRepository.parqueadero(id).patch(parqueadero, where);
  }

  @del('/vehiculos/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Vehiculo.Parqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.vehiculoRepository.parqueadero(id).delete(where);
  }
}
