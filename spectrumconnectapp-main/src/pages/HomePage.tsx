
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, MessageSquare, BookOpen, Search, Clock, Video, Shield } from "lucide-react";

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-spectrum-blue-light to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-spectrum-purple-dark">
                  Welcome to SpectrumConnect
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A supportive platform designed specifically for individuals with Autism Spectrum Disorder, connecting you to specialized therapists, community support, and resources.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="focus-ring">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="focus-ring">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 lg:flex lg:justify-end">
              <div className="aspect-video overflow-hidden rounded-xl">
                <img
                  alt="Hero image showing supportive community"
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-spectrum-purple-dark">
                How SpectrumConnect Helps You
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Our platform offers comprehensive support for individuals with ASD, combining mental health services with community features.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="border-2 border-spectrum-blue-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Search className="h-12 w-12 text-spectrum-blue" />
                <h3 className="text-xl font-bold">Find Specialists</h3>
                <p className="text-gray-600">
                  Search our directory of ASD-specialized therapists to find the right match for your needs.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-spectrum-purple-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Calendar className="h-12 w-12 text-spectrum-purple" />
                <h3 className="text-xl font-bold">Book Appointments</h3>
                <p className="text-gray-600">
                  Schedule therapy sessions with ease using our integrated appointment system.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-spectrum-blue-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Video className="h-12 w-12 text-spectrum-blue" />
                <h3 className="text-xl font-bold">Virtual Sessions</h3>
                <p className="text-gray-600">
                  Connect with therapists remotely through our secure video conferencing system.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-spectrum-purple-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <MessageSquare className="h-12 w-12 text-spectrum-purple" />
                <h3 className="text-xl font-bold">Community Forums</h3>
                <p className="text-gray-600">
                  Join moderated discussion spaces to connect with others who understand your experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-spectrum-blue-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <BookOpen className="h-12 w-12 text-spectrum-blue" />
                <h3 className="text-xl font-bold">Resource Library</h3>
                <p className="text-gray-600">
                  Access educational materials and resources specifically curated for the ASD community.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-spectrum-purple-light">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Shield className="h-12 w-12 text-spectrum-purple" />
                <h3 className="text-xl font-bold">Data Security</h3>
                <p className="text-gray-600">
                  Rest assured with our comprehensive security measures protecting your sensitive information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-spectrum-purple-light py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-spectrum-purple-dark">
                Ready to Connect?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Join our community today and take the first step towards personalized support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-spectrum-purple-dark hover:bg-spectrum-purple text-white focus-ring">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-spectrum-purple-dark text-spectrum-purple-dark hover:bg-spectrum-purple-light focus-ring">
                <Link to="/therapists">Browse Therapists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
