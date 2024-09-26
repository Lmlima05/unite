import fastify from "fastify";
import { z } from 'zod'

const app = fastify()

app.get('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),\
    details: z.string().nullable(),
    maximumattendees: z.number().int().positive().nullable(),
  })

  const data = createEventSchema.parse(request.body)

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumattendees: data.maximumattendees,
      slug: new Date().toISOString(),
    },
  })

  return reply.status(201).send({ event: event.id})
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})