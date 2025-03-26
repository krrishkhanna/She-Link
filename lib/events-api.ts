// Mock API for fetching events
// In a real app, you would fetch from an actual API

type Event = {
  id: string
  title: string
  date: string
  location: string
  description: string
  image?: string
}

export async function fetchEvents(): Promise<Event[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [
    {
      id: "1",
      title: "Women in Tech Conference",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      location: "San Francisco, CA",
      description: "Join us for a day of inspiring talks, networking, and workshops focused on women in technology.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      title: "Leadership Workshop",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      location: "New York, NY",
      description: "Develop your leadership skills in this interactive workshop led by industry experts.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "Wellness Retreat",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
      location: "Austin, TX",
      description: "Take a break and focus on your wellbeing with this weekend retreat designed for women in tech.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "4",
      title: "Coding Bootcamp",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      location: "Virtual",
      description:
        "Learn to code or improve your skills in this intensive bootcamp for women of all experience levels.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]
}

