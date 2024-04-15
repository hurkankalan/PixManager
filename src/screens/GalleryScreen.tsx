import { ItemContainerStyle } from "../components/containers/PrimaryContainer/style";
import { ScrollItemContainerStyle } from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import { AddAlbum } from "../components/buttons/AddAlbum";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { getAlbums } from "../store/slices/albumSlice";

export interface DataItem {
    "id": number,
    "name": string,
    "created_at": string,
    "shared_to": [],
    "owner": {
        "email": string,
    }
}

export default function GalleryScreen(items: any) {
    const dispatch = useDispatch();
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
    const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);
    const data = useSelector((state: any) => state.album.albumList);

    console.log('data = ' + data);

    useEffect(() => {
        // @ts-ignore
        dispatch(getAlbums(3));
    }, [dispatch]);

    useEffect(() => {
        if (selectedAlbum.length === 0) {
            setIsAlbumSelected(false);
        } else {
            setIsAlbumSelected(true);
        }
    }, [selectedAlbum, data]);

    const renderItem: any = ({ item }: { item: DataItem }) => (
        <Album
            id={item.id}
            name={item.name}
            onPress={() => console.log("test")}
            image={require("../../assets/images/album_icon.png")}
        />
    );

    return (
        <ItemContainerStyle>
          <ScrollItemContainerStyle
            data={data}
            renderItem={renderItem}
            keyExtractor={items.id}
            numColumns={2}
          />
          <AddAlbum isAlbumSelected={isAlbumSelected}/>
        </ItemContainerStyle>
    );
}
