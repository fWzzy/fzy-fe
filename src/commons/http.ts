import axios, { AxiosHeaders } from 'axios'
import UserSession from './user-session'

const http = axios.create()

http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

http.interceptors.request.use((config) => {
  // config.headers = config.headers ?? {};
  const authToken = UserSession.getToken()
  if (authToken) {
    const token = `Bearer ${authToken}`
    // config.headers['Authorization'] = token
    config.headers = { ...config.headers } as AxiosHeaders;
    config.headers.set('Authorization', token);
  }

  return config
})

http.interceptors.response.use((response) => response)

export default http