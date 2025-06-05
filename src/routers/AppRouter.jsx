import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import LoginPage from '../pages/LoginPage'
import TodoPage from '../pages/TodoPage'
import RegisterPage from '../pages/RegisterPage'

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/todo_list' element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter