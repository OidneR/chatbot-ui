import { NextApiRequest, NextApiResponse } from "next"

const rotatingTexts = [
  { id: 1, text: "Discover amazing features" },
  { id: 2, text: "Transform your workflow" },
  { id: 3, text: "Join our community" }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(rotatingTexts)
}
