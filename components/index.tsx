import { View, Text, ActivityIndicator} from 'react-native'
import React,{FC} from 'react'

const Loading:FC<{title:string}> = (props:any) => (
  <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#FFC125'}}>
  <Text style={{marginBottom:20}}>{props.title}</Text>
      <ActivityIndicator size="large" color="#666" />
  </View>
)
export {Loading}