import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import Album from "../../components/buttons/Album";
import {AddAlbum} from "../../components/buttons/AddAlbum";
import {useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import AddAlbumModal from "../../components/modals/AddAlbum";
import {ListRenderItemInfo} from "react-native";

export interface DataItem {
  id: number;
  name: string;
}

export default function GalleryScreen({navigation}: any) {
  const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
  const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [albums, setAlbums] = useState<DataItem[]>([
    {id: 1, name: "Élément 1"},
    {id: 2, name: "Élément 2"},
    {id: 3, name: "Élément 3"},
  ]);

  useEffect(() => {
    setIsAlbumSelected(selectedAlbum.length !== 0);
  }, [selectedAlbum]);

  const renderItem: any = useCallback(({item}: ListRenderItemInfo<DataItem>) => (
    <Album
      key={item.id}
      id={item.id}
      name={item.name}
      onPress={() => navigation.navigate('Album', {albumId: item.id})}
      image={require("../../../assets/images/album_icon.png")}
    />
  ), []);

  const displayAddAlbumModal = () => {
    setModalVisible(true);
  }

  return (
    <ItemContainerStyle>
      <ScrollItemContainerStyle
        data={albums}
        renderItem={renderItem}
        numColumns={2}
      />
      <AddAlbum onPress={() => displayAddAlbumModal()} isAlbumSelected={isAlbumSelected}/>
      {
        modalVisible && (
          <AddAlbumModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        )
      }
    </ItemContainerStyle>
  );
}
