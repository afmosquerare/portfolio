export interface Technology {
  id: number;
  name: string;
  icon?: string;
}

export interface CreateTechnologyRequest {
  name: string;
  icon?: string;
}

export interface UpdateTechnologyRequest extends Partial<CreateTechnologyRequest> {}
