import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectDevice, changeStatus } from '../actions';
import base64 from 'react-native-base64'
import { Container, Header, Content, List, ListItem, 
    Text, Left, Right, Icon, Card, CardItem, Body, Button } from 'native-base';

// device.serviceUUIDs[0] === "4fafc201-1fb5..." // in theory

const DeviceScreen = ( { navigation } ) => {
    
    const dispatch = useDispatch();
    const device = useSelector(state => state.BLEs.connectedDevice);
    
    const parameters = useSelector(state => state.BLEs.parameters);

    const characteristic = useSelector(state => state.BLEs.characteristics[0]);
    // console.log("characteristics[0] in deviceScreen: ", characteristic);
    
    // NOTE: need to do base64 decode and encode of all characteristic values
    return (
        

        <Content> 
            <Card style={styles.cardBStyle}>
                <CardItem header bordered >
                    <Text>Connected: {device.name}</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Battery Level: {parameters.BatteryLevel}%</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Storage Capacity: {parameters.StorageCapacity}%</Text>
                    </Body>
                </CardItem>
            </Card>
            
            <List>

                <ListItem itemHeader first>
                    <Text>Recording Settings</Text>
                </ListItem>
                
                <ListItem onPress={() => navigation.navigate('SetDuration')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Duration:</Text>   
                        </View>
                        <Text>{parameters.RecordingDuration} hrs</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />  
                    </Right>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetSamplingRate')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Sampling Rate:</Text>   
                        </View>
                        <Text>{parameters.SamplingRate} kHz</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetSensitivity')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Sensitivity:</Text>
                        </View>
                        <Text>{parameters.Sensitivity}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Trigger Mode</Text>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetSchedule')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Schedule: </Text>
                        </View>
                        <Text>{parameters.ScheduleStart} - {parameters.ScheduleEnd}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetLight')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Light Intensity: </Text>
                        </View>
                        <Text>{parameters.LightIntensity}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetSound')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Sound Level: </Text>
                        </View>
                        <Text>{parameters.SoundLevel}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Tags</Text>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetGps')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>GPS Coordinates:</Text>
                        </View>
                        <Text>{parameters.GpsLatitude}, {parameters.GpsLongitude}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('SetClock')}>
                    <Left>
                        <View style={styles.listLeft}>
                            <Text>Device Clock:</Text>   
                        </View>
                        <Text>{parameters.DeviceClock}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>

            </List>


            
            <View style={styles.ButtonSection} >
                <Button rounded 
                    onPress={() => dispatch(disconnectDevice())}
                >
                    <Text>Disconnect</Text>
                </Button>
            </View>
           

        </Content>
    );
};

DeviceScreen.navigationOptions = () => ({
    // title: 'ggggg',
    headerStyle: {
      backgroundColor: '#FF9E00',
    },
  });

export default DeviceScreen;
