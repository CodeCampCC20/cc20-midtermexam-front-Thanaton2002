import React, { useEffect, useState } from 'react'
import todoApi from "../api/todoApi";
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { useTodoStore } from '../stores/todoStore';
import { SquareX, PencilRuler } from 'lucide-react';

const initialInput = {
  taskName: '',
  userId: ''
}


function TodoPage() {
  const [input, setInput] = useState(initialInput)
  const [inputEdit, setInputEdit] = useState(initialInput)
  const [isEdit, setIsEdit] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const userId = useAuthStore((state) => state.userId)
  const todoAbc = useTodoStore((state) => state.todoAbc)
  const getTodoList = useTodoStore((state) => state.getTodoList)

  useEffect(() => {
    getTodoList(userId)
    setInput(prev => ({ ...prev, ["userId"]: userId }))
  }, [])
  console.log(todoAbc)


  const handleChange = (e) => {
    const { id, value } = e.target
    setInput(prev => ({ ...prev, [id]: value }))
    // setInputError(prev => ({...prev, [id]:''}))
  }


  const handleDelete = async (id) => {
    try {
      
      await todoApi.delete(id, userId)
      await getTodoList(userId)

      toast.success('Delete Success.')
    }catch(error){
      toast.error('Delete error', error)
    } 
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
      getTodoList(userId)
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

            <input
              id="taskName"
              onChange={handleChange}
              value={input.taskName}
              type="text"
              placeholder="New task"
              className="input input-ghost text-xl text-base-200 active:bg-[#1E1E1E] mt-5" />

            <button className="btn btn-soft" onClick={handleCreate}>Create</button>
          </div>
          <hr className='text-base-300' />
          <ul className="list bg-base-100 rounded-box shadow-md overflow-scroll max-h-[300px]">
            <span className="p-4 pb-2 text-xs opacity-60 tracking-wide">My List</span>

            {todoAbc.map((el) =>
              <>
                {isEdit === el.id ?
                  <>
                    <li key={el.id} className="list-row">
                      <div className="list-col-grow">
                        <div className='cursor-default'>{el.id}</div>

                        <input 
                        id={el.id}
                        className="input input-xs"
                        value={inputEdit.taskName}
                        />

                      </div>
                      <button key={el.id}><PencilRuler className='w-5 h-5 hover:text-orange-700/70 duration-200 active:text-orange-700/40' /></button>
                      <button key={el.id}><SquareX className='w-5 h-5 hover:text-red-700/70 duration-200 active:text-red-700/40' /></button>
                    </li>
                  </>
                  : <>
                    <li key={el.id} className="list-row">
                      <div className="list-col-grow">
                        <div className='cursor-default'>{el.id}</div>
                        <div className="text-xs uppercase font-semibold opacity-60 cursor-default">{el.taskName}</div>
                      </div>
                      <button ><PencilRuler className='w-5 h-5 hover:text-orange-700/70 duration-200 active:text-orange-700/40' /></button>
                      <button onClick={() => handleDelete(el.id)}><SquareX className='w-5 h-5 hover:text-red-700/70 duration-200 active:text-red-700/40' /></button>
                    </li>
                  </>

                }

              </>
            )}

          </ul>
        </form>
      </div>
    </div>
  )
}

export default TodoPage