"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import "./globals.css"
import { useTheme } from "next-themes"
import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"

// Interface for rotating text data
interface RotatingText {
  id: number
  text: string
}

export default function HomePage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [rotatingTexts, setRotatingTexts] = useState<RotatingText[]>([])
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Fetch rotating texts from backend
  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch("/api/rotating-texts")
        const data = await response.json()
        setRotatingTexts(data)
      } catch (error) {
        console.error("Error fetching rotating texts:", error)
      }
    }

    fetchTexts()
  }, [])

  // Rotate texts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % rotatingTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  return (
    <div className="min-h-screen bg-[#75cfeb]">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6">
        <div>
          <ChatbotUISVG
            theme={theme === "dark" ? "dark" : "light"}
            scale={0.3}
          />
        </div>
        <button
          onClick={() => router.push("/login")}
          className="rounded-full bg-white px-6 py-2 text-[#75cfeb] transition-all hover:bg-opacity-90"
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-white">
          Welcome to Our Platform
          <br />
          <span className="text-3xl">Your Creative Solution</span>
        </h1>

        {/* Rotating Text */}
        <div className="mb-8 min-h-[60px] text-2xl text-white">
          {rotatingTexts.map((text, index) => (
            <p
              key={text.id}
              className={`absolute inset-x-0 mx-auto transition-opacity duration-1000${
                index === currentTextIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {text.text}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/subscription")}
          className="mt-8 rounded-full bg-white px-8 py-3 text-xl text-[#75cfeb] shadow-lg transition-all hover:bg-opacity-90"
        >
          Get Started
        </button>
      </main>
    </div>
  )
}
