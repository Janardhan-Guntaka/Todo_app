import { useState } from 'react';
import Model from './Model'
import { useCookies } from 'react-cookie';
import Auth from './Auth';
const ListHeader = ({listname, getData}) => {
    const [cookies, setCookies, removeCookie] = useCookies(null)
    const [showModel, setShowModel] =useState(false)
    const signout=()=>{
        console.log('signout')
        removeCookie('Auth')
        removeCookie('Email')
        window.location.reload()
    }
    return (
        <div className="list-header">
            <h1>{listname}</h1>
            <div className='button-container'>
                <button className='create' onClick={()=> setShowModel(true)}>add new</button>
                <button className='signout' onClick={signout}>SignOut</button>
            </div>
            {showModel && <Model mode={'create'} setShowModel={setShowModel} getData={getData}/>}
        </div>
    )
}

export default ListHeader;