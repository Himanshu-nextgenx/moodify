import "./features/shared/styles/global.scss"
import { RouterProvider } from 'react-router'
import { AuthProvider } from "./features/auth/auth.context.jsx"
import router from './app.routes.jsx'
import { SongContextProvider } from "./features/Home/song.context.jsx"

function App() {
 

  return (
    <>
    <AuthProvider>
      <SongContextProvider>
    <RouterProvider router={router}/>
    </SongContextProvider>
    </AuthProvider>
    </>
  )
}

export default App
