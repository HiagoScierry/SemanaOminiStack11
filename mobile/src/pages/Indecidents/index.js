import React , {useEffect , useState}from 'react'
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)


    function navigateToDetail(){
        navigation.navigate('Detail') 
    }

    async function loadIndicidens(){
        const response = await api.get('incidents')
        setIncidents(response.data)
        setTotal(response.headers['x-total-count'])
    }

    useEffect(()=>{
        loadIndicidens()
    },[])

    return (
        <View style={styles.conteiner}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>.
                </Text>
            </View>

            <Text style={styles.title}> Bem-Vindo !</Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={  incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item : incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidenProperty}> ONG :</Text>
                        <Text style={styles.incidentValue}> {incident.name} </Text>

                        <Text style={styles.incidenProperty}> caso :</Text>
                        <Text style={styles.incidentValue}> {incident.title} </Text>

                        <Text style={styles.incidenProperty}> Valor :</Text>
                        <Text style={styles.incidentValue}>
                         {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}
                          </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
                            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                ) }
            >

            </FlatList>






        </View>
    )
}