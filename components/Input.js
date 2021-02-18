import React, {useEffect, useReducer} from 'react';
import { StyleSheet, TextInput, View, Text } from "react-native";

const UPDATE_INPUT = 'UPDATE_INPUT';
const TOUCHED = "TOUCHED";

const inputREducer = (state, action) =>{
    switch (action.type) {
        case UPDATE_INPUT:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case TOUCHED:
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const Input =({title, initialValue, initialValidity, onChangeValue, id, errorText, ...props})=>{

    const [ inputState, dispatchInput ] = useReducer(inputREducer, {
        value: initialValue ? initialValue : '',
        isValid: initialValidity ? initialValidity : '',
        touched: false
    })

    useEffect(()=>{
        if (inputState.touched) {
            onChangeValue(id, inputState.value, inputState.isValid)
        }
    }, [inputState, onChangeValue, id])

    const onChangeTextHandler =(text) =>{

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        dispatchInput({ type: UPDATE_INPUT, value: text, isValid: isValid });

    }

    const onBlurHandler =() =>{
         dispatchInput({type: TOUCHED})
    }

    return <View style={styles.formFields}>
                <Text style={styles.label}>{title}</Text>
                <TextInput 
                    {...props}
                    style={styles.inputStyle} 
                    value={inputState.value} 
                    onChangeText={onChangeTextHandler} 
                    onBlur={onBlurHandler}
                />
            { !inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            )}
            </View>
}

const styles = StyleSheet.create({
    formFields: {
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        paddingTop: 5,
    },
    inputStyle: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
})

export default Input;