import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import TopRated from '../components/Home/TopRated'


const Home = () => {
  return (
    <div className='bg-zinc-900 text-white h-auto'>

      <Hero />
      <RecentlyAdded />
      <TopRated />

    </div>
  )
}

export default Home