import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import notFound from '../multimedia/notFound.png';
import './styles/NotFound.css'

export default function NotFound(props) {
    const {filters} = useSelector((state)=> state)
    return(
        <div className="notfound" >
            {(props.ret || props.ret===undefined) && <ReturnBtn/>}
            <h1>Ups, we did not find results</h1>
            {props.suggest && filters.typeFilter.length ? <h1>Delete some filters</h1> : null}
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
        onClick={() => {history.push('/home')}}>↩️Back</button>
    )
}