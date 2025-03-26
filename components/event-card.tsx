import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

type EventProps = {
  event: {
    id: string
    title: string
    date: string
    location: string
    description: string
    image?: string
  }
}

export default function EventCard({ event }: EventProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={event.image || `/placeholder.svg?height=200&width=400`}
          alt={event.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            25 attendees
          </div>
        </div>
        <p className="text-sm line-clamp-2">{event.description}</p>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        <Button variant="outline" size="sm">
          Learn More
        </Button>
        <Button size="sm">RSVP</Button>
      </CardFooter>
    </Card>
  )
}

