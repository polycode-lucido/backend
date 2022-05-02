import { Entity } from './entity.model';

export interface EntityDTO {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  validated: boolean;
  validation_token?: string;
}

export function createDTOFromEntity(entity: Entity) {
  return {
    id: entity.id,
    firstname: entity.firstname,
    lastname: entity.lastname,
    email: entity.email,
    validated: entity.validated,
  };
}
