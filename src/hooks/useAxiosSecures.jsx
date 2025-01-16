import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000/',
   
  });

const useAxiosSecures = () => {
    return instance
};

export default useAxiosSecures;