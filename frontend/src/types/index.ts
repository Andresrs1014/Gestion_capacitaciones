export interface Area {
  id: number
  nombre: string
  activa: boolean
}

export interface Capacitacion {
  id: string
  nombre_capacitador: string
  area_capacitadora: Area
  tema: string
  descripcion: string | null
  archivo_url: string | null
  archivo_nombre: string | null
  archivo_tipo: string | null
  archivo_tamanio: number | null
  fecha_carga: string
  created_at: string
  areas_destino: Area[]
}

export type Tema = 'dark' | 'light'