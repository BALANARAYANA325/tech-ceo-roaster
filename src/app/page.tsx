// src/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [roastImage, setRoastImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const roast = async (style: "elon" | "durov" | "sundar") => {
    if (!image) return;
    setLoading(true);
    const res = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: image, style }),
    });
    const data = await res.json();
    setRoastImage(data.roastImageUrl);
    setLoading(false);
   };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-10">CEO ROASTER</h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <Card className="p-8 bg-zinc-900 border-zinc-800">
          <h2 className="text-2xl mb-6">Upload your selfie</h2>
          <div {...getRootProps()} className="border-4 border-dashed border-zinc-700 rounded-xl p-20 text-center cursor-pointer hover:border-zinc-500">
            <input {...getInputProps()} />
            {image ? <Image src={image} alt="you" width={400} height={400} className="mx-auto rounded" /> : <p>Drop your face here</p>}
          </div>
        </Card>

        <Card className="p-8 bg-zinc-900 border-zinc-800">
          <h2 className="text-2xl mb-6">Get roasted by</h2>
          <div className="space-y-4">
            <Button onClick={() => roast("elon")} disabled={loading || !image} className="w-full text-lg py-8 bg-red-600 hover:bg-red-700">
              {loading ? "Roasting..." : "Elon Musk"}
            </Button>
            <Button onClick={() => roast("durov")} disabled={loading || !image} className="w-full text-lg py-8 bg-gray-800 hover:bg-gray-700">
              Pavel Durov
            </Button>
            <Button onClick={() => roast("sundar")} disabled={loading || !image} className="w-full text-lg py-8 bg-blue-600 hover:bg-blue-700">
              Sundar Pichai
            </Button>
          </div>

          {roastImage && (
            <div className="mt-8">
              <Image src={roastImage} alt="roast" width={500} height={500} className="rounded-xl mx-auto" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}