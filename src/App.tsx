import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import Users from './pages/users/Users'

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/users" element={<Users />} />
    </Route>
  </Routes>
)

export default App
