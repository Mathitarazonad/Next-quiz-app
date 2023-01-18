import LevelsProvider from "@/contexts/LevelsContext"
import CoinsProvider from "@/contexts/CoinsContext"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <LevelsProvider>
          <CoinsProvider>
            {children}
          </CoinsProvider>
        </LevelsProvider> 
      </body>
    </html>
  )
}
