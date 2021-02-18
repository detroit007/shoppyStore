import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Input from '../../../components/Input';
import { createProduct, updateProduct, UPDATE_PRODUCT } from '../../../store/actions/product';

const FORM_INPUT_VALUE = "FORM_INPUT_VALUE";

const editReducer = (state, action) =>{
    switch (action.type) {
        case FORM_INPUT_VALUE:
            const updatedFormData = {
                ...state.formData,
                [action.input]: action.value
            };
            const updatedFormValidation = {
                ...state.formValidation,
                [action.input]: action.isValid
            };
            let updatedIsValid = true;
            for(const key in updatedFormValidation){
                updatedIsValid = updatedIsValid && updatedFormValidation[key]
            }
            return {
                formData: updatedFormData,
                formValidation: updatedFormValidation,
                isValid: updatedIsValid
            }
        default:
            return state ;
    }
}

const EditProduct = ({ route, navigation }) => {

    const { productId } = route.params;
    const product = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch()

    const [formState, dispatchForm] = useReducer(editReducer, {
        formData : {
            title: product ? product.title : '',
            imageUrl: product ? product.imageUrl : '',
            price: product ? product.price : '',
            description: product ? product.description : '',
        },
        formValidation: {
            title: product ? true : false,
            imageUrl: product ? true : false,
            price: product ? true : false,
            description: product ? true : false,
        },
        isValid: product ? true : false,
    });

    const {formData} = formState;

    const sumbitProduct = useCallback(()=>{
        if(!formState.isValid){
            Alert.alert('Alert!', 'complete your form first.',
            [
                {text: 'Ok', style: 'destructive'}
            ])
            return;
        }
        if(product){
            dispatch(updateProduct(productId, formData.title, formData.imageUrl, formData.description))
        }else{
            dispatch(createProduct(formData.title, formData.imageUrl, +formData.price, formData.description))
        }
        navigation.goBack();
    }, [formData, dispatch, productId])

    const textChangeHandler = useCallback((inputIdentifier, text, isValid) =>{
        dispatchForm({
            type: FORM_INPUT_VALUE, 
            value: text, 
            isValid: isValid, 
            input: inputIdentifier
        })
        
    },[dispatchForm])

    useEffect(()=>{
        navigation.setParams({submit: sumbitProduct})
    }, [sumbitProduct])

    return(
        <KeyboardAvoidingView>
            <ScrollView>
        <View style={styles.screen}>
            <View style={styles.form}>
                <Input
                    id='title'
                    title='Title'
                    errorText="Please enter a valid title!"
                    value={formData.title}
                    initialValue={product ? product.title : ''}
                    initialValidity={!!product}
                    onChangeValue={textChangeHandler}
                    required
                />
                <Input
                    id='imageUrl'
                    title='Image Url'
                    errorText="Please enter a valid Image Url!"
                    value={formData.imageUrl}
                    onChangeValue={textChangeHandler}
                    initialValue={product ? product.imageUrl : ''}
                    initialValidity={!!product}
                    required
                />
                {product ? null : (
                <Input
                    id='price'
                    title='Price'
                    errorText="Please enter a valid Price!"
                    value={formData.price}
                    keyboardType='number-pad'
                    onChangeValue={textChangeHandler}
                    required
                />
                )}
                <Input
                    id='description'
                    title='Description'
                    errorText="Please enter a valid Description!"
                    value={formData.description}
                    onChangeValue={textChangeHandler}
                    initialValue={product ? product.description : ''}
                    initialValidity={!!product}
                    required
                />
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    form: {
        margin: 20
    },
});

export default EditProduct;
