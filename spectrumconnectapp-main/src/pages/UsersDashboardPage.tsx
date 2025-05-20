
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, MessageSquare, BookOpen, User, Plus } from "lucide-react";

// Sample appointment data
const upcomingAppointments = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    therapistImg: "https://randomuser.me/api/portraits/women/44.jpg",
    date: new Date(2024, 6, 15, 10, 0),
    duration: 60,
    type: "Video Call",
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    therapistImg: "https://randomuser.me/api/portraits/men/32.jpg",
    date: new Date(2024, 6, 20, 14, 30),
    duration: 45,
    type: "Video Call",
  },
];

const UserDashboardPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-spectrum-purple-dark">User Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your therapy services.</p>
        </div>
        <Button className="focus-ring">
          <Link to="/appointments">Book a Session</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Dashboard cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-spectrum-blue-light">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-spectrum-blue-light rounded-full mb-3">
                  <CalendarIcon className="h-6 w-6 text-spectrum-blue" />
                </div>
                <h3 className="font-medium mb-2">Book Session</h3>
                <p className="text-sm text-gray-600 mb-3">Schedule your next therapy appointment</p>
                <Button variant="ghost" className="w-full focus-ring">
                  <Link to="/appointments">View Calendar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-spectrum-purple-light">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-spectrum-purple-light rounded-full mb-3">
                  <MessageSquare className="h-6 w-6 text-spectrum-purple" />
                </div>
                <h3 className="font-medium mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-3">Connect with others in the community</p>
                <Button variant="ghost" className="w-full focus-ring">
                  <Link to="/community">Join Discussions</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-spectrum-blue-light">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-spectrum-blue-light rounded-full mb-3">
                  <BookOpen className="h-6 w-6 text-spectrum-blue" />
                </div>
                <h3 className="font-medium mb-2">Resources</h3>
                <p className="text-sm text-gray-600 mb-3">Access helpful ASD resources</p>
                <Button variant="ghost" className="w-full focus-ring">
                  <Link to="/resources">View Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <Card className="border-spectrum-purple-light">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your scheduled sessions with therapists
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center mb-3 md:mb-0">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={appointment.therapistImg} alt={appointment.therapist} />
                          <AvatarFallback>{appointment.therapist.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{appointment.therapist}</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            <span>{format(appointment.date, "MMMM d, yyyy")}</span>
                            <Clock className="h-3 w-3 ml-3 mr-1" />
                            <span>{format(appointment.date, "h:mm a")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="focus-ring">Join Session</Button>
                        <Button size="sm" variant="outline" className="focus-ring">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-4">Schedule your first session with a specialist</p>
                  <Button className="focus-ring">
                    <Link to="/appointments">Book a Session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Therapists */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Recommended Therapists
              </CardTitle>
              <CardDescription>
                Specialists who match your needs and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dr. Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Dr. Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">ASD Specialist</p>
                    <p className="text-sm text-gray-600">10+ years experience</p>
                    <Button size="sm" variant="outline" className="mt-2 focus-ring">
                      <Link to="/therapists">View Profile</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dr. Michael Chen" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Dr. Michael Chen</h4>
                    <p className="text-sm text-gray-600">Child & Teen ASD Counselor</p>
                    <p className="text-sm text-gray-600">8 years experience</p>
                    <Button size="sm" variant="outline" className="mt-2 focus-ring">
                      <Link to="/therapists">View Profile</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="focus-ring">
                  <Link to="/therapists">View All Therapists</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Progress stats only, calendar removed */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Therapy Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Sessions Completed</span>
                    <span>8/12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-spectrum-purple h-2.5 rounded-full" style={{ width: "66%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Goals Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-spectrum-blue h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 focus-ring">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
