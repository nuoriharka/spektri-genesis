"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Download, Share } from "lucide-react"

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Komponenttikirjasto</h1>
        <p className="text-lg text-muted-foreground">
          Tutustu kauniisiin ja saavutettaviin komponentteihin, rakennettu shadcn/ui-komponenteilla
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Buttons Section */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Painikkeet</CardTitle>
            <CardDescription>Tyylit, tilat ja koot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Oletus</Button>
              <Button variant="secondary">Toissijainen</Button>
              <Button variant="outline">Ääriviiva</Button>
              <Button variant="ghost">Haamu</Button>
              <Button variant="link">Linkki</Button>
              <Button variant="destructive">Vaarallinen</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Pieni</Button>
              <Button size="default">Oletus</Button>
              <Button size="lg">Suuri</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button disabled>Poissa käytöstä</Button>
              <Button>
                <Star className="mr-2 h-4 w-4" />
                Kuvakkeella
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Lataa
                <Badge variant="secondary" className="ml-2">Uusi</Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls Section */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Lomakekentät</CardTitle>
            <CardDescription>Syötekentät ja lomake-elementit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Sähköposti</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="anna sähköpostisi"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Salasana</Label>
              <Input id="password" type="password" placeholder="syötä salasanasi" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Viesti</Label>
              <Textarea id="message" placeholder="Kirjoita viestisi tähän..." />
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Tunnukset</CardTitle>
            <CardDescription>Tilaindikaattorit ja merkinnät</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Oletus</Badge>
              <Badge variant="secondary">Toissijainen</Badge>
              <Badge variant="outline">Ääriviiva</Badge>
              <Badge variant="destructive">Vaarallinen</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500">
                <Heart className="w-3 h-3 mr-1" />
                Onnistui
              </Badge>
              <Badge className="bg-yellow-500">
                <Star className="w-3 h-3 mr-1" />
                Nosto
              </Badge>
              <Badge className="bg-blue-500">
                <Share className="w-3 h-3 mr-1" />
                Jaettu
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card Examples */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Korttiesimerkit</CardTitle>
            <CardDescription>Erilaisia korttilayoutteja ja sisältöjä</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Yksinkertainen kortti</h4>
              <p className="text-sm text-muted-foreground">Yksinkertainen kortti perussisällöllä.</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Ominaisuuskortti</h4>
                  <p className="text-sm text-muted-foreground">Toiminnoilla</p>
                </div>
                <Button size="sm">Toiminto</Button>
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tilastot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center card-premium">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">50+</div>
              <p className="text-xs text-muted-foreground">Komponenttia</p>
            </CardContent>
          </Card>
          <Card className="text-center card-premium">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Käytettävyys</p>
            </CardContent>
          </Card>
          <Card className="text-center card-premium">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">10K+</div>
              <p className="text-xs text-muted-foreground">Latausta</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
