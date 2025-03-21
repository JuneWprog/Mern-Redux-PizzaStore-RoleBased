import {useSelector} from 'react-redux'
import { selectUser } from '../../store/slices/user-slice'
import {Navigate} from 'react-router-dom'
import AdminHeader from '../admin/AdminHeader'
import Footer from '../page-components/Footer'

const AdminRoute = ({children}) => {
    const user = useSelector(selectUser)
    if(user && user.accessLevel === 1){
        return (<><AdminHeader/>{children }<Footer/></>)
    }
    return (
        <Navigate to="/login" />
    )
 
}

export default AdminRoute
