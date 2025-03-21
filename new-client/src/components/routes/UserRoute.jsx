import {useSelector} from 'react-redux'
import { selectUser } from '../../store/slices/user-slice'
import {Navigate} from 'react-router-dom'
import Header from '../page-components/Header'
import Footer from '../page-components/Footer'

const UserRoute = ({children}) => {
    const user = useSelector(selectUser)
    if(user && user.accessLevel === 0){
        return (<><Header/>{children}<Footer/></>)
    }
    return (
        <Navigate to="/login" />
    )
 
}

export default UserRoute
