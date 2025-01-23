import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, BarChart2, Check, X } from "lucide-react"

export interface PostInfo {
  id: number
  author: {
    displayName: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  analytics?: {
    likes: number
    dislikes: number
    veracityScore: number
  }
  verifiedVotes: {
    affirm: number
    deny: number
  }
  engagements: {
    engaging: number
    notEngaging: number
  }
  timestamp: string
}

interface PostCardProps {
  post: PostInfo
  isCurrent?: boolean
  className?: string
}

export default function PostCard({ post, isCurrent, className = "" }: PostCardProps) {
  const [isEngageOpen, setIsEngageOpen] = useState(false)
  const [isConfidenceOpen, setIsConfidenceOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [engagementStatus, setEngagementStatus] = useState<"engaging" | "notEngaging" | null>(null)
  const [confidence, setConfidence] = useState(5)
  const [certainty, setCertainty] = useState(50)
  const [showVerifiedVote, setShowVerifiedVote] = useState(false)
  const engageRef = useRef<HTMLDivElement>(null)
  const confidenceRef = useRef<HTMLDivElement>(null)
  const analyticsRef = useRef<HTMLDivElement>(null)

  const toggleEngage = () => {
    setIsEngageOpen(!isEngageOpen)
    setIsConfidenceOpen(false)
    setIsAnalyticsOpen(false)
  }

  const toggleConfidence = () => {
    setIsConfidenceOpen(!isConfidenceOpen)
    setIsEngageOpen(false)
    setIsAnalyticsOpen(false)
  }

  const toggleAnalytics = () => {
    setIsAnalyticsOpen(!isAnalyticsOpen)
    setIsEngageOpen(false)
    setIsConfidenceOpen(false)
  }

  const handleEngagement = (status: "engaging" | "notEngaging") => {
    setEngagementStatus(status)
    setShowVerifiedVote(true)
    setIsEngageOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        engageRef.current &&
        !engageRef.current.contains(event.target as Node) &&
        confidenceRef.current &&
        !confidenceRef.current.contains(event.target as Node) &&
        analyticsRef.current &&
        !analyticsRef.current.contains(event.target as Node)
      ) {
        setIsEngageOpen(false)
        setIsConfidenceOpen(false)
        setIsAnalyticsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.div
      className={`
        w-full h-full rounded-2xl overflow-hidden
        bg-gradient-to-br from-gray-200 to-gray-300
        transition-all duration-500
        ${isCurrent ? "shadow-[0_10px_50px_rgba(0,0,0,0.3)]" : "shadow-[0_5px_15px_rgba(0,0,0,0.1)]"}
        ${className}
      `}
    >
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-center mb-3 sm:mb-4">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white shadow-lg">
            <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
            <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-2 sm:ml-3 flex-grow">
            <p className="text-xs sm:text-sm text-gray-500">{post.author.displayName}</p>
            <div className="flex justify-between items-center">
              <h3 className={`text-sm sm:text-lg font-bold ${isCurrent ? "text-gray-800" : "text-gray-700"}`}>
                @{post.author.username}
              </h3>
              <p className={`text-xs ${isCurrent ? "text-gray-500" : "text-gray-400"}`}>{post.timestamp}</p>
            </div>
          </div>
        </div>
        <p className={`text-sm sm:text-base mb-3 sm:mb-4 flex-grow ${isCurrent ? "text-gray-800" : "text-gray-700"}`}>
          {post.content}
        </p>
        {post.image && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-auto object-cover" />
          </div>
        )}
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-1 sm:space-x-2 mb-2 sm:mb-0">
            <Button size="sm" variant="ghost" className="p-2 rounded-full hover:bg-gray-200">
              <ThumbsUp className="w-5 h-5" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2 rounded-full hover:bg-gray-200">
              <ThumbsDown className="w-5 h-5" />
            </Button>
            {post.analytics && (
              <div className="relative" ref={analyticsRef}>
                <Button size="sm" variant="ghost" className="rounded-full px-2 py-1" onClick={toggleAnalytics}>
                  <BarChart2 className="w-5 h-5" />
                </Button>
                <AnimatePresence>
                  {isAnalyticsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 mb-2 flex justify-center items-center space-x-2"
                      style={{ width: "100%" }}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-gray-600">Likes</span>
                        <span className="text-sm text-gray-800">{post.analytics?.likes ?? 0}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-gray-600">Dislikes</span>
                        <span className="text-sm text-gray-800">{post.analytics?.dislikes ?? 0}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-gray-600">Veracity</span>
                        <span className="text-sm text-gray-800">{post.analytics?.veracityScore ?? 0}/100</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="relative mr-2" ref={engageRef}>
              <Button size="sm" variant="ghost" className="rounded-full px-2 py-1" onClick={toggleEngage}>
                Engage
              </Button>
              <AnimatePresence>
                {isEngageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 mb-2 flex justify-center items-center space-x-2"
                    style={{ width: "100%" }}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 rounded-full hover:bg-green-100"
                      onClick={() => handleEngagement("engaging")}
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 rounded-full hover:bg-red-100"
                      onClick={() => handleEngagement("notEngaging")}
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative" ref={confidenceRef}>
              <Button size="sm" variant="ghost" className="rounded-full px-2 py-1" onClick={toggleConfidence}>
                Confidence
              </Button>
              <AnimatePresence>
                {isConfidenceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 mb-2 p-2 rounded-lg"
                    style={{ width: "100%" }}
                  >
                    <Slider
                      value={[confidence]}
                      onValueChange={(value) => setConfidence(value[0])}
                      max={10}
                      step={1}
                      className="w-full"
                      styles={{
                        track: {
                          background: "linear-gradient(to right, #ef4444 30%, #eab308 30% 70%, #22c55e 70%)",
                        },
                        thumb: {
                          backgroundColor: confidence <= 3 ? "#ef4444" : confidence <= 7 ? "#eab308" : "#22c55e",
                        },
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showVerifiedVote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center space-x-2 bg-gray-100 rounded-lg p-2"
            >
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center space-x-1 p-1 rounded-full hover:bg-green-100"
              >
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">{post.verifiedVotes.affirm}</span>
              </Button>
              <Slider
                value={[certainty]}
                onValueChange={(value) => setCertainty(value[0])}
                max={100}
                step={1}
                className="flex-grow"
              />
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center space-x-1 p-1 rounded-full hover:bg-red-100"
              >
                <X className="w-5 h-5 text-red-500" />
                <span className="text-sm">{post.verifiedVotes.deny}</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

