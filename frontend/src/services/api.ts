import axios from 'axios'
import type { Area, Capacitacion } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
})

export default api

export const getAreas = async (): Promise<Area[]> => {
  const { data } = await api.get<Area[]>('/api/areas/')
  return data
}

export const getCapacitaciones = async (): Promise<Capacitacion[]> => {
  const { data } = await api.get<Capacitacion[]>('/api/capacitaciones/')
  return data
}

export const createCapacitacion = async (formData: FormData): Promise<Capacitacion> => {
  const { data } = await api.post<Capacitacion>('/api/capacitaciones/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}