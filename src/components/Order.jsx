import { useDispatch, useSelector } from "react-redux"
import { changeOrder } from "../reducer/actions"

export default function Order(){
    const {order} = useSelector(state => state)
    const dispatch = useDispatch()  

    function handleChange(e){
        dispatch(changeOrder(e.target.value))
    }
    
    return(<>
        <h3>Ordenar</h3>
        <div>
            <label htmlFor="Ordenar">Por </label>
            <select name="Ordenar" defaultValue={order} onChange={handleChange}>
                <option value="A - Z">A - Z</option>
                <option value="Z - A">Z - A</option>
                <option value="Mas fuerte">Mas Fuerte</option>
                <option value="Mas defensivo">Mas Defensivo</option>
                <option value="Mas rapido">Mas Rapido</option>
            </select>
        </div>
        </>
    )
} 
