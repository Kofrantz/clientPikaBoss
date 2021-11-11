import { useDispatch, useSelector } from "react-redux"
import { changeOrder } from "../reducer/actions"
import './styles/Order.css'

export default function Order(){
    const {order} = useSelector(state => state)
    const dispatch = useDispatch()  

    function handleChange(e){
        if(e.target.name==='Dir') return dispatch(changeOrder({...order, dir: !order.dir}))
        if(e.target.name==='Ordenar') return dispatch(changeOrder({...order, name: e.target.value}))
    }
    
    return(<>
        <h3 style={{userSelect: 'none'}}>Order</h3>
        <div>
            <label style={{userSelect: 'none'}} htmlFor="Ordenar">By </label>
            <select name="Ordenar" defaultValue={order} onChange={handleChange}>
                <option value="A - Z">{order.dir?'A - Z':"Z - A"}</option>
                {/* <option value="Z - A">Z - A</option> */}
                <option value="Mas fuerte">Attack</option>
                <option value="Mas defensivo">Defense</option>
                <option value="Mas rapido">Speed</option>
            </select>
            <button name="Dir" onClick={handleChange} className={order.dir?'mayorMenor':'menorMayor'}>🠉🠋</button>
        </div>
        </>
    )
} 
