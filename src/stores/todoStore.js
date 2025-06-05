import { create } from "zustand";
import todoApi from "../api/todoApi";

export const useTodoStore = create((set)=>({
  todo : [],
  getTodoList : async (id) => {
    const res = await todoApi.getAll(id)
    set({todo : res.data.todo})
  }
}))