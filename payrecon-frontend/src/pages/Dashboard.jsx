import React from 'react'
import StatsGrid from '../components/dashboard/StatsGrid'
import ChartsSection from '../components/dashboard/charts/ChartsSection'
import RecentBatches from '../components/dashboard/RecentBatches'

const Dashboard = () => {
  return (
    <div>
      <StatsGrid />
      <ChartsSection />
      <RecentBatches />
    </div>
  )
}

export default Dashboard