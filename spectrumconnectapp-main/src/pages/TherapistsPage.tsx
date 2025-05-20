import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { getAllTherapists } from "@/services /therapistservices";
import { Therapist } from "@/lib/types";
import { Link, useNavigate } from "react-router-dom";

const TherapistsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const data = await getAllTherapists();
        setTherapists(data);
        setFilteredTherapists(data);
      } catch (error) {
        console.error("Failed to fetch therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setFilteredTherapists(therapists);
    } else {
      const filtered = therapists.filter(
        (therapist) =>
          therapist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredTherapists(filtered);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-spectrum-purple-dark mb-6">Find a Specialized Therapist</h1>
      
      {/* Search Section */}
      <Card className="mb-8 border-spectrum-blue-light">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by name, specialty, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-ring"
                />
              </div>
            </div>
            <Button type="submit" className="focus-ring whitespace-nowrap">
              Search Therapists
            </Button>
            <Button type="button" variant="outline" className="flex items-center gap-2 focus-ring whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-16 w-16 border-2 border-spectrum-purple-light">
                      <AvatarImage src={therapist.image} alt={therapist.name} />
                      <AvatarFallback>{therapist.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 bg-spectrum-blue-light text-spectrum-blue-dark rounded-full px-3 py-1 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{therapist.rating}</span>
                      <span className="text-xs text-gray-600">({therapist.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{therapist.name}</h3>
                  <p className="text-gray-600 mb-2">{therapist.specialty}</p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{therapist.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {therapist.tags?.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-spectrum-purple-light text-spectrum-purple-dark text-xs rounded-full px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{therapist.experience} experience</p>
                  <p className="text-sm font-medium text-green-600 mb-4">{therapist.availability}</p>
                  <div className="flex gap-2">
                    <Button className="w-full focus-ring" onClick={() => navigate("/appointments", { state: { selectedTherapistId: therapist.id } })}>
                      Book a Session
                    </Button>
                    <Button variant="outline" className="w-full focus-ring" asChild>
                      <Link to={`/therapists/${therapist.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No therapists found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistsPage;
