import { useDispatch, useSelector } from "react-redux"
import { changeOrder } from "../reducer/actions"

export default function Order(){
    const {order} = useSelector(state => state)
    const dispatch = useDispatch()  

    function handleChange(e){
        dispatch(changeOrder(e.target.value))
    }
    
    return(<>
        <h3 style={{userSelect: 'none'}}>Order</h3>
        <div>
            <label style={{userSelect: 'none'}} htmlFor="Ordenar">By </label>
            <select name="Ordenar" defaultValue={order} onChange={handleChange}>
                <option value="A - Z">A - Z</option>
                <option value="Z - A">Z - A</option>
                <option value="Mas fuerte">Stronger</option>
                <option value="Mas defensivo">More defensive</option>
                <option value="Mas rapido">Faster</option>
            </select>
        </div>
        </>
    )
} 
