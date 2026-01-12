import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { fetchWithCSRF } from "@/assets/scripts/csrf"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const fetchSaveFiles = async (gameId: string) => {
  const response = await fetchWithCSRF(`/api/gamesaves/get_gamesaves/${gameId}/`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  const result = await response.json()
  return result
}

export const uploadSaveFile = async (file: File, gameId: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('game_id', gameId)
  
   const response = await fetchWithCSRF(`/api/gamesaves/upload_save_file/${gameId}`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })
  
  if (!response.ok) throw new Error('Upload failed')
  return response.json()
}

export const deleteSaveFile = async (saveId: string) => {
  const response = await fetchWithCSRF(`/api/gamesaves/delete/${saveId}/`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
  return response.json()
}


// Watch for a boolean state change and auto-dismiss it after a delay
export const useAutoDismiss = (value: boolean, setValue: (val: boolean) => void, delay: number = 3000) => {
  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => setValue(false), delay)
      return () => clearTimeout(timer)
    }
  }, [value, setValue, delay])
}

