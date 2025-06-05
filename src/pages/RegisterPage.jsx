import { useState } from "react"
import InputForm from "../components/form/InputForm"
import { schemaLogin } from "../validators/schemaAuth"
import authApi from "../api/authApi"
import { useNavigate } from 'react-router'
import { toast } from "react-toastify"
import { Send } from "lucide-react"
import * as Yup from "yup"
import { Loader } from "lucide-react"
import { useAuthStore } from "../stores/authStore"


const initialInput = {
  username: '',
  password: '',
  confirmPassword: ''
}

function RegisterPage() {
  const [input, setInput] = useState(initialInput)
  const [inputError, setInputError] = useState(initialInput)
  const [isLoading, setIsLoading] = useState(false)

  const navi = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setInput(prev => ({ ...prev, [id]: value }))
    // setInputError(prev => ({...prev, [id]:''}))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      setIsLoading(true)

      schemaLogin.validateSync(input, { abortEarly: false })


      const res = await authApi.register(input)
      console.log(res.data)

      setInput(initialInput)
      navi('/login')

      toast.success('Register Success.')
    } catch (error) {
      console.log(error)
      toast.error('Register invalid.')

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message
          return acc
        }, {})
        setInputError(err)
      }
    } finally {
    setIsLoading(false)
  }
}

return (
  <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#121826]">
    <div className="card bg-[#212936] w-96 shadow-sm">
      <form className="card-body p-10" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-base-100 mb-2">Register</h1>
        <InputForm
          id="username"
          placeholder="Username"
          handleChange={handleChange}
          error={inputError.username}
          value={input.email}/>

        <InputForm
          id="password"
          placeholder="Password"
          handleChange={handleChange}
          error={inputError.password}
          value={input.password}/>
        
        <InputForm
          id="confirmPassword"
          placeholder="Confirm password"
          handleChange={handleChange}
          error={inputError.confirmPassword}
          value={input.confirmPassword}/>

        <button disabled={isLoading} className='btn btn-primary mt-3 bg-[#394050] hover:bg-[#525c72] border-0'>
          {isLoading ?
            <>
              <Loader className='w-5 h-5 animate-spin' />
              <span>Still Loading...</span>
            </>
            : <>
              <Send className="w-5 h-5" />
              <span className="font-bold">Register</span>
            </>
          }
        </button>
      </form>
    </div>
  </div>
)
}

export default RegisterPage