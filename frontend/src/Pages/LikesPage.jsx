import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa'
import { formatDate } from '../utils/functions'

const LikesPage = () => {
  const [Likes, setLikes] = useState([])
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    const Likeinfo =async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/users/likes", {
          method: "POST",
          credentials: 'include'
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        console.log("rendered")
        setLikes(data.likedBy)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    Likeinfo()
  }, [])
  console.log(Likes)
  if (!Likes) return (
    <div className='relative overflow-x-auto shadow-md rounded-lg px-4'>
      <div className='w-full text-xl text-center glassmorphism overflow-hidden' >
        <h1 className='font-bold text-3xl '>No Likers</h1>
      </div>
    </div>
  )

  return (
    <div className='relative overflow-x-auto shadow-md rounded-lg px-4'>
      <table className='w-full text-sm text-left rtl:text-right glassmorphism overflow-hidden'>
        <thead className='text-xs uppercase glassmorphism'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>No</div>
            </th>
            <th scope='col' className='px-6 py-3'>
              username
            </th>
            <th scope='col' className='px-6 py-3'>
              Date
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Likes?.map((Likes, idx) => {
            return (
                  <tr className='glassmorphism border-b'>
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <span>{idx + 1}</span>
                      </div>
                    </td>
                    <th scope='row' className='flex items-center px-6 py-4 whitespace-nowrap '>
                      <img
                        className='w-10 h-10 rounded-full'
                        src={Likes?.avatarUrl}
                        alt='User avatar'
                      />
                      <div className='ps-3'>
                        <div className='text-base font-semibold'>{Likes?.username}</div>
                      </div>
                    </th>
                    <td className='px-6 py-4'>{formatDate(Likes?.likedDate)}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        <FaHeart size={22} className='text-red-500 mx-2' />
                        Liked your profile
                      </div>
                    </td>
                  </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LikesPage