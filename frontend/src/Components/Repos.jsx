import React from 'react'
import Repo from './Repo'

const Repos = ({repos, alwaysFullWidth=false}) => {

  const Repos = alwaysFullWidth ? 'w-full' : 'lg:w-2/3 w-full' 

  return (
    <div className={`${Repos} glassmorphism rounded-lg px-8 py-6`}>
        <ol className='relative border-s border-gray-200'>
            {repos?.map((repo) => {
              return <Repo key={repo.id} repo={repo} />
            })}
        </ol>
        {repos.length === 0 && <p className='flex items-center justify-center h-32'>No Repositories Found</p>}
    </div>
  )
}

export default Repos