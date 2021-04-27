import React from 'react'
import {  Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
    title:string
}

export function Button({ title, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.8}
                // o ..res tem que vir por ultimo, sempre
                {...rest}
            >
                <Text style={styles.buttonText}>
                   { title }
                </Text>
            </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 56,
        
        borderRadius: 16,
        // width:56,
        paddingHorizontal: 10
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }

})