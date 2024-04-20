import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa6'
import { useAuthContext } from '../context/AuthContext'

const LikeProfile = ({userProfile}) => {
    const [loading, setLoading] = useState(false)
    const { authUser} = useAuthContext()

    const isOwnProfile = authUser?.username === userProfile.login

    const handleLikeProfile = async (username) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/users/Like/${username}`, {
                method: 'POST',
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!authUser) return null


    return (
        <button className='p-2 text-xs w-full font-medium rounded-md glassmorphism border border-blue-400 flex  items-center gap-2'
        onClick={() => handleLikeProfile(userProfile.login)}>
            <FaHeart size={16}/>
            Like Profile
        </button>
    )
}

export default LikeProfile