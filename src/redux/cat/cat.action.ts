import { CatDetail } from "./cat.reducer";
import { ADD_CAT } from "./cat.types";

export const addCat = (payload: CatDetail) => {

    return {
        type: ADD_CAT,
        payload,
    };
};