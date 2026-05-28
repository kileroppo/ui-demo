import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProjects } from '../../hooks/useProjects'

describe('useProjects', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty projects', () => {
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toEqual([])
  })

  it('loads existing projects from localStorage', () => {
    const existing = [
      { id: 'abc', name: 'Test Project', styleId: 1, colorPalette: ['#FF0000'], fontChoice: 'Inter', createdAt: '2024-01-01T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(existing))
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toEqual(existing)
  })

  it('creates a new project', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.createProject({
        name: 'New Project',
        styleId: 2,
        colorPalette: ['#00FF00'],
        fontChoice: 'Roboto',
      })
    })

    expect(result.current.projects).toHaveLength(1)
    expect(result.current.projects[0].name).toBe('New Project')
    expect(result.current.projects[0].styleId).toBe(2)
    expect(result.current.projects[0].colorPalette).toEqual(['#00FF00'])
    expect(result.current.projects[0].fontChoice).toBe('Roboto')
    expect(result.current.projects[0].id).toBeDefined()
    expect(result.current.projects[0].createdAt).toBeDefined()
  })

  it('persists created project to localStorage', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.createProject({
        name: 'Persisted',
        styleId: 1,
        colorPalette: [],
        fontChoice: '',
      })
    })

    const stored = JSON.parse(localStorage.getItem('ui-demo-projects')!)
    expect(stored).toHaveLength(1)
    expect(stored[0].name).toBe('Persisted')
  })

  it('deletes a project by id', () => {
    const existing = [
      { id: 'del1', name: 'Keep', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-01T00:00:00.000Z' },
      { id: 'del2', name: 'Remove', styleId: 2, colorPalette: [], fontChoice: '', createdAt: '2024-01-02T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(existing))
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.deleteProject('del2')
    })

    expect(result.current.projects).toHaveLength(1)
    expect(result.current.projects[0].name).toBe('Keep')
  })

  it('persists deletion to localStorage', () => {
    const existing = [
      { id: 'x1', name: 'A', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-01T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(existing))
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.deleteProject('x1')
    })

    const stored = JSON.parse(localStorage.getItem('ui-demo-projects')!)
    expect(stored).toHaveLength(0)
  })

  it('updates a project', () => {
    const existing = [
      { id: 'up1', name: 'Old Name', styleId: 1, colorPalette: [], fontChoice: 'Arial', createdAt: '2024-01-01T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(existing))
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.updateProject('up1', { name: 'New Name', fontChoice: 'Roboto' })
    })

    expect(result.current.projects[0].name).toBe('New Name')
    expect(result.current.projects[0].fontChoice).toBe('Roboto')
    expect(result.current.projects[0].styleId).toBe(1) // unchanged
  })

  it('getProject returns the project if found', () => {
    const existing = [
      { id: 'gp1', name: 'Found', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-01T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(existing))
    const { result } = renderHook(() => useProjects())

    const project = result.current.getProject('gp1')
    expect(project).not.toBeNull()
    expect(project!.name).toBe('Found')
  })

  it('getProject returns null for non-existent id', () => {
    const { result } = renderHook(() => useProjects())
    const project = result.current.getProject('nonexistent')
    expect(project).toBeNull()
  })

  it('handles invalid localStorage gracefully', () => {
    localStorage.setItem('ui-demo-projects', 'not json{{{')
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toEqual([])
  })

  it('handles non-array localStorage values', () => {
    localStorage.setItem('ui-demo-projects', JSON.stringify({ a: 1 }))
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toEqual([])
  })

  it('filters invalid items from localStorage', () => {
    localStorage.setItem('ui-demo-projects', JSON.stringify([null, 42, { id: 'ok', name: 'Valid', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '' }]))
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toHaveLength(1)
    expect(result.current.projects[0].name).toBe('Valid')
  })

  describe('cross-instance sync', () => {
    it('syncs when projects-updated event fires', () => {
      const { result } = renderHook(() => useProjects())
      expect(result.current.projects).toEqual([])

      act(() => {
        localStorage.setItem('ui-demo-projects', JSON.stringify([{ id: 's1', name: 'Synced', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '' }]))
        window.dispatchEvent(new CustomEvent('projects-updated'))
      })

      expect(result.current.projects).toHaveLength(1)
      expect(result.current.projects[0].name).toBe('Synced')
    })

    it('syncs on storage event', () => {
      const { result } = renderHook(() => useProjects())

      act(() => {
        localStorage.setItem('ui-demo-projects', JSON.stringify([{ id: 's2', name: 'Cross Tab', styleId: 2, colorPalette: [], fontChoice: '', createdAt: '' }]))
        window.dispatchEvent(new StorageEvent('storage', { key: 'ui-demo-projects' }))
      })

      expect(result.current.projects).toHaveLength(1)
    })

    it('dispatches projects-updated event on create', () => {
      const { result } = renderHook(() => useProjects())
      const handler = vi.fn()
      window.addEventListener('projects-updated', handler)

      act(() => {
        result.current.createProject({ name: 'Event', styleId: 1, colorPalette: [], fontChoice: '' })
      })

      expect(handler).toHaveBeenCalled()
      window.removeEventListener('projects-updated', handler)
    })

    it('cleans up event listeners on unmount', () => {
      const { unmount } = renderHook(() => useProjects())
      const spy = vi.spyOn(window, 'removeEventListener')
      unmount()
      expect(spy).toHaveBeenCalledWith('projects-updated', expect.any(Function))
      expect(spy).toHaveBeenCalledWith('storage', expect.any(Function))
      spy.mockRestore()
    })
  })
})
