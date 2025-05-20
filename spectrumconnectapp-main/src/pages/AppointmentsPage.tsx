
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, Video, UserCircle, Plus, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { bookAppointment,getAppointments,confirmAppointments } from "@/services /appointmentService";
import { getAllTherapists } from "@/services /therapistservices";
import { Therapist } from '../lib/types';
import { Appointment,AppointmentRequest } from '../lib/types';


const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("pending");
  const [bookingMode, setBookingMode] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userType, userProfile } = useAuth();
  
  // Time slots for booking
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM",
    "01:00 PM - 02:00 PM",
    "02:30 PM - 03:30 PM",
    "04:00 PM - 05:00 PM",
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const fetchedAppointments = await getAppointments(userType);
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchTherapists = async () => {
      try {
        const fetchedTherapists = await getAllTherapists();
        setTherapists(fetchedTherapists);
      } catch (error) {
        console.error("Failed to fetch therapists:", error);
      }
    };
  
    fetchAppointments();
    fetchTherapists();
  }, []);
  
  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(
    (appointment) => {
      if (activeTab === "pending") return appointment.status === "pending";
      if (activeTab === "confirmed") return appointment.status === "confirmed";
      if (activeTab === "completed") return appointment.status === "completed";
      if (activeTab === "cancelled") return appointment.status === "cancelled";
      return true;
    }
  );
  
  // Format the selected date for display
  const formattedSelectedDate = date ? format(date, "EEEE, MMMM d, yyyy") : "";

  // Handle the start of the booking process (only for users)
  const startBooking = () => {
    if (userType !== "user") return;
    
    setBookingMode(true);
    setSelectedTherapist(null);
    setSelectedTimeSlot(null);
    setDate(new Date());
  };
  
  // Handle the confirmation of an appointment
  const confirmAppointment = async () => {
    if (!selectedTherapist || !date || !selectedTimeSlot ) {
      toast({
        title: "Incomplete Selection",
        description: "Please select a therapist, date, and time slot",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Convert time slot and date to ISO format
      const [startTime] = selectedTimeSlot.split(" - ");
      const [hours, minutes] = startTime.match(/(\d+):(\d+)/)?.slice(1) || [];
      const isPM = startTime.includes("PM");
      
      const appointmentDate = new Date(date);
      appointmentDate.setHours(
        isPM && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes),
        0
      );
      
      const appointmentRequest: AppointmentRequest = {
        therapist_id: selectedTherapist,
        scheduled_time: appointmentDate.toISOString(),
      };    
      let newAppointment: Appointment;   
        // Use real API in production
        newAppointment = await bookAppointment(appointmentRequest);
      toast({
        title: "Appointment Scheduled",
        description: `Appointment requested with ${therapists.find(t => t.id === selectedTherapist)?.name} on ${formattedSelectedDate} at ${selectedTimeSlot}`,
      });
      
      setBookingMode(false);
      setSelectedTherapist(null);
      setSelectedTimeSlot(null);
      setActiveTab("pending");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: "Unable to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const acceptAppointment = async (appointmentId: number) => {
    try {
      await confirmAppointments(appointmentId);
      toast({
        title: "Appointment Confirmed",
        description: "You have accepted the appointment.",
      });
      const updatedAppointments = await getAppointments(userType);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error confirming appointment:", error);
      toast({
        title: "Error",
        description: "Could not confirm appointment.",
        variant: "destructive",
      });
    }
  };
  

  // Render therapist list for user to select
  const renderTherapistList = () => {
    return therapists.map((therapist) => (
      <div 
        key={therapist.id}
        className={`p-4 border rounded-lg flex items-center cursor-pointer transition-all ${
          selectedTherapist === therapist.id 
            ? 'border-spectrum-blue ring-2 ring-spectrum-blue-light' 
            : 'hover:border-gray-300'
        }`}
        onClick={() => setSelectedTherapist(therapist.id)}
      >
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src={therapist.image} alt={therapist.name} />
          <AvatarFallback>{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{therapist.name}</h3>
          <p className="text-sm text-gray-600">{therapist.specialty || therapist.specialty}</p>
        </div>
        {selectedTherapist === therapist.id && (
          <div className="h-6 w-6 bg-spectrum-blue rounded-full flex items-center justify-center text-white">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
    ));
  };

  // Render appointment card
  const renderAppointmentCard = (appointment: Appointment) => {
    const appointmentDate = parseISO(appointment.scheduled_time);
    
    return (
      <div
        key={appointment.id}
        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex flex-col">
            {userType === "user" && appointment.therapist && (
              <div className="flex items-center">
                <UserCircle className="h-5 w-5 mr-2 text-spectrum-purple" />
                <h3 className="font-bold">Dr. {appointment.therapist.name}</h3>
              </div>
            )}
            {userType === "therapist" && appointment.user && (
              <div className="flex items-center">
                <UserCircle className="h-5 w-5 mr-2 text-spectrum-purple" />
                <h3 className="font-bold">Client: {appointment.user.name}</h3>
              </div>
            )}
            <div className="flex items-center mt-2">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                {format(appointmentDate, "EEEE, MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                {format(appointmentDate, "h:mm a")} (60 minutes)
              </span>
            </div>
            <div className="flex items-center mt-1">
              <Video className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Video Call</span>
            </div>
          </div>
          <div className="flex gap-2">
            {appointment.status === "confirmed" && (
              <Button className="focus-ring">Join Session</Button>
            )}
            {appointment.status === "pending" && userType === "therapist" && (
              <>
                <Button className="focus-ring" onClick={() => acceptAppointment(appointment.id)}>Accept</Button>
                <Button variant="outline" className="focus-ring">Decline</Button>
              </>
            )}
            {appointment.status === "pending" && userType === "user" && (
              <Button variant="outline" className="focus-ring">
                Cancel Request
              </Button>
            )}
            {appointment.status === "completed" && userType === "user" && (
              <Button className="focus-ring" onClick={startBooking}>Book Again</Button>
            )}
            {appointment.status === "completed" && (
              <Button variant="outline" className="focus-ring">
                View Notes
              </Button>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className={`px-2 py-1 rounded-full text-xs ${
            appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
            appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
            appointment.status === "completed" ? "bg-blue-100 text-blue-800" :
            "bg-red-100 text-red-800"
          }`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-8 animate-fade-in">
      {bookingMode && userType === "user" ? (
        // Booking flow interface - only for users
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-spectrum-purple-dark">Schedule New Appointment</h1>
            <Button variant="outline" onClick={() => setBookingMode(false)} className="focus-ring">
              Cancel
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select a Therapist */}
            <Card className="border-spectrum-blue-light">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-spectrum-blue-light text-white flex items-center justify-center mr-3">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Select a Therapist</h2>
                </div>
                
                <div className="space-y-3 mt-4">
                  {renderTherapistList()}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select a Date */}
            <Card className="border-spectrum-blue-light">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-spectrum-blue-light text-white flex items-center justify-center mr-3">
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Select a Date</h2>
                </div>
                
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto border-0"
                />
                
                {date && (
                  <div className="mt-4 text-center p-3 bg-blue-50 rounded-md">
                    <p className="text-sm">Selected: {formattedSelectedDate}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Select a Time Slot */}
            <Card className="border-spectrum-blue-light">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-spectrum-blue-light text-white flex items-center justify-center mr-3">
                    3
                  </div>
                  <h2 className="text-xl font-semibold">Select a Time Slot</h2>
                </div>
                
                <div className="space-y-3 mt-4">
                  {timeSlots.map((timeSlot) => (
                    <div 
                      key={timeSlot}
                      className={`p-4 border rounded-lg flex items-center cursor-pointer transition-all ${
                        selectedTimeSlot === timeSlot 
                          ? 'border-spectrum-blue ring-2 ring-spectrum-blue-light' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTimeSlot(timeSlot)}
                    >
                      <Clock className="h-5 w-5 mr-3 text-gray-600" />
                      <span>{timeSlot}</span>
                      {selectedTimeSlot === timeSlot && (
                        <div className="h-6 w-6 bg-spectrum-blue rounded-full flex items-center justify-center text-white ml-auto">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={confirmAppointment}
                  disabled={!selectedTherapist || !date || !selectedTimeSlot}
                >
                  Request Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Regular appointments view
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-spectrum-purple-dark">
              {userType === "user" ? "My Appointments" : "Client Appointments"}
            </h1>
            {userType === "user" && (
              <Button className="focus-ring" onClick={startBooking}>
                <Plus className="mr-2 h-4 w-4" /> Book a Session
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <Card className="lg:col-span-1 h-fit border-spectrum-blue-light">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
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
                  <h3 className="text-sm font-medium mb-2">Selected Date</h3>
                  {date && (
                    <p className="text-gray-600">{format(date, "PPP")}</p>
                  )}
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium mb-2">
                      {userType === "user" ? "Upcoming on this date" : "Sessions on this date"}
                    </h3>
                    {appointments.some(
                      (appointment) => {
                        const appointmentDate = new Date(appointment.scheduled_time);
                        return date &&
                          appointmentDate.getDate() === date.getDate() &&
                          appointmentDate.getMonth() === date.getMonth() &&
                          appointmentDate.getFullYear() === date.getFullYear();
                      }
                    ) ? (
                      appointments
                        .filter(
                          (appointment) => {
                            const appointmentDate = new Date(appointment.scheduled_time);
                            return date &&
                              appointmentDate.getDate() === date.getDate() &&
                              appointmentDate.getMonth() === date.getMonth() &&
                              appointmentDate.getFullYear() === date.getFullYear();
                          }
                        )
                        .map((appointment) => {
                          const appointmentDate = new Date(appointment.scheduled_time);
                          return (
                            <div
                              key={appointment.id}
                              className="p-2 bg-spectrum-blue-light rounded-md text-sm"
                            >
                              <p className="font-medium">
                                {userType === "user" ? 
                                  `Dr. ${appointment.therapist?.name}` : 
                                  `${appointment.user?.name}`
                                }
                              </p>
                              <p className="text-gray-600">
                                {format(appointmentDate, "h:mm a")} - 60 min
                              </p>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-gray-500 text-sm">No appointments scheduled</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments List */}
            <Card className="lg:col-span-2 border-spectrum-purple-light">
              <CardHeader>
                <CardTitle className="text-xl">
                  {userType === "user" ? "My Sessions" : "Client Sessions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab}>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-purple"></div>
                      </div>
                    ) : filteredAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {filteredAppointments.map(appointment => renderAppointmentCard(appointment))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium mb-2">No {activeTab} appointments</h3>
                        {userType === "user" && activeTab === "pending" && (
                          <>
                            <p className="text-gray-600 mb-4">Book your first session with a specialist</p>
                            <Button className="focus-ring" onClick={startBooking}>
                              <Plus className="mr-2 h-4 w-4" /> Book a Session
                            </Button>
                          </>
                        )}
                        {userType === "therapist" && (
                          <p className="text-gray-600">You'll see {activeTab} client appointments here</p>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsPage;
