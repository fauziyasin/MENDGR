import axios from "axios"

//const apiKey = process.env.REACT_APP_API_KEY;
//axios.defaults.baseURL = `https://${process.env.REACT_APP_CLIENT_HOST}`

/**
 * Fetch information from our mongo database
 * 
 * @param col {String} name of the mongo collection to be queried
 * @returns {Array}  array of found indices
 */
  const query = async (col: string) => {
    let user = await axios.get(`/api/db/${col}/query`,
/*     { headers: {'api-key':apiKey}} */
    )
    return user.data.data
  }

  const database = {
    query
  }

  export default database