import React, { useEffect, useState } from 'react'
import todoApi from "../api/todoApi";
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { useTodoStore } from '../stores/todoStore';

const initialInput = {
  taskName: '',
  userId: ''
}

function TodoPage() {
  const [input, setInput] = useState(initialInput)
  const [isLoading, setIsLoading] = useState(false)

  const UserId = useAuthStore((state) => state.userId)
  const todoList = useTodoStore((state) => state.todo)
  const getTodoList = useTodoStore((state) => state.getTodoList)

  useEffect(() => {
    getTodoList(39)
    setInput(prev => ({ ...prev, ["userId"]: UserId }))
    console.log(todoList)
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setInput(prev => ({ ...prev, [id]: value }))
    // setInputError(prev => ({...prev, [id]:''}))
  }

  const handleCreate = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      
      const res = await todoApi.post(input)
      console.log(res.data)

      setInput(initialInput)

      toast.success('Create Success.')
    } catch (error) {
      console.log(error)
      toast.error("TodoList invalid")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gradient-to-t from-[#20193B] to-[#421D6B]">
      <div className="card bg-[#1E1E1E] w-96 shadow-sm">
        <form className="card-body p-10" >

          <img
            className='w-30 h-30 absolute right-1 top-1'
            src='../image/rocket.svg' />

          <h1 className="text-3xl font-bold text-base-100 mb-2">TODO LIST</h1>
          <div className='flex flex-row justify-center items-end gap-2'>

            {/* Input อยู่นี่ */}
            <input
              id="taskName"
              onChange={handleChange}
              value={input.taskName}
              type="text"
              placeholder="New Task"
              className="input input-ghost text-xl text-base-200 active:bg-[#1E1E1E] mt-5" />

            <button className="btn btn-soft" onClick={handleCreate}>Create</button>
          </div>
          <hr className='text-base-300' />
          {/* {todoList.map(el => (
            <p>{el.taskName}</p>
          ))} */}
        </form>
      </div>
    </div>
  )
}

export default TodoPage