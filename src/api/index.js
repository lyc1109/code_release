import http from '@/utils/https'
import basic from '@/api/basic'
import publics from '@/api/public'
import person from '@/api/person'
// import app from '@/utils/public'

let api = { ...basic, ...publics, ...person }

export default api