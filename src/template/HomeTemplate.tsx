import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
type Props = {}

export default function HomeTemplate({}: Props) {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}