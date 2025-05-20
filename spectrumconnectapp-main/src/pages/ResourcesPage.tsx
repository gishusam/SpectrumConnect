
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Download, Search, ExternalLink, BookmarkPlus } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Understanding Sensory Processing Differences",
    type: "guide",
    format: "PDF",
    author: "Dr. Sarah Johnson",
    description: "A comprehensive guide to understanding and managing sensory processing differences in individuals with ASD.",
    tags: ["Sensory Processing", "Coping Strategies", "Daily Life"],
    featured: true
  },
  {
    id: 2,
    title: "Social Skills Development for Teens with ASD",
    type: "guide",
    format: "PDF",
    author: "Michael Chen, MSW",
    description: "Practical strategies and exercises for developing social skills in teenagers with autism spectrum disorder.",
    tags: ["Social Skills", "Teenagers", "Communication"],
    featured: false
  },
  {
    id: 3,
    title: "Navigating the Workplace with ASD",
    type: "guide",
    format: "PDF",
    author: "Emily Rodriguez, PhD",
    description: "Career guidance and workplace accommodation strategies for adults with autism spectrum disorder.",
    tags: ["Employment", "Adults", "Accommodations"],
    featured: true
  },
  {
    id: 4,
    title: "Understanding Executive Functioning in ASD",
    type: "video",
    format: "Video",
    author: "Dr. James Wilson",
    description: "An informative video explaining executive functioning challenges and strategies for individuals with ASD.",
    tags: ["Executive Function", "Cognitive Skills", "Organization"],
    featured: false
  },
  {
    id: 5,
    title: "Sensory-Friendly Home Environment Guide",
    type: "guide",
    format: "PDF",
    author: "Aisha Patel, OT",
    description: "How to create a sensory-friendly home environment that supports individuals with ASD.",
    tags: ["Sensory", "Home Environment", "Practical Tips"],
    featured: false
  },
  {
    id: 6,
    title: "Communication Strategies for ASD",
    type: "video",
    format: "Video",
    author: "Dr. Robert Kim",
    description: "Video tutorial on effective communication strategies for individuals with autism spectrum disorder.",
    tags: ["Communication", "Social Skills", "Relationships"],
    featured: true
  },
  {
    id: 7,
    title: "ASD and Anxiety: Coping Techniques",
    type: "article",
    format: "Article",
    author: "Lisa Thompson, LMFT",
    description: "Research-based article exploring the connection between ASD and anxiety, with practical coping techniques.",
    tags: ["Anxiety", "Mental Health", "Coping Strategies"],
    featured: false
  },
  {
    id: 8,
    title: "Supporting ASD Children in School Settings",
    type: "guide",
    format: "PDF",
    author: "Education Support Network",
    description: "A guide for educators and parents on supporting children with ASD in educational environments.",
    tags: ["Education", "Children", "School Support"],
    featured: false
  }
];

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter resources based on search term and active tab
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "featured") return matchesSearch && resource.featured;
    return matchesSearch && resource.type === activeTab;
  });

  // Get format icon
  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "article":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-spectrum-purple-dark mb-2">Resource Library</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Access our collection of curated educational resources specifically designed
        for individuals with ASD, their families, and healthcare providers.
      </p>

      {/* Search and Filter */}
      <Card className="mb-8 border-spectrum-blue-light">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and Resources */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-spectrum-purple-light rounded-md text-spectrum-purple-dark">
                        {getFormatIcon(resource.format)}
                      </div>
                      {resource.featured && (
                        <Badge className="bg-spectrum-blue text-white">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="mt-2">{resource.title}</CardTitle>
                    <CardDescription>{resource.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 focus-ring">
                      {resource.format === "PDF" ? (
                        <>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" /> View
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="focus-ring">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Resources Categories */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-spectrum-purple-dark">Resource Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-spectrum-blue-light to-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-spectrum-blue/20 mb-4">
                <BookOpen className="h-8 w-8 text-spectrum-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2">Educational Materials</h3>
              <p className="text-gray-600 mb-4">Guides, books, and learning materials for different age groups</p>
              <Button variant="outline" className="w-full border-spectrum-blue text-spectrum-blue hover:bg-spectrum-blue hover:text-white focus-ring">
                Browse Materials
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-spectrum-purple-light to-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-spectrum-purple/20 mb-4">
                <Video className="h-8 w-8 text-spectrum-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Instructional videos covering various ASD-related topics</p>
              <Button variant="outline" className="w-full border-spectrum-purple text-spectrum-purple hover:bg-spectrum-purple hover:text-white focus-ring">
                View Videos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-spectrum-blue-light to-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-spectrum-blue/20 mb-4">
                <FileText className="h-8 w-8 text-spectrum-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2">Research Articles</h3>
              <p className="text-gray-600 mb-4">Latest research findings and academic articles on ASD</p>
              <Button variant="outline" className="w-full border-spectrum-blue text-spectrum-blue hover:bg-spectrum-blue hover:text-white focus-ring">
                Explore Research
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-spectrum-purple-light to-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-spectrum-purple/20 mb-4">
                <Download className="h-8 w-8 text-spectrum-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">Downloadable Tools</h3>
              <p className="text-gray-600 mb-4">Practical tools, templates, and worksheets for daily support</p>
              <Button variant="outline" className="w-full border-spectrum-purple text-spectrum-purple hover:bg-spectrum-purple hover:text-white focus-ring">
                Get Tools
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
