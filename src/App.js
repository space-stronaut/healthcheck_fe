import Routes from './routes';
import {useEffect} from 'react'
import {useRecoilValue} from 'recoil'
import {authenticated} from './store/authStore'
import axios from 'axios';
import {Image} from './pages/Image'


function App() {
  // const [auth, setAuth] = useRecoilValue(authenticated)
  const [data, setData] = React.useState([])
  const fileName = "myfile"; // here enter filename for your excel file

  

  const getData = async() => {
    try {
      const response = await axios.get('/user/me', {
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    })
    console.log(response)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchData = () =>{
      axios.get('https://jsonplaceholder.typicode.com/posts').then(r => setData(r.data) )
     }
     fetchData()
    getData()
  }, [])

  return (
    <div className="App">
      <Image apiData={data} fileName={fileName} />
      <Routes />
    </div>
  );
}

export default App;
