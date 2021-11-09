import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changePage, getPokemons, toogleMenu, upTot } from '../reducer/actions';
import Filter from './Filter';
import Loading from './Loading';
import Order from './Order';
import NotFound from './NotFound';
import './styles/Cards.css';
import { CreateBtn, SearchBar } from './Nav';
import { useEffect, useState } from 'react';

export default function Cards(){
    const {pokemons,page,order,types,filters,menu, tot} = useSelector((state) => state)
    const dispatch = useDispatch()
    
    const ordered = orderMachine(order, pokemons, types)
    const filtered = filterMachine(filters, ordered)    
    const pokeGroup = filtered.slice((page-1)*12, page*12)

    function handlePage(pag){
        if (page === pag) return;
        if (pag > Math.ceil(filtered.length/12) || pag < 1) return;
        dispatch(changePage(pag))
    }

    function handleMore(){
        const q = pokemons.filter(x => x.origin !== 'My').length
        if(q === 0) return dispatch(getPokemons())
        dispatch(upTot(40))
        dispatch(getPokemons((q/40)+1))
    }

    return(
        !pokemons.length ? <><div className="footerFix"><Loading/></div></> : <div className="cardsAndFilterContainer">
            
            <div className="footerFix"/>
            <div className={!menu ? "filterAndOrderContainer" : "filterAndOrderContainerDeployed"}>
                <CreateBtn class='movil'/>
                <SearchBar class='movil'/>
                <Order/>
                <Filter/>
            </div>
            <div className={'cardsContainer'+(menu ? ' blur' : '')}>

                {!pokeGroup.length ? null : <Paginado handlepage={handlePage} page={page} filtered={filtered}/>}

                <div className='cards'>
                    {menu && <div className="blurScreen" onClick={() =>{dispatch(toogleMenu(false))}}></div>}
                    {!pokeGroup.length ? <NotFound ret={false}/> : pokeGroup.map(p => 
                        <NavLink to={`/home/${p.id}`} key={p.id}>
                            <div className='card'>
                                <span className='name'>{capitalize(p.name)}</span>
                                <img alt='' className='cardImg' src={p.image}/>
                                <div className='types'>
                                    {p.types?.map(t => {
                                        return (
                                            <div key={t} className='type'>
                                                <img alt='' className='typeImg' src={`typesLogos/${t}.png`}/>
                                                <p >{capitalize(t)}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </NavLink>
                    )}
                </div>
                
                {!pokeGroup.length ? null : <Paginado handlepage={handlePage} page={page} filtered={filtered}/>}
                
                {pokemons.length === tot ? <button className='loadMore' onClick={handleMore}>Cargar Mas...</button> : <LoadCircle/>}
            </div>
        </div>
    )
}
function LoadCircle(){
    const {pokemons} = useSelector((state) => state)
    const dispatch = useDispatch()
    return(
        <div className='loadCircleContainer'>
            <div className='loadCircle'></div>
            {setTimeout(() => {<button onClick={() => {dispatch(upTot(pokemons.length))}}>cancelar</button>}, 10000)}
        </div>
    )
}

function Paginado({handlepage, page, filtered}){
    const limit = 5
    const totPages = Math.ceil(filtered.length/12)
    const buttons = []
    for (let i = -(limit-1)/2; i <= (limit-1)/2; i++){
        if(page+i <= totPages && page+i > 0) buttons.push(page+i)
    }

    return(<>
        <div className='pages'>
            {page > 1 && <button className='page btn' onClick={() => {handlepage(page-1)}}>{'<'}</button>}
            {!buttons.find(x=>x===1) && <button className='page btn' onClick={() => {handlepage(1)}}>{'1'}</button>}
            {2 < buttons[0] && <div className='page disabled'>...</div>}
            {buttons.map(p => 
                <button key={p} 
                className={`page ${page===p ? 'flag' : 'btn'}`} 
                onClick={() => {handlepage(p)}}>{p}</button>)}
            {totPages-1 > buttons[buttons.length-1] && <div className='page disabled'>...</div>}
            {!buttons.find(x=>x===totPages) && <button className='page btn' onClick={() => {handlepage(totPages)}}>{totPages}</button>}
            {page < totPages && <button className='page btn' onClick={() => {handlepage(page-1)}}>{'>'}</button>}
        </div>
    </>)
}

function orderMachine(order, pokemons, types){
    switch(order){
        case 'A - Z': 
        return pokemons.sort((a,b) => a.name.localeCompare(b.name))

        case 'Z - A': 
        return pokemons.sort((a,b) => b.name.localeCompare(a.name))

        case 'Mas fuerte': 
        return pokemons.sort((a,b) => b.attack-a.attack)

        case 'Mas defensivo': 
        return pokemons.sort((a,b) => b.defense-a.defense)
        
        case 'Mas rapido': 
        return pokemons.sort((a,b) => b.speed-a.speed)
        
        default: return pokemons
    }
}

function filterMachine(filters, pokemons){
    let pokeGroup = pokemons
    filters.typeFilter.forEach(element => {
        pokeGroup = pokeGroup.filter(p => 
            p.types?.map(t => t).find(x => x === element))
    })
    if(filters.originFilter !== 'All') pokeGroup = pokeGroup.filter(x => x.origin === filters.originFilter)
    return pokeGroup
}

function newOrdArray(n){
    let arr = []
    for(var i = 1; i <= n; i++){
        arr.push(i)
    }
    return arr
}

const capitalize = (str) => str[0].toUpperCase()+str.slice(1) 
