
import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url'
import { prisma } from '@/lib/prisma'

async function main() {
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '..', '..', 'public/datas/Données_cartographie_2024.xlsx')
console.log(filePath)
const workbook = new ExcelJS.Workbook()
await workbook.xlsx.readFile(filePath)

const data = workbook.worksheets.map((sheet) => {
  let headers: Array<string | number> = []
  const rows: Record<string, unknown>[] = []

  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const values = row.values as Array<unknown>

    if (rowNumber === 1) {
      headers = values.map((value, index) =>
        index === 0 ? '' : String(value ?? `col_${index}`)
      )
      return
    }

    const rowData: Record<string, unknown> = {}
    values.forEach((value, index) => {
      if (index === 0) return
      const header = headers[index] || `col_${index}`
      rowData[String(header)] = value ?? ''
    })

    rows.push(rowData)
  })

  return {
    sheetName: sheet.name,
    rows,
  }
})

console.log(data[0].rows[0])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })