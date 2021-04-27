import React from 'react'
import { Text, View} from 'react-native'
import { Welcome } from './src/pages/Welcome'
import { useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import { UserIdentification } from './src/pages/UserIdentification'
import { Confirmation } from './src/pages/Confirmation'
import Routes from './src/routes'

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  // garantir o carregamento da fonte usando o expo-app-loading
  if(!fontsLoaded)
  return<AppLoading />
  return (
   
      // <Welcome />
      // <UserIdentification />
      <Routes />
 
  )
}
