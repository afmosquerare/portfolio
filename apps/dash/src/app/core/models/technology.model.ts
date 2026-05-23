export interface Technology {
  id: number;
  name: string;
}

export interface CreateTechnologyRequest {
  name: string;
}

export interface UpdateTechnologyRequest extends Partial<CreateTechnologyRequest> {}
