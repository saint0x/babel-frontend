import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ThumbsUp, ThumbsDown, Bookmark, MoreHorizontal, Plus, Home, Search, PlusCircle, Layout, User } from "lucide-react"

export default function Component() {
  const stories = [
    { name: "Your Story", image: "/placeholder.svg", isAdd: true },
    { name: "User 1", image: "/placeholder.svg" },
    { name: "User 2", image: "/placeholder.svg" },
    { name: "User 3", image: "/placeholder.svg" },
    { name: "User 4", image: "/placeholder.svg" },
    { name: "User 5", image: "/placeholder.svg" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-4 pt-8">
      <div className="max-w-md mx-auto space-y-4">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-3 p-1">
            {stories.map((story, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <Card className="w-20 h-28 rounded-3xl overflow-hidden shadow-md">
                  <CardContent className="p-0 h-full relative">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                    {story.isAdd && (
                      <div className="absolute bottom-2 right-2 rounded-full bg-blue-500 p-1">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <span className="text-xs text-gray-700">{story.name}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="flex items-center space-x-4 p-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Nilesh" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Nilesh</h2>
              <p className="text-sm text-gray-500">Posted in u8s - 1h ago</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 mb-2">
              Discover adventure in patagonia's peaks or serenity provence's @hamlets - arrival
            </p>
            <p className="text-xs text-gray-500 mb-4">
              this is a sample babel post
            </p>
            <div className="grid grid-cols-2 gap-2">
              <img src="/placeholder.svg?height=200&width=200" alt="Adventure image 1" className="rounded-lg w-full h-40 object-cover" />
              <img src="/placeholder.svg?height=200&width=200" alt="Adventure image 2" className="rounded-lg w-full h-40 object-cover" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Dislike
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </CardFooter>
        </Card>

        <div className="bg-white rounded-full shadow-lg p-2 flex justify-between items-center">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsDown className="h-4 w-4 mr-2" />
            Dislike
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>

        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <nav className="bg-white rounded-full shadow-lg">
            <div className="flex justify-between items-center px-6 py-2">
              <Button variant="ghost" size="icon">
                <Home className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-[#00ffa3] text-white rounded-full hover:bg-[#00ffa3]/90">
                <PlusCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Layout className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}