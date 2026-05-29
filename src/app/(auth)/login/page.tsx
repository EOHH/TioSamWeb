import { LoginForm } from '@/features/auth/components/LoginForm'
import { Sparkles } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative px-4">
      {/* Background ambient effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="z-10 w-full flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Premium Access</span>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
