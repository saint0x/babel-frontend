"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PostCard, { type PostInfo } from "./PostCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PostCarouselProps {
  posts: PostInfo[]
}

const CARD_WIDTH = 320
const CARD_GAP = 40
const PERSPECTIVE = 1000
const TRANSITION = { type: "spring", stiffness: 300, damping: 30 }

export default function PostCarousel({ posts }: PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(5)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateCardStyles = useCallback(
    (index: number) => {
      const offset = index - Math.floor(visibleCards / 2)
      const absOffset = Math.abs(offset)
      const isCurrentCard = offset === 0

      const x = offset * (CARD_WIDTH + CARD_GAP)
      const scale = isCurrentCard ? 1 : 0.85 - absOffset * 0.05
      const zIndex = visibleCards - absOffset
      const opacity = isCurrentCard ? 1 : 0.7 - absOffset * 0.1
      const filter = isCurrentCard ? "none" : "blur(2px)"
      const y = isCurrentCard ? 0 : 20 * absOffset
      const rotateY = offset * 10

      return { x, y, scale, zIndex, opacity, filter, rotateY }
    },
    [visibleCards],
  )

  const moveCarousel = useCallback(
    (direction: number) => {
      setCurrentIndex((prevIndex) => (prevIndex + direction + posts.length) % posts.length)
    },
    [posts.length],
  )

  useEffect(() => {
    const updateVisibleCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const totalCardWidth = CARD_WIDTH + CARD_GAP
        const newVisibleCards = Math.max(3, Math.min(5, Math.floor(containerWidth / totalCardWidth)))
        setVisibleCards(newVisibleCards % 2 === 0 ? newVisibleCards + 1 : newVisibleCards)
      }
    }

    updateVisibleCards()
    window.addEventListener("resize", updateVisibleCards)
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [])

  const visiblePosts = [...Array(visibleCards)].map((_, index) => {
    const postIndex = (currentIndex + index - Math.floor(visibleCards / 2) + posts.length) % posts.length
    return posts[postIndex]
  })

  return (
    <div
      className="relative w-full h-[calc(100vh-1rem)] sm:h-[calc(100vh-4rem)] flex items-start sm:items-center justify-center overflow-hidden pt-16 sm:pt-0"
      ref={containerRef}
    >
      <div
        className="relative h-[480px] flex items-center justify-center"
        style={{
          perspective: PERSPECTIVE,
          width: `${CARD_WIDTH + (CARD_WIDTH + CARD_GAP) * (visibleCards - 1)}px`,
        }}
      >
        <AnimatePresence initial={false}>
          {visiblePosts.map((post, index) => {
            const styles = calculateCardStyles(index)
            return (
              <motion.div
                key={post.id}
                initial={styles}
                animate={styles}
                exit={styles}
                transition={TRANSITION}
                style={{
                  position: "absolute",
                  width: CARD_WIDTH,
                  height: "100%",
                  transformOrigin: "50% 50% -160px",
                }}
              >
                <PostCard post={post} isCurrent={index === Math.floor(visibleCards / 2)} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <Button
        size="icon"
        className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-gray-400 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg"
        onClick={() => moveCarousel(-1)}
        aria-label="Previous post"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Button
        size="icon"
        className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-gray-400 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg"
        onClick={() => moveCarousel(1)}
        aria-label="Next post"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  )
}

