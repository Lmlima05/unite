import fastify from "fastify";
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifyCors from "@fastify/cors";

import { serializerCompiler, validatorCompiler, createJsonSchemaTransform, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod"; 
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import dotenv from 'dotenv';

dotenv.config();

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in construída durante o evento do NLW Unite da RocketSeat',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/teste', () => {
  return 'Hello World'  
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!');
})
