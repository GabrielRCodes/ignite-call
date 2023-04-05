/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const session = await unstable_getServerSession(req, res, buildNextAuthOptions(req, res))

  return res.json({
    session,
  })
}