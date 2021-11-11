import { Link } from "react-router-dom";
import './styles/Footer.css'

export default function Footer(){
    return(
        <div className="footer">
            <div className="redes">
                <span className="redesTitle">Contact Me</span>
                <a target="_blank" href='https://www.linkedin.com/in/franco-alfano-4a6a7b216/'>
                    <img alt='' className='inLogo' src="Logos/LinkedIn.png"/>
                </a>
            </div>
            <div className="routes">
                <span className="routesTitle">Pages</span>
                <Link to='/create'><div className='aboutBtn'>Create</div></Link>
                <Link to='/about' data-testid='About'><div className='aboutBtn'>About</div></Link>
            </div>
        </div>
    )
}