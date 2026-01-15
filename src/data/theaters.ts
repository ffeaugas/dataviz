import { prisma } from '@/lib/prisma'
import { createServerFn } from '@tanstack/react-start'

export const getTheaters = createServerFn({
  method: 'GET',
}).handler(async () => {
  const theaters = await prisma.theater.findMany({
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
    },
  })
  return theaters
})

export type Theaters = Awaited<ReturnType<typeof getTheaters>>
