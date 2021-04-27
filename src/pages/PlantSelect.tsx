import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import Loading from '../components/Loading'
import { PlantCard } from '../components/PlantCard'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantProps } from '../libs/storage'


interface EnviromentProps {
    key:string;
    title:string;
}


export function PlantSelect() {
    const [enviroment, setEnviroment]= useState<EnviromentProps[]>([])
    const [plant, setPlant]= useState<PlantProps[]>([])
    const [filteredplant, setFilteredplant]= useState<PlantProps[]>([])
    const [enviromentActive, setEnviromentActive] = useState('all')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(true)

    const navigation = useNavigation()

    // Função para selecionar o ambiente
    function handleEnviromentActive(environment: string){
        setEnviromentActive(environment)

        if(environment === 'all')
            return setFilteredplant(plant)

        const filtered = plant.filter(item =>
            item.environments.includes(environment)
        )
        setFilteredplant(filtered)
    }

    async function fetchPlant() {
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`)

        if(!data)
        return setLoading(true)

        if(page > 1){
            setPlant(oldValue => [... oldValue, ...data])
            setFilteredplant(oldValue => [... oldValue, ...data])
        }else {
            setPlant(data)
            setFilteredplant(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handlePlantSelect(plant:PlantProps) {
        //O 'plant' passa as informações da api para a a tela da rota
        navigation.navigate('PlantSave', { plant })
    }

    function handleFatchMore(distance: number){
        if(distance < 1)
            return
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlant()
    }

    useEffect(() => { 
        async function fetchEnviroemnt() {
            const { data } = await api
            //ordenando em ordem alfabética usando o json server no endpoint 
            // ?_sort=title&_order=asc
            .get('plants_environments?_sort=title&_order=asc')
            setEnviroment([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }
        fetchEnviroemnt()
    }, [])

    useEffect(() => {       
        fetchPlant()
    }, [])

    if(loading)
    return <Loading />

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList 
                    data={ enviroment }
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => ( 
                        <EnviromentButton 
                            title= { item.title }
                            active= { item.key === enviromentActive }
                            onPress={()=>handleEnviromentActive(item.key)}
                    />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    contentContainerStyle={ styles.enviromentList }
                />  
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={ filteredplant }
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCard  
                            data={ item }
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={ false }
                    numColumns={2}
                    // quando o usuario chegar a 10%(0.1) do fim da tela   
                    onEndReachedThreshold={0.1}
                    //assim que chegou no ponto, algo deve acontecer
                    onEndReached={({ distanceFromEnd }) =>
                        handleFatchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore ?
                        <ActivityIndicator color={colors.green} /> :
                        <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }, 
    content: {
        paddingHorizontal: 30
    },
    title: {
        fontSize:17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize:17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
   
})