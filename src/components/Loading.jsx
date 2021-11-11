import './styles/Loading.css'

export default function Loading(){
    return(
        <>
            <p className="loading">Loading...</p>
            <div className="base">
                <div className="mitad1"></div>
                <div className="mitad2"></div>
                <div className="line"></div>
                <div className="circle"></div>
                <div className="circle1"></div>
                <div className="circle2"></div>
            </div>
        </>
    )
}