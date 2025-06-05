import { create } from "zustand";
import todoApi from "../api/todoApi";

export const useTodoStore = create((set)=>({
  todoAbc : [],
  getTodoList : async (id) => {
    const res = await todoApi.getAll(id)
    set({todoAbc : res.data.todos})
  }
}))