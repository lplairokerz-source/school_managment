
import axios from 'axios'

// Toggle this to switch between mock data and API
export const USE_MOCK = true

const api = axios.create({ baseURL: '/api', timeout: 10000 })

export async function getList(resource) {
  if (USE_MOCK) {
    const data = JSON.parse(localStorage.getItem(resource) || '[]')
    return data
  }
  const { data } = await api.get(`/${resource}`)
  return data
}

export async function createItem(resource, payload) {
  if (USE_MOCK) {
    const data = JSON.parse(localStorage.getItem(resource) || '[]')
    data.push({ id: Date.now(), ...payload })
    localStorage.setItem(resource, JSON.stringify(data))
    return { ok: true }
  }
  const { data } = await api.post(`/${resource}`, payload)
  return data
}

export async function callSP(name, params = {}) {
  if (USE_MOCK) {
    // Return synthetic result for demo
    return { sp: name, params, result: 'Mocked response' }
  }
  const { data } = await api.post(`/sp/${name}`, params)
  return data
}
