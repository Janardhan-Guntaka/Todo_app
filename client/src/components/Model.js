import { useState } from "react"
import {  useCookies } from "react-cookie"

const Model = ({mode, setShowModel, getData, task}) => {
    const editMode = mode === 'edit'? true : false
    const [cookies, setCookies, removeCookies] = useCookies(null)

    const [data, setData] = useState({
        user_email: editMode? task.user_email: cookies.Email,
        title: editMode? task.title:'',
        progress: editMode? task.progress:0,
        date: editMode ? task.date : new Date() // because we will update all these values in data base table
    })

    const postData = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(data)//body is the data sent to server as req.body
            })
            if(response.status===200){
                console.log('Worked')
                setShowModel(false)
                getData()
            }
        }catch(err){
            console.log(err)
        }
    }

    const editData = async(e)=>{
        
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })//USE `` instead of '' for URL interpolation only
            if(response.status===200){
                setShowModel(false)
                getData()
            }
        }catch(err){
            console.error(err)
        }
    }

    const handleChange = (e) =>{
 
        const {name, value} = e.target

        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)
    }
 
    return (
        <div className="overlay">
            <div className="model">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={()=> setShowModel(false)}>X</button>
                </div>

                <form>
                    <input
                    required
                    maxLength={30}
                    placeholder="Your text goes here"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    />
                    <br/>

                    <label htmlFor='range'>Drag your progress</label>

                    <input
                    required
                    type='range'
                    id='range'
                    min='0'
                    max='100'
                    name='progress'
                    value={data.progress}
                    onChange={handleChange}
                    />
                    <input className={mode} type="submit" onClick={editMode?editData:postData}/>
                </form>
            </div>
        </div>
    )
}

export default Model;