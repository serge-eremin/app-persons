import axios from 'axios'

export default async function getPersons() {
  const { data } = await axios.get(`https://randomuser.me/api/?seed=sees&results=10`)
  if(!data) {
    throw new Error('Network response was not ok')
  }
  return data
}


