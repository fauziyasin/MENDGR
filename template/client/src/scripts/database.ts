import axios from "axios"

//const apiKey = process.env.REACT_APP_API_KEY;
//axios.defaults.baseURL = `https://${process.env.REACT_APP_CLIENT_HOST}`

  const query = async (col: string) => {
    let user = await axios.get(`/api/db/${col}/query`,
/*     { headers: {'api-key':apiKey}} */
    )
    return user.data.data
  }

  const database = {
    query
    //nextFn
  }

  export default database