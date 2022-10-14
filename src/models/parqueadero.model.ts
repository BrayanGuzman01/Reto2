import {Entity, model, property} from '@loopback/repository';

@model()
export class Parqueadero extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idParqueadero?: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  constructor(data?: Partial<Parqueadero>) {
    super(data);
  }
}

export interface ParqueaderoRelations {
  // describe navigational properties here
}

export type ParqueaderoWithRelations = Parqueadero & ParqueaderoRelations;
