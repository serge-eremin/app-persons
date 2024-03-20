import { useLoaderData, useNavigate } from '@remix-run/react'
import { Person } from '~/utils/person'
import getPersons from '~/utils/api'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'

export async function loader({ params }: any) {
  const data = await getPersons()
  const personData = data.results
  const person = personData.find((p: any) => {
    const id = `${p.email}-${p.dob.date}-${p.cell}`
    return id === params.personId
  })
  return person
}

export default function UserProfilePage() {
  const data: Person = useLoaderData()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const fullAddress = `${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}, ${data.location.country}`

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ border: '1px solid lightgrey', width: '400px' }}>
        <CardContent>
          <Typography variant="h5"> {data.name.first} {data.name.last} </Typography>
          <>
            <img src={data.picture.medium} alt="profile image"/>
            <Typography>Age: {data.dob.age}</Typography>
            <Typography>E-mail: {data.email}</Typography>
            <Typography>Date of Birth: {data.dob.date}</Typography>
            <Typography>Mobile Number: {data.cell}</Typography>
            <Typography>Phone Number: {data.phone}</Typography>
            <Typography>Address: {fullAddress}</Typography>
          </>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button size="small" onClick={handleBack}>Back</Button>
        </CardActions>
      </Card>
    </Box>
  )
}
