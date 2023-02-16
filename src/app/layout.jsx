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
            <CoinsProvider>
              <SoundProvider>
                <LogoutButton />
                {children}
              </SoundProvider>
            </CoinsProvider>
          </UserProvider>
        </LevelsProvider>
      </body>
    </html>
  )
}
