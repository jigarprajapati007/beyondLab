import logo from "../../assets/Header/Logo.svg"
import "../../style/header.scss"
export const Header = () => {
  return (
    <div className='header-container'>
        <img src={logo} alt="" className='img-logo'/>
        <div className='text-div'>
            <h5>Company</h5>
            <h5>Case studies</h5>
            <h5>Impact</h5>
            <h5>Operations</h5>
            <h5>Career</h5>
        </div>
        <div className='text-div-last'>
            <h5>Build with us</h5>
        </div>
    </div>
  )
}
