import './globals.css'

export const metadata = {
    title: 'Hedonicum · Restaurant Intelligence',
    description: 'Restaurant taste profile from 12 years of Swarm checkins',
}

export default function RootLayout({ children }) {
    return (
          <html lang="en">
            <body>{children}</body>
      </html>
    )
}
