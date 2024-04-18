import React, {useCallback, useEffect, useState} from 'react';
import {listPhotosByAlbumId, PhotoResponse} from "../../api/photo.api";
import Photo from "../../components/buttons/Photo";
import {ListRenderItemInfo} from "react-native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {PhotoGridContainerStyle, PhotoGridItemStyle} from "../../components/containers/PhotoGrid/style";

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;

export type AlbumScreenProps = {
  route: AlbumScreenRouteProp;
  navigation: AlbumScreenNavigationProp;
};

export default function AlbumScreen({route, navigation}: AlbumScreenProps) {
  const {album} = route.params;
  const [photos, setPhotos] = useState<PhotoResponse[]>([])
  const [includeShared, setIncludeShared] = useState<boolean>(true);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: (e) => {
          navigation.navigate("Search", {search: e.nativeEvent.text?.trim(), includeShared, album});
        }
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (!isNaN(album?.id)) {
      listPhotosByAlbumId(album.id)
        .then(listing => setPhotos(listing.photos));
    }
  }, [album]);

  const renderItem: any = useCallback(({item}: ListRenderItemInfo<PhotoResponse>) => (
    <PhotoGridItemStyle>
      <Photo
        key={item.id}
        photo={item}
        onPress={() => {
          navigation.navigate('Photo', {photo: item})
        }}
      />
    </PhotoGridItemStyle>
  ), []);

  return (
    <PhotoGridContainerStyle
      contentInsetAdjustmentBehavior="automatic"
      data={photos}
      renderItem={renderItem}
      numColumns={2}
    />
  );
}