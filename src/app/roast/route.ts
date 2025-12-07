// src/app/api/roast/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: NextRequest) {
  const { imageUrl, style } = await req.json()

  const stylePrompt = style === 'elon'
    ? "Roast this guy like Elon Musk on Twitter — savage, zero chill, 2 sentences max"
    : style === 'durov'
    ? "Roast this person in Pavel Durov’s cold, minimalist, no-mercy style — 2 sentences"
    : "Roast this person like Sundar Pichai in a performance review — polite but absolutely destroys them"

  const output: any = await replicate.run(
    "lucataco/flux-dev-lora:793b5f43d373c1a1c07e92d90f44f001d4ed2212a7e9c1ed3f95e9e2f0b2c1e8",
    {
      input: {
        prompt: `${stylePrompt}. Make it hilarious and brutal. Photo of the person: ${imageUrl}`,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "png",
        guidance_scale: 3.5,
        num_inference_steps: 28
      }
    }
  )

  const roastImageUrl = output[0]

  return NextResponse.json({ roastImageUrl })
}