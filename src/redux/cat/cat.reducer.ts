import { ADD_CAT } from "./cat.types";

export interface AppState {
  cat: CatState;
}

export interface CatState {
  cats: CatDetail[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Breed {
  weight: {
    imperial?: string;
    metric?: string;
  };
  id?: string;
  name?: string;
  vetstreet_url?: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  description?: string;
  life_span?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  reference_image_id?: string;
}

export interface CatDetail {
  id: string;
  url: string;
  height: number;
  width: number;
  categories?: Category[];
  breeds?: Breed[];
}

const initialState: CatState = {
  cats: [],
};

export interface ActionType {
  type?: string;
  payload: CatDetail;
}

export const catReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_CAT:
      return {
        ...state,
        cats: [...state.cats, action.payload],
      };
    default:
      return state;
  }
};
