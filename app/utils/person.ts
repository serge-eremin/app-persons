export interface Person {
  name: {
    title: string,
    first: string,
    last: string
  },
  location: {
    street: {
      number: number,
      name: string
    },
    city: string,
    state: string,
    country: string,
    postcode: number,
  },
  email: string,
  dob: {
    date: string,
    age: number
  },
  phone: string,
  cell: string,
  id: {
    name: string,
    value
      :
      string
  },
  picture: {
    large: string,
    medium
      :
      string,
    thumbnail
      :
      string
  }
}