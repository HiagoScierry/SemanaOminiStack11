import React from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import * as mailComposer from 'expo-mail-composer'

import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Detail() {
    const navigation = useNavigation()

    function navigateBack(){
        navigation.goBack()
    }

    const message = 'Mensagem programada para ONG'

    function sendEmail(){
        mailComposer.composeAsync({
            subject:'Heroi do caso : Cachorro atropelado',
            recipients:['hiagocarlosmoreira@hotmail.com'],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(
          `whatsapp://send?phone=+5527999880550&text=${message}`
        );
      }

    return (
        <View style={styles.conteiner}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidenProperty, { marginTop: 0 }]}> ONG :</Text>
                <Text style={styles.incidentValue}> VIPA </Text>

                <Text style={styles.incidenProperty}> caso :</Text>
                <Text style={styles.incidentValue}> Cachorro atropelado </Text>

                <Text style={styles.incidenProperty}> Valor</Text>
                <Text style={styles.incidentValue}> 120 </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}