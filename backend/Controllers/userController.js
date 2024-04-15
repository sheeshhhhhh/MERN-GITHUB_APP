


export const profile = async (req, res) => {
    try {
        const { username } = req.params
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: 'token' + process.env.GITHUB_KEY
            }
        })
        const userProfile = await userResponse.json()

        const repoResponse = await fetch(userProfile.repos_url, {
            headers: {
                authorization: 'token' + process.env.GITHUB_KEY
            }
        })
        
        const repos = await repoResponse.json()
        repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) // decending, recent first

        res.status(200).json({ userProfile, repos })
    } catch (error) {
        console.log("error in the api/users controller", error)
        res.status(500).json({ error : error.message })
    }
}