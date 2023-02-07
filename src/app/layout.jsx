import LevelsProvider from "@/contexts/LevelsContext"
import CoinsProvider from "@/contexts/CoinsContext"
import UserProvider from "@/contexts/UserContext"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <LevelsProvider>
          <UserProvider>
            <CoinsProvider>
              {children}
            </CoinsProvider>
          </UserProvider>
        </LevelsProvider> 
      </body>
    </html>
  )
}
