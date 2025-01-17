import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import { apiUrl, filterData } from './data';
import { toast } from 'react-toastify';
import Spinner from "./components/Spinner";



const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json()
      // saving into a variable
      setCourses(output.data);
      // console.log(courses);
    }
    catch {
      toast.error("Something went wrong");
    }
    setLoading(false);

  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className=' bg-[#0c4a6e] min-h-screen flex flex-col'>
      <div>
        <Navbar />
      </div>
      <div className=' bg-[#0c4a6e] bg-opacity-90'>
        <div>
          <Filter filterData={filterData}
            category={category}
            setCategory={setCategory} />
        </div>
        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
          {loading ? (<Spinner />) : <Cards courses={courses} category={category} />}
        </div>
      </div>
    </div>
  )
}

export default App;
