import { FastifyInstance } from "fastify";

type FastifyErrorHandler = FastifyErrorHandler['errorHandler']

export const erroHanddler: FastifyErrorHandler = (error, request, reply ) => {
  return reply.status(500).send({ message: 'Um erro aconteceu'})
}