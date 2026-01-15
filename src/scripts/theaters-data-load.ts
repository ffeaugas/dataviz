import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url'
import { prisma } from '@/lib/prisma'
import { Theater } from 'generated/prisma/client'

async function main() {
  const toInt = (value: unknown): number => {
    if (typeof value === 'number') return Math.round(value)
    if (typeof value === 'string') {
      const num = Number(value.replace(/\s/g, '').replace(',', '.'))
      return Number.isFinite(num) ? Math.round(num) : 0
    }
    return 0
  }

  const toFloat = (value: unknown): number => {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
      const num = Number(value.replace(/\s/g, '').replace(',', '.'))
      return Number.isFinite(num) ? num : 0
    }
    return 0
  }

  const toStringValue = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    return String(value)
  }

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
        headers = values.map((value, index) => (index === 0 ? '' : String(value ?? `col_${index}`)))
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

  console.log(data[0].rows[0]['évolution entrées'])

  const datas: Omit<Theater, 'id'>[] = data[0].rows.map((row) => {
    const r = row as Record<string, unknown>

    return {
      autoNumber: toInt(r['N° auto']),
      name: toStringValue(r.nom),
      regionCNC: toInt(r['régionCNC']),
      region: toStringValue(r['région administrative']),
      address: toStringValue(r.adresse),
      INSEECode: toInt(r['code INSEE']),
      city: toStringValue(r.commune),
      population: toInt(r['population de la commune']),
      DEP: toInt(r.DEP),
      UU: toInt(r['N°UU']),
      UUName: toStringValue(r['unité urbaine']),
      UUPopulation: toInt(r['population unité urbaine']),
      geographicSituation: toStringValue(r['situation géographique']),
      screens: toInt(r['écrans']),
      seats: toInt(r.fauteuils),
      weeksOfActivity: toInt(r["semaines d'activité"]),
      seances: toInt(r['séances']),
      entries2024: toInt(r['entrées 2024']),
      entries2023: toInt(r['entrées 2023']),
      entriesEvolution: Number.parseFloat((toFloat(r['évolution entrées']) * 100).toFixed(1)),
      entriesTranche: toStringValue(r["tranche d'entrées"]),
      owner: toStringValue(r['propriétaire']),
      AE: r['AE'] === 'OUI',
      AECategory: toStringValue(r['catégorie Art et Essai']),
      AELabel: toStringValue(r['label Art et Essai']),
      gender: toStringValue(r.genre),
      multiplex: r['multiplexe'] === 'OUI',
      communityZone: toStringValue(r['zone de la commune']),
      numberOfFilmsProgrammed: toInt(r['nombre de films programmés']),
      numberOfNewFilms: toInt(r['nombre de films inédits']),
      numberOfFilmsInWeek1: toInt(r['nombre de films en semaine 1']),
      PdMEnEntriesFrenchFilms: Number.parseFloat(
        (toFloat(r['PdM en entrées des films français']) * 100).toFixed(1),
      ),
      PdMEntriesAmericanFilms: Number.parseFloat(
        (toFloat(r['PdM en entrées des films américains']) * 100).toFixed(1),
      ),
      PdMEntriesEuropeanFilms: Number.parseFloat(
        (toFloat(r['PdM en entrées des films européens']) * 100).toFixed(1),
      ),
      PdMEntriesOtherFilms: Number.parseFloat(
        (toFloat(r['PdM en entrées des autres films']) * 100).toFixed(1),
      ),
      AEFilms: toInt(r['films Art et Essai']),
      AEPartOfSeances: Number.parseFloat(
        (toFloat(r['part des séances de films Art et Essai']) * 100).toFixed(1),
      ),
      AEPdMEntries: Number.parseFloat(
        (toFloat(r['PdM en entrées des films Art et Essai']) * 100).toFixed(1),
      ),
      latitude: toFloat(r.latitude),
      longitude: toFloat(r.longitude),
    }
  })

  // const created = await prisma.theater.createMany({
  //   data: datas,
  // })
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
