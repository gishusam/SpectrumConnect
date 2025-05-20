import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Share2, Plus, UserCircle, Calendar } from "lucide-react";

const forumTopics = [
  {
    id: 1,
    title: "Tips for managing sensory overload in public places",
    author: "Emma S.",
    authorImg: "https://randomuser.me/api/portraits/women/33.jpg",
    date: "3 days ago",
    replies: 24,
    likes: 47,
    tags: ["Sensory", "Coping Strategies", "Public Spaces"],
    category: "support"
  },
  {
    id: 2,
    title: "Educational resources for ASD children in elementary school",
    author: "Michael T.",
    authorImg: "https://randomuser.me/api/portraits/men/54.jpg",
    date: "1 week ago",
    replies: 18,
    likes: 32,
    tags: ["Education", "Children", "Resources"],
    category: "resources"
  },
  {
    id: 3,
    title: "Share your success stories: What therapies have helped you most?",
    author: "Lisa K.",
    authorImg: "https://randomuser.me/api/portraits/women/12.jpg",
    date: "2 days ago",
    replies: 36,
    likes: 65,
    tags: ["Success Stories", "Therapies", "Personal Growth"],
    category: "success"
  },
  {
    id: 4,
    title: "Connecting with others: ASD social groups in Seattle area",
    author: "James R.",
    authorImg: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "5 days ago",
    replies: 15,
    likes: 28,
    tags: ["Social Groups", "Seattle", "Meetups"],
    category: "connect"
  },
  {
    id: 5,
    title: "Workplace accommodations that have made a difference",
    author: "Diana L.",
    authorImg: "https://randomuser.me/api/portraits/women/56.jpg",
    date: "1 day ago",
    replies: 29,
    likes: 41,
    tags: ["Workplace", "Accommodations", "Adults"],
    category: "support"
  },
  {
    id: 6,
    title: "New research on ASD and executive functioning",
    author: "Dr. Alex Chen",
    authorImg: "https://randomuser.me/api/portraits/men/42.jpg",
    date: "4 days ago",
    replies: 12,
    likes: 38,
    tags: ["Research", "Executive Function", "Neuroscience"],
    category: "resources"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "ASD Parent Support Group",
    date: "July 15, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Online (Zoom)",
    attendees: 18
  },
  {
    id: 2,
    title: "Sensory-Friendly Art Workshop",
    date: "July 22, 2024",
    time: "4:00 PM - 6:00 PM",
    location: "Community Center, Portland",
    attendees: 12
  },
  {
    id: 3,
    title: "Job Skills Workshop for Adults with ASD",
    date: "August 5, 2024",
    time: "1:00 PM - 3:00 PM",
    location: "Online (Zoom)",
    attendees: 25
  }
];

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [joined, setJoined] = useState(false);
  const [topics, setTopics] = useState(forumTopics);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "You",
    authorImg: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "Just now",
    replies: 0,
    likes: 0,
    tags: [],
    category: "support"
  });
  
  // Filter topics based on active category
  const filteredTopics = activeCategory
    ? topics.filter((topic) => topic.category === activeCategory)
    : topics;

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-spectrum-purple-dark mb-2">Community Connect</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Join our supportive community spaces to connect with others, share experiences,
        and find resources specifically tailored for individuals with ASD.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Forum */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="forums" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
              <TabsTrigger value="events">Community Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forums">
              <div className="flex flex-wrap gap-2 mb-6">
        <Button
                  variant={activeCategory === null ? "default" : "outline"} 
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory(null)}
                >
                  All Topics
        </Button>
        <Button
                  variant={activeCategory === "support" ? "default" : "outline"} 
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory("support")}
        >
          Support
        </Button>
        <Button
                  variant={activeCategory === "resources" ? "default" : "outline"} 
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory("resources")}
        >
          Resources
        </Button>
                <Button
                  variant={activeCategory === "success" ? "default" : "outline"} 
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory("success")}
                >
                  Success Stories
                </Button>
                <Button
                  variant={activeCategory === "connect" ? "default" : "outline"} 
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory("connect")}
                >
                  Connect
                </Button>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Topics` : "Recent Discussions"}
                </h2>
                <Button className="focus-ring" onClick={() => setShowNewPost(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </div>
              
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage src={topic.authorImg} alt={topic.author} />
                          <AvatarFallback>{topic.author.split(" ")[0][0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="text-lg font-bold hover:text-spectrum-purple-dark transition-colors cursor-pointer">
                              {topic.title}
                            </h3>
                            <span className="text-sm text-gray-500">{topic.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Posted by {topic.author}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {topic.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-spectrum-purple-light text-spectrum-purple-dark">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center text-gray-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span className="text-sm">{topic.replies} replies</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Heart className="h-4 w-4 mr-1" />
                              <span className="text-sm">{topic.likes} likes</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Share2 className="h-4 w-4 mr-1" />
                              <span className="text-sm">Share</span>
                            </div>
                          </div>
                        </div>
                      </div>
                </CardContent>
              </Card>
            ))}
              </div>
              
              {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No topics found</h3>
                  <p className="text-gray-600 mb-4">Be the first to start a discussion in this category</p>
                  <Button className="focus-ring">
                    <Plus className="mr-2 h-4 w-4" /> Create New Topic
          </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="events">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Upcoming Community Events</h2>
                <Button className="focus-ring">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="bg-spectrum-purple-light rounded-lg p-4 text-center md:w-32 flex flex-col justify-center items-center">
                          <Calendar className="h-8 w-8 text-spectrum-purple-dark mb-2" />
                          <p className="font-bold text-spectrum-purple-dark">{event.date.split(", ")[0]}</p>
                          <p className="text-sm text-spectrum-purple-dark">{event.date.split(", ")[1]}</p>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{event.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Time:</span> {event.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Location:</span> {event.location}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Attendees:</span> {event.attendees} people attending
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button className="focus-ring">Join Event</Button>
                            <Button variant="outline" className="focus-ring">More Info</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card className="border-spectrum-blue-light">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-spectrum-blue-light rounded-lg">
                  <p className="text-2xl font-bold text-spectrum-blue-dark">1,245</p>
                  <p className="text-sm text-gray-600">Members</p>
                </div>
                <div className="text-center p-4 bg-spectrum-purple-light rounded-lg">
                  <p className="text-2xl font-bold text-spectrum-purple-dark">328</p>
                  <p className="text-sm text-gray-600">Topics</p>
                </div>
                <div className="text-center p-4 bg-spectrum-purple-light rounded-lg">
                  <p className="text-2xl font-bold text-spectrum-purple-dark">4,867</p>
                  <p className="text-sm text-gray-600">Replies</p>
                </div>
                <div className="text-center p-4 bg-spectrum-blue-light rounded-lg">
                  <p className="text-2xl font-bold text-spectrum-blue-dark">42</p>
                  <p className="text-sm text-gray-600">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="border-spectrum-purple-light">
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
              <CardDescription>
                Our community is built on respect and support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-spectrum-purple flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <p className="text-sm">Be respectful and supportive of other community members</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-spectrum-purple flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <p className="text-sm">Share personal experiences but avoid providing medical advice</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-spectrum-purple flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <p className="text-sm">Respect others' privacy and confidentiality</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-spectrum-purple flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <p className="text-sm">Use inclusive language and be mindful of different experiences</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full focus-ring">
                Read Full Guidelines
              </Button>
            </CardFooter>
          </Card>

          {/* Active Members */}
          <Card>
            <CardHeader>
              <CardTitle>Active Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/women/33.jpg" />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Emma S.</p>
                  <p className="text-xs text-gray-500">24 contributions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/54.jpg" />
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-xs text-gray-500">18 contributions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/women/12.jpg" />
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Lisa K.</p>
                  <p className="text-xs text-gray-500">36 contributions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">James R.</p>
                  <p className="text-xs text-gray-500">15 contributions</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full focus-ring">
                <UserCircle className="mr-2 h-4 w-4" /> View All Members
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent>
              <Button
                className="w-full focus-ring mb-2"
                onClick={() => setJoined(true)}
                disabled={joined}
              >
                {joined ? "Joined" : "Join Community"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {showNewPost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Title"
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
              className="w-full border p-2 mb-2 rounded"
              placeholder="Content"
              value={newPost.content || ""}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            />
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Tags (comma separated)"
              value={newPost.tags.join(", ")}
              onChange={e => setNewPost({ ...newPost, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setShowNewPost(false)} variant="outline">Cancel</Button>
                  <Button
                onClick={() => {
                  setTopics([{ ...newPost, id: Date.now() }, ...topics]);
                  setShowNewPost(false);
                  setNewPost({
                    title: "",
                    content: "",
                    author: "You",
                    authorImg: "https://randomuser.me/api/portraits/men/1.jpg",
                    date: "Just now",
                    replies: 0,
                    likes: 0,
                    tags: [],
                    category: "support"
                  });
                }}
              >
                Post
                  </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;