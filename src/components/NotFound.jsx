import { useHistory } from 'react-router';
import notFound from '../multimedia/notFound.png';
import './styles/NotFound.css'

export default function NotFound(props) {
    return(
        <div className="notfound" >
            {props.ret || props.ret===undefined && <ReturnBtn/>}
            <h1>Ups, no encontramos resultados</h1>
            <div className="notfoundimg">
                <img alt='' src={notFound}/>
            </div>
        </div>
    )
}
export function ReturnBtn(){
    const history = useHistory() 
    return(
        <button className='volver'
        onClick={() => {history.push('/home')}}>⮌Regresar</button>
    )
}