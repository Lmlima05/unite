import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '8f0e7bd4-99c3-446e-99fa-dfe0a196e1ee',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'um evento p/ devs apaixonados(as) por código',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})