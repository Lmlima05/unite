import { FastifyInstance } from "fastify";
import { BadRequest } from "../routes/_errors/bad-request";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const erroHanddler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }

  return reply.status(500).send({ message: "Um erro aconteceu!" });
}