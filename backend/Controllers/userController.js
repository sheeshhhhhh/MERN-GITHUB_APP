import User from "../models/UserModel.js"



export const profile = async (req, res) => {
    try {
        const { username } = req.params
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: 'token' + process.env.GITHUB_KEY
            }
        })
        const userProfile = await userResponse.json()
        console.log(userProfile)

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

export const likeprofile = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findById(req.user._id.toString())
       
        const userToLike = await User.findOne({ username: username})

        if(!userToLike) return res.status(400).json({ error: "User is not found"})

        if(user.likeProfiles.includes(userToLike.username)) return res.status(400).json({ error : "Already liked this user"})
        console.log(username.avatarUrl)
        userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now()})
        console.log(userToLike)
        user.likeProfiles.push(userToLike.username)

        await Promise.all([userToLike.save(), user.save()])

        res.status(200).json({ message: "User liked" })
    } catch (error) {
        console.log("error in the api/users controller", error)
        res.status(500).json({ error : error.message})
    }
}

export const getLikes = async (req, res) => {
    try {
        const authuser = req.user._id
        const user = await User.findById(authuser.toString())

        res.status(200).json({likedBy: user.likedBy})
    } catch (error) {
        res.status(500).json({ error : error.message})        
    }
}