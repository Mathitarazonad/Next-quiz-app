import { useCoins } from '@/contexts/CoinsContext'
import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import { useLevels } from '@/contexts/LevelsContext'
import { useSound } from '@/contexts/SoundContext'
import { useUser } from '@/contexts/UserContext'
import { updateUserCoins } from '@firebase/firestoreFunctions'
import SingleHability from './SingleAbility'

export default function Abilities({ level, difficulty }) {
  const { setAbilityToUse, usedAbilities, setUsedAbilities, currentWord, completedWords, setAlertAtLeaving } = useCurrentLevel()
  const { coins, setCoins } = useCoins()
  const { currentUser } = useUser()
  const { levels } = useLevels()
  const { coinDropSound, abilityUnableSound } = useSound()

  const handleAbility = (cost, ability) => {
    if (usedAbilities.includes(ability) || coins < cost || (completedWords[currentWord]) || levels[level - 1].completedDifficulties.includes(difficulty)) {
      abilityUnableSound()
      return
    }

    if (((ability === 1 || ability === 3) && currentWord !== null) || ability === 2) {
      coinDropSound()
      setCoins(coins - cost)
      setAbilityToUse(ability)
      setUsedAbilities([...usedAbilities, ability])
      setAlertAtLeaving(true)
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
