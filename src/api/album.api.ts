import {axiosInstance} from "./index.api";

export const createAlbum = async (name: string) => {
    const response = await axiosInstance.post("/albums",
        {
            "name": name,
            "owner": 7
        }
    );

    return response.data;
}

export const getAlbumsByUserId = async (userId: number) => {
    try {
        const response = await axiosInstance.get("/albums/users/" + userId);

        console.log('Album infos : ' + response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}
export const updateAlbums = async (name:string, userId: number) => {
    try {
        const response = await axiosInstance.put("/albums/users/" + userId,
            {
            "name": name,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const shareAlbums = async (newUserId: string | null = null, deleteUserId: string | null = null, albumId: number
) =>
{
    try {
        console.log(newUserId,deleteUserId,albumId)
        const response = await axiosInstance.put("/albums/share/" + albumId,
            {
            "newUserId": newUserId,
            "deleteUserId": deleteUserId,
        });
        console.log('La fin de la requete')
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const deleteAlbumById = async (albumIds: number[]) => {
    try {
        const response = await axiosInstance.delete("/albums", {
            data: {
                "idsToDelete": albumIds
            }
        });

        console.log('albums' + albumIds + 'deleted' + response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}