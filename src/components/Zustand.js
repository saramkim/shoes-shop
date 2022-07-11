import create from "zustand";
import Data from "./Data";

const useStore = create((set) => ({
  data: Data,

  setData: (a) =>
    set((state) => ({
      data: [...state.data, ...a],
    })),
}));

const useStore2 = create((set) => ({
  cartList: [],

  cartAdd: (a) =>
    set((state) => {
      let 비교 = state.cartList.findIndex((e) => e.id === a.id);

      if (비교 >= 0) {
        state.cartList[비교].stock === 0
          ? alert("재고없음")
          : state.cartList[비교].quant++ && state.cartList[비교].stock--;
      } else {
        state.cartList.push(a);
      }
    }),

  quantPlus: (a) =>
    set((state) => {
      let 비교 = state.cartList.findIndex((e) => e.id === a);
      state.cartList[비교].stock === 0
        ? alert("재고없음")
        : state.cartList[비교].stock-- && state.cartList[비교].quant++;
    }),

  quantMinus: (a) =>
    set((state) => {
      let 비교 = state.cartList.findIndex((e) => e.id === a);
      state.cartList[비교].quant !== 0 &&
        state.cartList[비교].quant-- &&
        state.cartList[비교].stock++;
    }),

  delist: (a) =>
    set((state) => {
      let 비교 = state.cartList.findIndex((e) => e.id === a);
      state.cartList.splice(비교, 1);
    }),
}));
export { useStore, useStore2 };
