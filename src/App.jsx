import {Routes,Route, BrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ItemsPage from "./pages/ItemsPage"
import SearchResultsPage from "./pages/SearchResultsPage"
import NoMatch from './pages/NoMatch'
import Meals from './pages/Meals'
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/:catName' element={<ItemsPage/>}/>
      <Route path="/:catName/item" element={<Meals />} />
      <Route path='/SearchResults/:data' element={<SearchResultsPage/>}/>
      <Route path="*" element={<NoMatch/>}/>
    </Routes>
   
  )
}

export default App;
