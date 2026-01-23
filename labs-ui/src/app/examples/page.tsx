import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash, MoreHorizontal, Download } from "lucide-react"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
]

const projects = [
  { name: "Website Redesign", status: "In Progress", priority: "High", assignee: "John Doe" },
  { name: "Mobile App", status: "Planning", priority: "Medium", assignee: "Jane Smith" },
  { name: "API Integration", status: "Completed", priority: "Low", assignee: "Bob Johnson" },
]

export default function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Esimerkit</h1>
        <p className="text-lg text-muted-foreground">Käytännön esimerkkejä ja mallipohjia Spektri.Labs UI -komponenteilla</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Login Form */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Kirjautumislomake</CardTitle>
            <CardDescription>Yksinkertainen kirjautumislomakkeen esimerkki</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Sähköposti</Label>
              <Input id="login-email" type="email" placeholder="matti@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Salasana</Label>
              <Input id="login-password" type="password" />
            </div>
            <Button className="w-full">Kirjaudu sisään</Button>
            <div className="text-center text-sm text-muted-foreground">
              Eikö sinulla ole vielä tiliä?{" "}
              <Button variant="link" className="p-0 h-auto">
                Luo tili
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Profile Card */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Käyttäjäprofiili</CardTitle>
            <CardDescription>Näytä käyttäjätiedot ja toiminnot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h4 className="font-semibold">Matti Meikäläinen</h4>
                <p className="text-sm text-muted-foreground">matti@spektrilabs.com</p>
              </div>
              <Badge>Pro</Badge>
            </div>
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Projektit</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tiimin jäsenet</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tallennustila</span>
                  <span className="text-sm font-medium">2.4 GB</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Näytä profiili
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Project Dashboard */}
      <Card className="mb-8 card-premium">
        <CardHeader>
          <CardTitle>Projektien hallintapaneeli</CardTitle>
          <CardDescription>Yleiskuva käynnissä olevista projekteista ja tilasta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{project.name}</h4>
                    <Badge variant={
                      project.status === "Completed" ? "default" :
                      project.status === "In Progress" ? "secondary" : "outline"
                    }>
                      {project.status === "Completed" ? "Valmis" : project.status === "In Progress" ? "Käynnissä" : "Suunnitteilla"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Vastuuhenkilö: {project.assignee}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      project.priority === "High" ? "destructive" :
                      project.priority === "Medium" ? "default" : "secondary"
                    }>
                      {project.priority === "High" ? "Korkea" : project.priority === "Medium" ? "Keskitaso" : "Matala"}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle>Käyttäjien hallinta</CardTitle>
          <CardDescription>Hallinnoi ja tarkastele käyttäjätilejä</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nimi</th>
                  <th className="text-left py-2">Sähköposti</th>
                  <th className="text-left py-2">Rooli</th>
                  <th className="text-left py-2">Tila</th>
                  <th className="text-right py-2">Toiminnot</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2 font-medium">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">
                      <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                        {user.role === "Admin" ? "Ylläpitäjä" : "Käyttäjä"}
                      </Badge>
                    </td>
                    <td className="py-2">
                      <Badge variant={user.status === "Active" ? "default" : "outline"}>
                        {user.status === "Active" ? "Aktiivinen" : "Passiivinen"}
                      </Badge>
                    </td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
