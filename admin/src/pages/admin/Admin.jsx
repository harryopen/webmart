import Addproduct from "../../component/addproduct/Addproduct";
import Listproduct from "../../component/listproduct/Listproduct";
import Sidebar from "../../component/sidebar/Sidebar"
import{Routes,Route} from 'react-router-dom';
import './Admin.css'

const Admin = () => {
  return (
    <div  className="admin" style={{backgrounmd:"black"}}>
       <Sidebar/>
       <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/listproduct' element={<Listproduct/>}/>
       </Routes>

    </div>
  )
}

export default Admin