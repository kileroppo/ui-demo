import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'ui-demo-projects'
const SYNC_EVENT = 'projects-updated'

export interface Project {
  id: string
  name: string
  styleId: number
  colorPalette: string[]
  fontChoice: string
  createdAt: string
}

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is Project =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.name === 'string'
    )
  } catch {
    return []
  }
}

function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    // ignore localStorage errors
  }
  window.dispatchEvent(new CustomEvent(SYNC_EVENT))
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects)

  useEffect(() => {
    const handleSync = () => {
      setProjects(loadProjects())
    }
    window.addEventListener(SYNC_EVENT, handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  const createProject = useCallback(
    (data: Omit<Project, 'id' | 'createdAt'>) => {
      const newProject: Project = {
        ...data,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString(),
      }
      setProjects((prev) => {
        const next = [...prev, newProject]
        saveProjects(next)
        return next
      })
      return newProject
    },
    []
  )

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id)
      saveProjects(next)
      return next
    })
  }, [])

  const updateProject = useCallback(
    (id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
      setProjects((prev) => {
        const next = prev.map((p) => (p.id === id ? { ...p, ...data } : p))
        saveProjects(next)
        return next
      })
    },
    []
  )

  const getProject = useCallback(
    (id: string) => {
      return projects.find((p) => p.id === id) || null
    },
    [projects]
  )

  return { projects, createProject, deleteProject, updateProject, getProject }
}
