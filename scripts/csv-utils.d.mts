export function parseCSV(text: string): string[][];
export function csvToObjects(rows: string[][]): Record<string, string>[];
export function truncateClean(text: string, maxLen: number): string;
