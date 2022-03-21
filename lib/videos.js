import videosData from '../data/videos.json'

const fetchVideos = async url => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const baseUrl = 'youtube.googleapis.com/youtube/v3'

  const youtubeUrl = `https://${baseUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`

  const response = await fetch(youtubeUrl)
  return await response.json()
}

const getCommonVideos = async url => {
  try {
    const isDev = process.env.DEVELOPMENT
    const videos = isDev ? videosData : await fetchVideos(url)

    if (videos?.error) {
      console.log(videos?.error?.message)
      return []
    }

    return videos.items.map(item => {
      const id = item.id?.videoId || item.id
      const snippet = item.snippet
      return {
        title: snippet?.title,
        id,
        url: snippet.thumbnails.high.url,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
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

export const getVideoById = videoId => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
  return getCommonVideos(URL)
}
