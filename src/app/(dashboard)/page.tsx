'use client'

import Card from "@/components/Card"
import { Divider, Typography } from "@mui/material"
import CustomContainer from '@/components/CustomContainer';

export default function Home() {

  return (
    <>
      <title>
        Dasboard | CCESS
      </title>
      <CustomContainer title="Dashboad - Pátio">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </CustomContainer>
    </>
  )
}
