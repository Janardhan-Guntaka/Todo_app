import ListHeader from './components/ListHeader';
import { useEffect,useState } from 'react';
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {

  const [cookies, setCookies, removeCookies] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.Auth
  const [tasks,setTasks] = useState(null)

  const getData = async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`); // Interpolate userEmail variable in URL
      const json = await response.json();
      setTasks(json)
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  }, []); // Call getData function on component mount
  console.log(tasks)

  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date)-new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listname={"Holiday Tick List"} getData={getData}/>
      <p>Welcome Back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
      </>}
    </div>
  );
}

export default App;
