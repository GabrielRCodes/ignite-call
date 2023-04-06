/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { prisma } from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { z } from "zod";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number(),
    startTimeInMinutes: z.number(),
    endTimeInMinutes: z.number(), 
  }))
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const session = await unstable_getServerSession(req, res, buildNextAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  // O mais correto é usar o createMany, porém como estou utilizando SQLite, não é possível inserir mais de uma informação por vez no banco.
  // await prisma.userTimeInterval.createMany
  await Promise.all(intervals.map(interval => {
    return prisma.userTimeInterval.create({
      data: {
        week_day: interval.weekDay,
        time_start_in_minutes: interval.startTimeInMinutes,
        time_end_in_minutes: interval.endTimeInMinutes,
        user_id: session.user?.id,
      },
    })
  }))

  return res.status(201).end()
}