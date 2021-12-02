import { addCat } from "./cat.action";
import { catReducer } from "./cat.reducer";
import { ADD_CAT } from "./cat.types";

describe("Cat action", () => {
  describe("with no initial state", () => {
    test("adds a cat to store", () => {
      const cat = { id: "1", url: "localhost:3000", height: 400, width: 570 };

      expect(catReducer(undefined, addCat(cat))).toEqual({
        cats: [cat],
      });
    });
  });

  describe("with initial state", () => {
    test("adds a cat to store", () => {
      const initialCat = {
        id: "1",
        url: "localhost:3000",
        height: 400,
        width: 570,
      };
      const cat = { id: "2", url: "localhost:3000", height: 400, width: 570 };
      const state = catReducer({ cats: [initialCat] }, addCat(cat));

      expect(state.cats).toHaveLength(2);
      expect(state).toEqual({
        cats: [initialCat, cat],
      });
    });
  });
});
