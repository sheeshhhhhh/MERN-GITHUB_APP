

export const popularrepos = async (req, res) => {
    try {
        const { language } = req.params
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, {
            headers: {
                authorization: 'token' + process.env.GITHUB_KEY
            }
        })
      const data = await response.json()

      // need to make specific key values to be access for this example is repos
      res.status(200).json({repos: data.items})
    } catch (error) {
        res.statu(500).json({ error : error.message })
        console.log("error in the popularrepos controller", error)
    }
}