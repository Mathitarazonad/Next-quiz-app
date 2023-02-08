import LevelsProvider from "@/contexts/LevelsContext"
import CoinsProvider from "@/contexts/CoinsContext"
import UserProvider from "@/contexts/UserContext"
import '@/global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className='bg-zinc-200 font-poppins p-2'>
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
