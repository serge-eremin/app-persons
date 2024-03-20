import type { MetaFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import {
  AppBar, Box,
  Divider,
  Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Toolbar,
  Typography
} from '@mui/material'
import { Person } from '~/utils/person'
import getPersons from '~/utils/api'


export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}


export async function loader() {
  const data = await getPersons()
  return data.results
}


export default function HomePage() {
  const data: Person[] = useLoaderData()
  const navigate = useNavigate()

  const handleProfile = (id: string) => {
    navigate(`/${id}`)
  }

  return (
    <>
      <AppBar position={'static'} component={'nav'}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            People
          </Typography>
        </Toolbar>
      </AppBar>

      <Divider/>
      <Box sx={{ width: '700px', mx: 'auto' }}>
        <TableContainer component={Paper} elevation={2} sx={{ m: 2, height: '80vh' }}>
          <Table aria-label="simple table" sx={{ overflowY: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Images</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((p) => {
                const { name, dob, location, email, cell, picture } = p
                const id = `${email}-${dob.date}-${cell}`
                return (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => handleProfile(id)}
                  >
                    <TableCell align="center" component="th" scope="row" sx={{ width: '15%' }}>
                      {<img src={picture.medium} alt="profile image"/>}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '55%' }}>{name.first} {p.name.last}</TableCell>
                    <TableCell align="left" sx={{ width: '10%' }}>{dob.age}</TableCell>
                    <TableCell align="left" sx={{ width: '20%' }}>{location.city}</TableCell>
                  </TableRow>
                )
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
