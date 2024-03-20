import axios from 'axios'

export default async function getPersons() {
  const { data } = await axios.get(`https://randomuser.me/api/?seed=sees&results=10`)
  return data
}


