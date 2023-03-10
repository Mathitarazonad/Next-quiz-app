import { useCoins } from '@/contexts/CoinsContext'
import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import { useUser } from '@/contexts/UserContext'
import { updateUserCoins } from '@firebase/firestoreFunctions'
import SingleHability from './SingleAbility'

export default function Abilities() {
  const { setAbilityToUse, currentWord, completedWords } = useCurrentLevel()
  const { coins, setCoins } = useCoins()
  const { currentUser } = useUser()

  const handleAbility = (cost, ability) => {
    if (currentWord !== null && !completedWords[currentWord]) {
      setCoins(coins - cost)
      setAbilityToUse(ability)
      updateUserCoins(currentUser.displayName, coins - cost)
    }
  }

  return (
    <div className='flex justify-between items-start w-full'>
      <SingleHability cost={5} abilityDescription='Reveal half characters' ability={1} handleAbility={handleAbility} />
      <SingleHability cost={10} abilityDescription='Reveal random word' ability={2} handleAbility={handleAbility} />
      <SingleHability cost={15} abilityDescription='Reveal current word' ability={3} handleAbility={handleAbility} />
    </div>
  )
}
