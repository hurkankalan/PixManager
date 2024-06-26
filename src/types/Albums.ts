export type AlbumSharing = {
    email?: string |null ;
    emailDel?: string|null;
    albumId: number;
};
interface SharedUser {
    id: number;
    email: string;
}
export type UpdateAlbum= {
    name: string;
    albumId:number;
}

export type Album = {
    id: number;
    name: string;
    shared_to: SharedUser[];
}