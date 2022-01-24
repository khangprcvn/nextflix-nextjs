const getCommonVideos = async url => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const baseUrl = 'youtube.googleapis.com/youtube/v3'

    const youtubeUrl = `https://${baseUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`

    const response = await fetch(youtubeUrl)
    const videos = await response.json()

    if (videos?.error) {
      console.log(videos?.error?.message)
      return []
    }

    return videos.items.map(item => {
      return {
        title: item.snippet.title,
        id: item.id.videoId ?? item.id,
        url: item.snippet.thumbnails.high.url,
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getVideos = searchQuery => {
  const url = `search?part=snippet&q=${searchQuery}&type=video`
  return getCommonVideos(url)
}

export const getPopularVideos = () => {
  const URL =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'
  return getCommonVideos(URL)
}
