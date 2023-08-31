'use client'

import Card from "@/components/Card"
import { Divider, Typography } from "@mui/material"

export default function Home() {

  return (
    <>
      <title>
        Dasboard | CCESS
      </title>
      <Typography variant="h4" className='title-bold'>
        Dashboard
      </Typography>
      <Divider />

      
      <div
        style={{
          display: 'flex',
        }}
      >
        <Card/>
        <Card/>
        <Card/>

        <Card/>

      </div>
    </>
  )
}
