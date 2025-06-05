import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userId : 39,
  Islogin : false,
  getUserId : (input) => {
    set({userId : input.data.userId, Islogin : input.data.login})
  }
}))

// "userId": 39,
//     "message": "Login Success",
//     "accessToken": "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VybmFtZSI6InRvZG9fdXNlcjM5IiwiYXV0aG9yaXR5IjoiUk9MRV9VU0VSIiwiaXNzIjoiVG9kbyBBUEkiLCJpYXQiOjE3NDkxMTA1NzYsImV4cCI6MTc0OTE5Njk3Nn0.AJZswwgERo1roqeH9_Pj1J0IS5ck_HOclPQT2ofzpajD9Iyacb8z9hh9sPHcvv0U",
//     "success": true,
//     "login": true