import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native'
import userImg from '../assets/eu.png'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncSotrage from '@react-native-async-storage/async-storage'

export function Header() {
    const [ userName, setUserName ] = useState<string>()

    useEffect(() => {
        async function loadStorageUSer() {
            const user = await AsyncSotrage.getItem('@plantmanager:user')
            // como o getItem nem sempre devolve algo, tem que tratar, por isso o (user || '')
            setUserName(user || '')
        }
        loadStorageUSer()
    }, [userName])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text 
                    style={styles.userName}>{userName}</Text>
            </View>
            <Image 
                source={userImg}
                style={styles.img}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
      
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
})