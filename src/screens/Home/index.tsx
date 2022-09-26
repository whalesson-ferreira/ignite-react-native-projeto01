import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  FlatList,
	Alert
} from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participantName, setParticipantName] = useState('');
  const [participants, setParticipants] = useState<string[]>([ ]);

  function handleAddParticipant() {
		if(participantName === '') {
			return Alert.alert('Participante inválido', 'Insira o nome de um participante.');
		}
		else if(participants.includes(participantName)) {
			return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.');
		}
    setParticipants(prevState => [...prevState, participantName]);
		setParticipantName('');
  }

  function handleRemoveParticipant(name: string) {
		Alert.alert('Remover', `Remover o participante ${name}?`, [
			{
				text: 'Sim',
				onPress: () => {
					setParticipants(prevState => prevState.filter(participant => participant !== name));
					Alert.alert('Deletado', '', [{text: 'Ok'}], {cancelable: true});
				}
			},
			{
				text: 'Não',
				style: 'cancel'
			}
		]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor={'#6B6B6B'}
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddParticipant}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes à sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}   