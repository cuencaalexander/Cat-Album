import { addCat } from "./cat.action";
import { ADD_CAT } from "./cat.types";

describe("Cat action", () => {
  test("adds a cat to store", () => {
    const cat = { id: "1", url: "localhost:3000", height: 400, width: 570 };
    
    expect(addCat(cat)).toEqual({
      type: ADD_CAT,
      payload: cat,
    });
  });
});
