'use client'

import { useState, useTransition } from 'react'
import { login, signup } from '../actions/auth.actions'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const action = isLogin ? login : signup
      const result = await action(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <Card className="w-full max-w-md border-primary/20 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/10">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">
          {isLogin ? 'Bienvenido de nuevo' : 'Crea una cuenta'}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Ingresa tus credenciales para acceder a tu colección' 
            : 'Únete a Ediciones Tio Sam para empezar a coleccionar'}
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="correo@ejemplo.com" 
              required 
              className="bg-background/50 border-border/50 focus-visible:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required 
              className="bg-background/50 border-border/50 focus-visible:ring-primary/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full shadow-lg shadow-primary/20 font-bold" 
            type="submit" 
            disabled={isPending}
          >
            {isPending ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }} 
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
