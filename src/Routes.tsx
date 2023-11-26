import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddEvent from './pages/events/AddEvent/AddEvent'
import Calendar from './pages/calendar/Calendar'
import MyEvents from './pages/user/MyAccount/MyEvents/MyEvents'
import MyProfile from './pages/user/MyAccount/MyProfile/MyProfile'
import MySettings from './pages/user/MyAccount/MySettings/MySettings'
import Navbar from './components/Navbar/Navbar'
import PageNotFound from './components/PageNotFound/PageNotFound'
import SearchEvents from './pages/events/SearchEvents/SearchEvents'
import SharedEvent from './pages/events/ShareEvent/SharedEvent'
import Welcome from './pages/home/Welcome'

const AppRoutes: FC = () => (
  <>
    <Navbar />

    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path='/' element={<Welcome />} />
      <Route path='/searchEvents' element={<SearchEvents />} />
      <Route path='/addEvent' element={<AddEvent />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/sharedEvent/:id' element={<SharedEvent />} />
      <Route path='/user/:id/profile' element={<MyProfile />} />
      <Route path='/user/:id/events' element={<MyEvents />} />
      <Route path='/user/:id/settings' element={<MySettings />} />
    </Routes>
  </>
)

export default AppRoutes
