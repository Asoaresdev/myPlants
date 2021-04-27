import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, StyleSheet, SafeAreaView, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage  from '@react-native-async-storage/async-storage'

export function UserIdentification() {
    const [ isFocused, setIsFocused ] = useState(false)
    const [ isFilled, setIsFilled ] = useState(false)
    const [ name, setName ] = useState<string>()

    const navigation = useNavigation()

    //Como o AsyncStorage retorna uma promessa, colocar a função assincrona e um await  na promessa para "aguardar" o nome ser salvo
    async function handleSubmit() {
        if(!name)
            return Alert.alert("Me diga seu nome, por favor 😉")

        //Chave-valor para salvar o nome. Para padronizar se usa o @ com o nome do app e o dado a ser salvo
        try {
            await AsyncStorage.setItem('@plantmanager:user', name)
            navigation.navigate('Confirmation', {
                title: 'Prontinho', 
                subtitle: 'Vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
        } catch {
            Alert.alert('Não foi possível salvar o usuário')
        }
    }
   
    function  handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }
    function  handleInputocus() {
        setIsFocused(true)
    }
    function handleInputChange(value:string) {
        setIsFilled(!!value)
        setName(value)
    }

    return (
        <SafeAreaView style= { styles.container }>
            <KeyboardAvoidingView 
                style= {styles.container}

                // fazendo a tela se ajustar quando o teclado aparece
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }    
            >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View style= { styles.content }>

                        <View style= { styles.form }>

                            {/* View colocada para deixar a transição para a subida do teclado mais suave */}
                            <View style={ styles.header}>
                                <Text style= { styles.emoji }> { isFilled ? '😀' : '🤔'} </Text>
                                <Text style= { styles.title }>Como podemos { '\n' } chamar você</Text>
                            </View>

                            <TextInput 
                            placeholder="Digite um nome"
                            style={[
                                styles.input,
                                (isFocused || isFilled) && { borderColor: colors.green }
                            ]}
                            onBlur= { handleInputBlur }
                            onFocus= { handleInputocus }
                            onChangeText= {handleInputChange}
                            />

                            <View style={ styles.footer }>
                                <Button 
                                title= 'Confirmar' 
                                onPress={ handleSubmit }
                                />
                            </View>
                            
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    content: {
        flex:1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center', 
    },
    header: {
        alignItems:'center'
    },
    emoji: {
        fontSize:44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width:'100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign:'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})