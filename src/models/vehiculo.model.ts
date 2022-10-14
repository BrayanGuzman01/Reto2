import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Residente} from './residente.model';
import {Parqueadero} from './parqueadero.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVehiculo?: string;

  @property({
    type: 'string',
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  idResidente: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @belongsTo(() => Residente)
  residenteId: string;

  @hasOne(() => Parqueadero)
  parqueadero: Parqueadero;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
