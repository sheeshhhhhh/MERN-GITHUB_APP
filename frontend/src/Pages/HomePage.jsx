import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import ProfileInfo from '../Components/ProfileInfo'
import Repos from '../Components/Repos'
import Search from '../Components/Search'
import SortRepos from '../Components/SortRepos'
import Spinner from '../Components/Spinner'

const HomePage = () => {
  const [userProfile, setUserProfile] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  const [sortType, setSortType] = useState("recent")

  const getUserProfileAndRepos = useCallback(async (username="burakorkmez") => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${username}`)
      const { repos, userProfile } = await res.json()

      setUserProfile(userProfile)
      setRepos(repos)

      //this return is only for Onsearch because we are already updating the useState of userprofile and repos
      return { userProfile, repos}
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])


  const OnSearch = async (e, username) => {
    e.preventDefault()

    setLoading(true)
    setRepos([])
    setUserProfile(null)

    const {userProfile, repos} = await getUserProfileAndRepos(username)
    console.log(userProfile, repos)

    setRepos(repos)
    setUserProfile(userProfile)
    setLoading(false)
    setSortType("recent")
  }

  const onSort = (Sorttype) => {
    if(Sorttype === "recent") {
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) // decending, recent first
    } else if (Sorttype === "stars") {
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count) // decending, most stars first
    } else if (Sorttype === "forks") {
      repos.sort((a,b) => b.forks_count - a.forks_count) //decending, most forks first
    }

    setSortType(Sorttype)
    setRepos([...repos])
  }

  return (
    <div className='m-4 '>
      <Search OnSearch={OnSearch} />
      {repos.length > 0 && < SortRepos onSort={onSort} sortType={sortType} />}
      <div className='flex gap-4 flex-col lg:flex-row justify-center '>
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} /> }
        {!loading && <Repos repos={repos} />}
        
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage