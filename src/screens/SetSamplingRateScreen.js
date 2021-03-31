import React, {useState} from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import styles from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import { changeParameter } from '../actions';
import { Container, Content, Form, Text, Label, Card, CardItem, Body, Item, Input } from 'native-base';


const SetSamplingRateScreen = () => {
    const dispatch = useDispatch();
    let device = useSelector(state => state.BLEs.connectedDevice);
    
    let parameters = useSelector(state => state.BLEs.parameters);
    const thisParameter = "SamplingRate"
    let newVal = "";
    let anyAlert = false;

    return (
        <Container>
            <Content>
                <Card>
                    <CardItem header bordered>
                        <Text>Connected: {device.name}</Text>
                    </CardItem>
                    <CardItem bordered>
                    <Body>
                        <Text>Current Sampling Rate: {parameters.SamplingRate} kHz</Text>
                    </Body>
                </CardItem>
                </Card>
                <Form> 
                    <Item fixedLabel>
                        <Label>New Sampling Rate</Label>
                        <Input // could use a picker instead
                            keyboardType = 'numeric'
                            onChangeText={(value) => {
                                newVal = value;
                                console.log(newVal);

                        }}/>
                    </Item>
                </Form>
                <Button
                    title="Submit"
                    onPress={() => {
                        var reg = new RegExp(/^[1-9]\d*(\.\d{1,2})?$/);
                        if (!reg.test(newVal)) {
                            alert('Songbirds will ignore any inputs other than number in this section');
                            newVal = newVal.replace(/[^0-9.]/g, "");
                        }
                        else{
                            dispatch(changeParameter(thisParameter, newVal));
                        }
                }}>
                </Button>
            </Content>
      </Container>
      //onPress={dispatch(updateSampleRate(rate))}
    );
};


export default SetSamplingRateScreen;