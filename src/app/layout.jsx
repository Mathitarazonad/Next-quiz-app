import LevelsProvider from '@/contexts/LevelsContext'
import CoinsProvider from '@/contexts/CoinsContext'
import UserProvider from '@/contexts/UserContext'
import '../global.css'
import LogoutButton from '@/components/RegisterComponents/LogoutButton'
import SoundProvider from '@/contexts/SoundContext'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-zinc-200 font-poppins'>
        <LevelsProvider>
          <UserProvider>
            <SoundProvider>
              <CoinsProvider>
                <LogoutButton />
                {children}
              </CoinsProvider>
            </SoundProvider>
          </UserProvider>
        </LevelsProvider>
      </body>
    </html>
  )
}
