import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Ediciones Tio Sam</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for premium anime cards, figures, and collectible albums.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cards" className="hover:text-primary transition-colors">Anime Cards</Link></li>
              <li><Link href="/figures" className="hover:text-primary transition-colors">Figures & Statues</Link></li>
              <li><Link href="/albums" className="hover:text-primary transition-colors">Sticker Albums</Link></li>
              <li><Link href="/new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ediciones Tio Sam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
