import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  VideoIcon, 
  UserCircle, 
  CheckCircle2, 
  XCircle,
  MessageSquare,
  Users,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TherapistAccountSetup } from "@/components/TherapistsAccountSetup";
import { checkTherapistProfileStatus } from "@/services /therapistservices";
import { useAuth } from "@/context/AuthContext";

// Sample data for pending and upcoming appointments
const pendingAppointments = [
  {
    id: 1,
    patientName: "Alex Thompson",
    patientImg: "https://randomuser.me/api/portraits/men/97.jpg",
    date: new Date(2024, 6, 18, 11, 0),
    duration: 60,
    type: "Initial Consultation",
    notes: "First-time patient seeking support for ASD diagnosis"
  },
  {
    id: 2,
    patientName: "Jamie Rivera",
    patientImg: "https://randomuser.me/api/portraits/women/63.jpg",
    date: new Date(2024, 6, 19, 15, 30),
    duration: 45,
    type: "Follow-up Session",
    notes: "Discussing progress with communication strategies"
  }
];

const upcomingAppointments = [
  {
    id: 3,
    patientName: "Sam Wilson",
    patientImg: "https://randomuser.me/api/portraits/men/52.jpg",
    date: new Date(2024, 6, 15, 9, 0),
    duration: 60,
    type: "Regular Session",
    notes: "Weekly therapy session",
    confirmed: true
  },
  {
    id: 4,
    patientName: "Taylor Moore",
    patientImg: "https://randomuser.me/api/portraits/women/24.jpg",
    date: new Date(2024, 6, 15, 14, 0),
    duration: 60,
    type: "Assessment",
    notes: "Comprehensive ASD assessment follow-up",
    confirmed: true
  },
  {
    id: 5,
    patientName: "Jordan Kim",
    patientImg: "https://randomuser.me/api/portraits/women/45.jpg",
    date: new Date(2024, 6, 16, 11, 0),
    duration: 45,
    type: "Regular Session",
    notes: "Focus on sensory processing strategies",
    confirmed: true
  }
];

// Sample statistics
const stats = {
  pendingAppointments: 2,
  todayAppointments: 2,
  weeklyAppointments: 8,
  totalPatients: 15
};

const TherapistDashboardPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [profileCompleted, setProfileCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userType,token } = useAuth();

  // Check if the therapist has completed their profile
  useEffect(() => {
    const checkProfile = async () => {
      const isComplete = await checkTherapistProfileStatus(token);
      setProfileCompleted(isComplete);
      setIsLoading(false);
    };
  
    checkProfile();
  }, [token]);

  const handleConfirmAppointment = (appointmentId: number) => {
    // In a real app, this would make an API call to confirm the appointment
    toast({
      title: "Appointment Confirmed",
      description: "The appointment has been confirmed successfully",
    });
  };

  const handleDeclineAppointment = (appointmentId: number) => {
    // In a real app, this would make an API call to decline the appointment
    toast({
      title: "Appointment Declined",
      description: "The appointment has been declined",
      variant: "destructive",
    });
  };

  const handleProfileComplete = () => {
    setProfileCompleted(true);
    localStorage.setItem('therapistProfileCompleted', 'true');
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-spectrum-purple-dark">Therapist Dashboard</h1>
        <div className="flex justify-center py-12">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!profileCompleted) {
    return (
      <div className="container py-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-spectrum-purple-dark mb-6">Welcome to Spectrum</h1>
        <p className="text-gray-600 mb-8">Please complete your therapist profile to get started.</p>
        <TherapistAccountSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-spectrum-purple-dark">Therapist Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and patient interactions</p>
        </div>
        <Button className="focus-ring">
          <FileText className="mr-2 h-4 w-4" /> Create Session Notes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-spectrum-purple-light border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                <h3 className="text-2xl font-bold text-spectrum-purple-dark">{stats.pendingAppointments}</h3>
              </div>
              <div className="p-3 rounded-full bg-white">
                <Clock className="h-6 w-6 text-spectrum-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spectrum-blue-light border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <h3 className="text-2xl font-bold text-spectrum-blue-dark">{stats.todayAppointments}</h3>
              </div>
              <div className="p-3 rounded-full bg-white">
                <CalendarIcon className="h-6 w-6 text-spectrum-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spectrum-purple-light border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <h3 className="text-2xl font-bold text-spectrum-purple-dark">{stats.weeklyAppointments}</h3>
              </div>
              <div className="p-3 rounded-full bg-white">
                <VideoIcon className="h-6 w-6 text-spectrum-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spectrum-blue-light border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <h3 className="text-2xl font-bold text-spectrum-blue-dark">{stats.totalPatients}</h3>
              </div>
              <div className="p-3 rounded-full bg-white">
                <Users className="h-6 w-6 text-spectrum-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4">
              <Card className="border-spectrum-purple-light">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-spectrum-purple" /> 
                    Appointment Requests
                  </CardTitle>
                  <CardDescription>
                    Review and confirm appointment requests from patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pendingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={appointment.patientImg} alt={appointment.patientName} />
                                  <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{appointment.patientName}</h3>
                                  <Badge variant="outline" className="mt-1">{appointment.type}</Badge>
                                </div>
                              </div>
                              <div className="mt-3 space-y-1 text-sm">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">
                                    {format(appointment.date, "EEEE, MMMM d, yyyy")}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">
                                    {format(appointment.date, "h:mm a")} ({appointment.duration} minutes)
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">{appointment.notes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="focus-ring"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm
                              </Button>
                              <Button 
                                variant="outline" 
                                className="focus-ring"
                                onClick={() => handleDeclineAppointment(appointment.id)}
                              >
                                <XCircle className="mr-2 h-4 w-4" /> Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No pending appointment requests</h3>
                      <p className="text-gray-600">New requests will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              <Card className="border-spectrum-blue-light">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <VideoIcon className="mr-2 h-5 w-5 text-spectrum-blue" /> 
                    Confirmed Sessions
                  </CardTitle>
                  <CardDescription>
                    Your upcoming therapy sessions with patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div 
                          key={appointment.id} 
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={appointment.patientImg} alt={appointment.patientName} />
                                  <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{appointment.patientName}</h3>
                                  <Badge variant="outline" className="mt-1">{appointment.type}</Badge>
                                </div>
                              </div>
                              <div className="mt-3 space-y-1 text-sm">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">
                                    {format(appointment.date, "EEEE, MMMM d, yyyy")}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">
                                    {format(appointment.date, "h:mm a")} ({appointment.duration} minutes)
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-gray-600">{appointment.notes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button className="focus-ring">
                                Start Session
                              </Button>
                              <Button variant="outline" className="focus-ring">
                                View Notes
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No upcoming sessions scheduled</h3>
                      <p className="text-gray-600">Your confirmed sessions will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Calendar and Quick Tools */}
        <div className="space-y-6">
          <Card className="border-spectrum-blue-light">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CalendarIcon className="mr-2 h-5 w-5" /> 
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Sessions on {date && format(date, "MMMM d")}</h3>
                {upcomingAppointments.some(
                  (appointment) =>
                    date &&
                    appointment.date.getDate() === date.getDate() &&
                    appointment.date.getMonth() === date.getMonth() &&
                    appointment.date.getFullYear() === date.getFullYear()
                ) ? (
                  upcomingAppointments
                    .filter(
                      (appointment) =>
                        date &&
                        appointment.date.getDate() === date.getDate() &&
                        appointment.date.getMonth() === date.getMonth() &&
                        appointment.date.getFullYear() === date.getFullYear()
                    )
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-2 bg-spectrum-blue-light rounded-md text-sm mt-2"
                      >
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-xs">
                          {format(appointment.date, "h:mm a")} - {appointment.type}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-sm">No sessions scheduled</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start focus-ring">
                <FileText className="mr-2 h-4 w-4" /> Session Notes Templates
              </Button>
              <Button variant="outline" className="w-full justify-start focus-ring">
                <MessageSquare className="mr-2 h-4 w-4" /> Message Patients
              </Button>
              <Button variant="outline" className="w-full justify-start focus-ring">
                <UserCircle className="mr-2 h-4 w-4" /> Update Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboardPage;
