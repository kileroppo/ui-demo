/**
 * Simple CSV parser that handles quoted fields with commas and escaped quotes.
 * Returns an array of rows, where each row is an array of field strings.
 */
export function parseCSV(text) {
  const rawText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const rows = []
  let row = []
  let field = ''
  let insideQuotes = false

  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i]
    if (ch === '"') {
      if (insideQuotes && rawText[i + 1] === '"') {
        field += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (ch === ',' && !insideQuotes) {
      row.push(field.trim())
      field = ''
    } else if (ch === '\n' && !insideQuotes) {
      row.push(field.trim())
      if (row.some((f) => f.length > 0)) rows.push(row)
      row = []
      field = ''
    } else {
      field += ch
    }
  }
  row.push(field.trim())
  if (row.some((f) => f.length > 0)) rows.push(row)

  return rows
}

/**
 * Converts CSV rows into an array of objects using the first row as headers.
 */
export function csvToObjects(rows) {
  if (rows.length < 2) return []
  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = row[i] || ''
    })
    return obj
  })
}

/**
 * Truncate text at the last comma, semicolon, or space before the limit.
 * Avoids breaking in the middle of words or values.
 */
export function truncateClean(text, maxLen) {
  if (text.length <= maxLen) return text
  const truncated = text.substring(0, maxLen)
  const lastComma = truncated.lastIndexOf(',')
  const lastSemicolon = truncated.lastIndexOf(';')
  const lastSpace = truncated.lastIndexOf(' ')
  const cutAt = Math.max(lastComma, lastSemicolon, lastSpace)
  if (cutAt > maxLen * 0.5) {
    return truncated.substring(0, cutAt).replace(/[,;\s]+$/, '')
  }
  return truncated.replace(/[,;\s]+$/, '')
}
