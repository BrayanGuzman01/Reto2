import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Residente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idResidente?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  placaVehiculo: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Residente>) {
    super(data);
  }
}

export interface ResidenteRelations {
  // describe navigational properties here
}

export type ResidenteWithRelations = Residente & ResidenteRelations;
