import AppRouter from "./routers/AppRouter"
import {ToastContainer, Slide} from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer
        autoClose={1500}
        position="top-left"
        transition={Slide}
      />
      <AppRouter/>
    </>
  )
}

export default App
