import { describe, it, expect } from 'vitest'

// We import the functions from the mjs module using dynamic import
// Since the build script is ESM, we test it directly
const { parseCSV, csvToObjects, truncateClean } = await import('../../../scripts/csv-utils.mjs')

describe('parseCSV', () => {
  it('parses simple CSV rows', () => {
    const input = 'Name,Age,City\nAlice,30,NYC\nBob,25,LA'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['Name', 'Age', 'City'],
      ['Alice', '30', 'NYC'],
      ['Bob', '25', 'LA'],
    ])
  })

  it('handles quoted fields with commas', () => {
    const input = 'Name,Description\nAlice,"Hello, World"\nBob,"Foo, Bar"'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['Name', 'Description'],
      ['Alice', 'Hello, World'],
      ['Bob', 'Foo, Bar'],
    ])
  })

  it('handles escaped double quotes', () => {
    const input = 'Name,Quote\nAlice,"She said ""hi"""\nBob,"Normal"'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['Name', 'Quote'],
      ['Alice', 'She said "hi"'],
      ['Bob', 'Normal'],
    ])
  })

  it('handles Windows-style line endings (CRLF)', () => {
    const input = 'A,B\r\n1,2\r\n3,4'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['A', 'B'],
      ['1', '2'],
      ['3', '4'],
    ])
  })

  it('handles old Mac-style line endings (CR)', () => {
    const input = 'A,B\r1,2\r3,4'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['A', 'B'],
      ['1', '2'],
      ['3', '4'],
    ])
  })

  it('skips empty rows', () => {
    const input = 'A,B\n1,2\n\n3,4'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['A', 'B'],
      ['1', '2'],
      ['3', '4'],
    ])
  })

  it('handles multiline quoted fields', () => {
    const input = 'Name,Bio\nAlice,"Line 1\nLine 2"\nBob,"Simple"'
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['Name', 'Bio'],
      ['Alice', 'Line 1\nLine 2'],
      ['Bob', 'Simple'],
    ])
  })

  it('trims whitespace from fields', () => {
    const input = 'A , B \n 1 , 2 '
    const rows = parseCSV(input)
    expect(rows).toEqual([
      ['A', 'B'],
      ['1', '2'],
    ])
  })

  it('returns empty array for empty input', () => {
    expect(parseCSV('')).toEqual([])
  })

  it('handles single column CSV', () => {
    const input = 'Name\nAlice\nBob'
    const rows = parseCSV(input)
    expect(rows).toEqual([['Name'], ['Alice'], ['Bob']])
  })
})

describe('csvToObjects', () => {
  it('converts rows to objects using first row as headers', () => {
    const rows = [
      ['Name', 'Age'],
      ['Alice', '30'],
      ['Bob', '25'],
    ]
    const objects = csvToObjects(rows)
    expect(objects).toEqual([
      { Name: 'Alice', Age: '30' },
      { Name: 'Bob', Age: '25' },
    ])
  })

  it('fills missing fields with empty string', () => {
    const rows = [
      ['A', 'B', 'C'],
      ['1', '2'],
    ]
    const objects = csvToObjects(rows)
    expect(objects).toEqual([{ A: '1', B: '2', C: '' }])
  })

  it('returns empty array for header-only CSV', () => {
    const rows = [['Name', 'Age']]
    expect(csvToObjects(rows)).toEqual([])
  })

  it('returns empty array for empty rows', () => {
    expect(csvToObjects([])).toEqual([])
  })

  it('returns empty array for single row (only headers)', () => {
    expect(csvToObjects([['A']])).toEqual([])
  })
})

describe('truncateClean', () => {
  it('returns text unchanged if within limit', () => {
    expect(truncateClean('short text', 50)).toBe('short text')
  })

  it('truncates at last delimiter before limit', () => {
    const text = 'item one, item two, item three, item four'
    const result = truncateClean(text, 25)
    // Cuts at the last space (pos 24) before the 25 char limit
    expect(result).toBe('item one, item two, item')
    expect(result.length).toBeLessThanOrEqual(25)
  })

  it('truncates at last space when no comma available', () => {
    const text = 'word1 word2 word3 word4 word5'
    const result = truncateClean(text, 15)
    expect(result).toBe('word1 word2')
  })

  it('removes trailing commas and spaces', () => {
    const text = 'a, b, c, d, e, f, g'
    const result = truncateClean(text, 10)
    expect(result).not.toMatch(/[,;\s]$/)
  })

  it('truncates at last semicolon', () => {
    const text = 'rule1; rule2; rule3; rule4'
    const result = truncateClean(text, 18)
    expect(result).toBe('rule1; rule2')
  })

  it('handles text with no delimiters gracefully', () => {
    const text = 'abcdefghijklmnopqrstuvwxyz'
    const result = truncateClean(text, 10)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  it('returns empty string for empty input', () => {
    expect(truncateClean('', 10)).toBe('')
  })

  it('handles exact length text', () => {
    expect(truncateClean('exact', 5)).toBe('exact')
  })
})
