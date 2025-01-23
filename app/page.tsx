"use client"

import PostCarousel from "@/components/PostCarousel"

const demoPosts = [
  {
    id: 1,
    author: {
      displayName: "alice",
      username: "alice_j",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: "Just finished our Q2 Financial Report. Great progress this quarter! #Finance #Growth",
    analytics: {
      likes: 42,
      dislikes: 5,
      veracityScore: 85,
    },
    verifiedVotes: {
      affirm: 30,
      deny: 2,
    },
    engagements: {
      engaging: 38,
      notEngaging: 12,
    },
    timestamp: "2h",
  },
  {
    id: 2,
    author: {
      displayName: "bob",
      username: "bob_smith",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: "Excited to present our new product launch today! #Innovation #TechLaunch",
    image: "/placeholder.svg?height=300&width=400",
    analytics: {
      likes: 128,
      dislikes: 3,
      veracityScore: 92,
    },
    verifiedVotes: {
      affirm: 95,
      deny: 1,
    },
    engagements: {
      engaging: 110,
      notEngaging: 40,
    },
    timestamp: "4h",
  },
  {
    id: 3,
    author: {
      displayName: "charlie",
      username: "charlie_b",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: "Amazing team building event yesterday! Check out these photos #TeamSpirit",
    image: "/placeholder.svg?height=300&width=400",
    analytics: {
      likes: 89,
      dislikes: 0,
      veracityScore: 98,
    },
    verifiedVotes: {
      affirm: 75,
      deny: 0,
    },
    engagements: {
      engaging: 85,
      notEngaging: 15,
    },
    timestamp: "1d",
  },
  {
    id: 4,
    author: {
      displayName: "diana",
      username: "diana_p",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: "Just uploaded a demo of our new feature. Let me know what you think! #ProductDevelopment",
    analytics: {
      likes: 56,
      dislikes: 2,
      veracityScore: 88,
    },
    verifiedVotes: {
      affirm: 40,
      deny: 1,
    },
    engagements: {
      engaging: 50,
      notEngaging: 20,
    },
    timestamp: "2d",
  },
  {
    id: 5,
    author: {
      displayName: "ethan",
      username: "ethan_h",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: "Great client meeting today. Looking forward to our collaboration! #BusinessGrowth",
    analytics: {
      likes: 72,
      dislikes: 1,
      veracityScore: 95,
    },
    verifiedVotes: {
      affirm: 60,
      deny: 0,
    },
    engagements: {
      engaging: 65,
      notEngaging: 15,
    },
    timestamp: "3d",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="flex-grow flex items-start justify-center px-2 sm:px-4 lg:px-8 pt-0 sm:pt-4">
        <div className="w-full max-w-7xl">
          <PostCarousel posts={demoPosts} />
        </div>
      </main>
    </div>
  )
}

