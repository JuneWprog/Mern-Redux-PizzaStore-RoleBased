import Header from '../page-components/Header'
import Footer from '../page-components/Footer'


const PublicRoute = ({children}) => {
    
    return (<><Header/>{children}<Footer/></>)
    
}

export default PublicRoute        