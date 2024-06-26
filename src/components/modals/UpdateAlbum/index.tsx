import React, { useState } from 'react';
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {ModalContainerStyle} from "../AddAlbum/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {FormInputStyle} from "../../inputs/PrimaryInput/style";
import {ManageError} from "../../texts/PrimaryText";
import PrimaryButton from "../../buttons/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {
    setUpdateModalVisible,
    updateAlbumAsync
} from "../../../store/slices/albumSlice";
import {AppDispatch} from "../../../store/store";

export const UpdateAlbum: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const modalVisible = useSelector((state: any) => state.album.isUpdateModalVisible);
    const [albumName, setAlbumName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const selectedAlbums = useSelector((state: any) => state.album.selectedAlbum);


    const handleUpdateAlbum = () => {
        if (albumName === '') {
            setError(true);
            setErrorMessage('Album name is required');
            return;
        }
        if (selectedAlbums && selectedAlbums.length > 0) {
            selectedAlbums.forEach((albumId:number) => {
                dispatch(updateAlbumAsync({ albumId, name: albumName }));
            });
            dispatch(setUpdateModalVisible(false));
        }
/*        if(selectedAlbums)
        dispatch(updateAlbumAsync({albumId: selectedAlbums[0], name: albumName}))
        dispatch(setUpdateModalVisible(false));*/
    };

    const closeModal = () => {
        dispatch(setUpdateModalVisible(false));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => closeModal()}
        >
            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback onPress={(event) => event.stopPropagation()}>
                        <ModalContainerStyle>
                            <PrimaryTitle>Update Album</PrimaryTitle>
                            <AlbumImageStyle
                                source={require("../../../../assets/images/album_icon.png")}
                            />
                            <FormInputStyle
                                onChangeText={name => setAlbumName(name)}
                                placeholder={"Name"}
                            />
                            <ManageError
                                error={error}
                                errorMessage={errorMessage}
                            />
                            <PrimaryButton
                                onPress={() => handleUpdateAlbum()}
                                text={'Update'}
                            />
                        </ModalContainerStyle>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default UpdateAlbum;