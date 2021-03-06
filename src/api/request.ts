import { axiosInstance } from "./config"

// 获取轮播图
export const getBannerRequest = (): Promise<TSBannersProps.BannersList> => {
  return axiosInstance.get('./banner') 
}
// 获取推荐列表
export const getRecommendListRequest = (): Promise<TSPersonalizedData.PersonalizedList> => {
  return axiosInstance.get("/personalized")
}

export const getHotSingerListRequest  = (count: number): Promise<TSHotArtistsData.HotArtistsList> => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (props: TSSingersList.SingerListProps): Promise<TSSingersList.SingerList> => {
  return axiosInstance.get(`/artist/list?type=${props.type}&area=${props.area}&initial=${props.alpha?.toLowerCase()}&offset=${props.count}`)
}

export const getRankListRequest = (): Promise<TSRankData.RankList> => {
  return axiosInstance.get("/toplist/detail")
}

export const getAlbumDetailRequest = (id: number): Promise<TSPlayListData.PlayList> => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
}

export const getSingerInfoRequest = (id: number): Promise<TSSingerData.SingerList> => {
  return axiosInstance.get(`/artists?id=${id}`)
}

// 获取歌词
export const getLyricRequest = (id: number): Promise<TSLrcProps.LrcList> => {
  return axiosInstance.get(`/lyric?id=${id}`)
}
// 获取热词
export const getHotKeyWordsRequest = (): Promise<TSHot.HotRssp> => {
  return axiosInstance.get('/search/hot')
}
export const getSuggestListRequest = (query: string): Promise<TSSuggest.SuggestResp> => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`)
}
export const getResultSongsListRequest  = (query: string): Promise<TSSong.SongResp> => {
  return axiosInstance.get(`/search?keywords=${query}`)
}
export const getSongDetailRequest = (id: number): Promise<any> => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};