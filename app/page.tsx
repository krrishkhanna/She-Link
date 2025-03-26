import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, MessageCircle, Calendar, Heart, Sparkles, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">SheLink</h1>
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Community
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Resources
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-pink-600 hover:bg-pink-700">Join Now</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-6 p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-pink-700 dark:text-pink-300">
                <Sparkles size={14} />
                <span>Empowering Women Through Community</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              A Safe Space for Women to Connect
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join our secure, women-only community forum designed with privacy and safety at its core. Share ideas,
              find support, and connect in a private, encrypted environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 gap-2 w-full sm:w-auto">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose SheLink?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We've built a platform that prioritizes women's safety, privacy, and community needs
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-pink-600 dark:text-pink-400">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-muted-foreground">
                  Your conversations are protected with military-grade encryption. Only you and your intended recipients
                  can read your messages.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-purple-600 dark:text-purple-400">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Community</h3>
                <p className="text-muted-foreground">
                  Our verification process ensures that our community remains a safe space exclusively for women.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/20 dark:to-pink-900/20 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-blue-600 dark:text-blue-400">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Support</h3>
                <p className="text-muted-foreground">
                  Get instant answers and support with our integrated Gemini 2.0 chatbot, designed to help you navigate
                  the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Features Designed for You</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Everything you need to connect, share, and grow in a supportive environment
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-pink-600 dark:text-pink-400">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Messaging</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with other members through our encrypted messaging system.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-purple-600 dark:text-purple-400">
                  <Calendar size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Events</h3>
                <p className="text-muted-foreground text-sm">
                  Discover and participate in virtual and in-person events.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-blue-600 dark:text-blue-400">
                  <Heart size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Support Network</h3>
                <p className="text-muted-foreground text-sm">
                  Find and offer support through our community forums and groups.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-pink-600 dark:text-pink-400">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Resource Library</h3>
                <p className="text-muted-foreground text-sm">
                  Access a curated collection of resources for women's wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-pink-600 dark:text-pink-400" />
                    <span className="text-sm font-medium">
                      {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {["Women in Tech Conference", "Leadership Workshop", "Wellness Retreat"][i - 1]}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Join us for this exciting event designed to empower and connect women from all backgrounds.
                  </p>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-pink-600 border-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-950"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with like-minded women, share experiences, and be part of a supportive community.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Join SheLink Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <div className="bg-pink-600 text-white py-2 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            <span className="mx-4">Women's Helpline: 1091</span>
            <span className="mx-4">Domestic Violence Helpline: 181</span>
            <span className="mx-4">Police: 100</span>
            <span className="mx-4">Women's Commission: 011-23379181</span>
            <span className="mx-4">Emergency Medical: 108</span>
            <span className="mx-4">Women's Helpline: 1091</span>
            <span className="mx-4">Domestic Violence Helpline: 181</span>
            <span className="mx-4">Police: 100</span>
            <span className="mx-4">Women's Commission: 011-23379181</span>
            <span className="mx-4">Emergency Medical: 108</span>
          </div>
        </div>
      </div>

      <footer className="border-t py-8 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-600">SheLink</h3>
              <p className="text-sm text-muted-foreground">
                A secure, women-only community platform designed to connect, support, and empower.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Safety Center
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Report an Issue
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-pink-600">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SheLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

