import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../reducer/actions"
import './styles/Filter.css'

export default function Filter(){
    const {types, filters} = useSelector((state) => state)
    const dispatch = useDispatch()
    const [typeFilter, setTypeFilter] = useState(filters.typeFilter)
    const [originFilter, setOriginFilter] = useState(filters.originFilter)

    useEffect(() => {
        dispatch(changeFilter({...filters, typeFilter}))
    }, [typeFilter])

    useEffect(() => {
        dispatch(changeFilter({...filters, originFilter}))
    }, [originFilter])

    function handleTypesChange(e){
        if(e.target.value === 'delAll') return setTypeFilter([])
        if(typeFilter.find(x => x === e.target.value)) {
            setTypeFilter(typeFilter.filter(x => x !== e.target.value)) 
        }else{
            setTypeFilter([...typeFilter, e.target.value])
        }
    }
    function handleOriginChange(e){
        setOriginFilter(e.target.checked ? e.target.value : 'All') 
    }
    return(

        <div className="filters">
            <h3 style={{userSelect: 'none'}}>Filter</h3>
            <label style={{userSelect: 'none'}}>
                <input type="checkbox"
                className="check"
                value='My'
                checked={originFilter === 'My'}
                onChange={handleOriginChange}/>
                Only my Pokemons
            </label>
            <label style={{userSelect: 'none'}}>
                <input type="checkbox"
                className="check"
                value='Original'
                checked={originFilter === 'Original'}
                onChange={handleOriginChange}/>
                Only Originals
            </label>
            <div className="filtrarTipo">
                <label style={{userSelect: 'none'}} htmlFor='filtrarTipo'>Type </label>
                <select name='filtrarTipo' value={'-Tipo-'} onChange={handleTypesChange}>
                    <option value='-Tipo-' disabled>-Type-</option>
                    {types.map(t => !typeFilter.find(x => x === t) ? <option key={t} value={t}>{capitalize(t)}</option> : null)}
                </select>
                {typeFilter.length ? <button className='delAll' value='delAll' 
                onClick={handleTypesChange}>🗑️All</button> : null}
            </div>
            <div className="typeFilList">
                {typeFilter.map(t => 
                    <button key={t} type="button" className='typeFil' value={t} onClick={handleTypesChange}
                    style={{content:`${t}`}}>
                        ✕ {capitalize(t)}
                    </button>)}
            </div>
        </div>
    )
}
const capitalize = (str) => str[0].toUpperCase()+str.slice(1) 