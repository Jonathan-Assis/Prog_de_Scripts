import React, {FC,useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { FAB } from 'react-native-paper';
import styles from './styles';
import { useAuth, usePet, useBackHandler } from "../../hooks";
import {PetType, PetProviderType} from '../../types'
import {Loading} from '../../components'


export default function Pet(props:any){
  const [selected,setSelected] = useState<string>('');
  const [register,setRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { pet, setPet, petList, petCreate, petRemove } = usePet() as PetProviderType;
  
  const { signOut, token } = useAuth();
  const [list, setList] = useState<PetType[]>([]);

  useEffect(()=>{
    async function list(){
      setLoading(true);
      const response = await petList();
      if( response.pets ){
        setList(response.pets);
        if( response.pets.length > 0 ){
          setSelected(response.pets[0].idpet);
          setPet(response.pets[0]);
        }
      }
      setLoading(false);
    }
    list();
  },[]);

  useBackHandler(() => {
    // verifica se está na tela Pet (tela atual)
    if( props.navigation.isFocused() ){
      exit();
    }
    else{
      props.navigation.goBack();
    }
    return true;
  });

  const exit = () => {
    Alert.alert('', "Deseja encerrar o aplicativo?", [
        { text: "sim", onPress: () => signOut() },
        {text: "não",onPress: () => '', style: 'cancel'}
      ]);
  };

  const add = async (name:string) => {
    name = name.trim();
    if( name ){
      setLoading(true);
      const response = await petCreate(name);
      if( response.idpet ){
        const aux:PetType[] = [...list, response];
        setList(aux);
        setSelected(response.idpet);
        setPet(response);
        setRegister(false);
      }
      else
        Alert.alert(response.error || "Problemas para cadastrar o pet");
      setLoading(false);
    }
    else
      Alert.alert("Forneça o nome do pet");
  };

  const remove = async (idpet:string,name:string) => {
    Alert.alert(
      '',
      `Excluir definitivamente o pet ${name}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            setLoading(true);
            const response = await petRemove(idpet);
            if( response.idpet ){
              const aux = [...list];
              for(let i = 0; i < aux.length; i++){
                if( aux[i].idpet == idpet ){
                  aux.splice(i,1);
                  setList(aux);
                  if( idpet == selected && aux.length > 0 ){  
                    setSelected(aux[0].idpet);
                    setPet(aux[0]);
                  }
                  else if( idpet == selected && aux.length == 0 )
                    setPet({});
                  break;
                }
              }
            }
            else
              Alert.alert(response.error || "Problemas para excluir o pet");
            setLoading(false);
          },
        },
        {
          text: "Não",
        }
      ]);
  };

  const Item:FC<PetType>=(props) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemtext} onPress={()=> {setSelected(props.idpet); setPet(props)}}>
        <Text style={[styles.propsname,selected == props.idpet &&{fontWeight:'bold'}]}>{props.name}</Text>
        { selected == props.idpet &&
          <Entypo name="check" color="#555" size={25} style={styles.itemcheck} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.remove} onPress={()=>remove(props.idpet, props.name)}>
        <MaterialCommunityIcons name='delete' color="#555" size={25} />
      </TouchableOpacity>
    </View>
  );

  return (
    loading ? 
      <Loading title="Carregando..."/>
    :
    register ?
      <Register setRegister={setRegister} add={add} />
    :
    <View style={styles.container}>
      {
        list.length > 0 ?
        <ScrollView style={styles.scroll}>
          <FlatList
            data={list}
            renderItem={({item})=> <Item {...item}/>}
            keyExtractor={item => item.idpet}
          />
        </ScrollView>
        :
        <Empty message="Clique no botão para cadastrar um pet" />
      }
      <FAB
        style={styles.add}
        small
        color="white"
        icon="plus"
        onPress={() => setRegister(true)}
      />
      <FAB
        style={styles.exit}
        small
        color="white"
        icon="exit-to-app"
        onPress={() => exit()}
      />
    </View>   
  );
}

const Empty:FC<{message:string}>=(props)=>{
  return (
    <View style={styles.msg}>
      <Text style={styles.msgtext}>
      {props.message}
      </Text>
    </View>
  );
}

function Register(props:{add:Function,setRegister:Function}){
  const [name, setName] = useState<string>('');
  
  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR PET</Text>
        <View style={{marginTop:20}}>
          <Text style={styles.label}>Nome do pet</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity style={styles.button} onPress={()=>props.add(name)}>
            <Text style={styles.buttonLabel}>salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>props.setRegister(false)}>
            <Text style={styles.buttonLabel}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
