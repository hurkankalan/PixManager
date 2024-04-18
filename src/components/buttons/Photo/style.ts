import styled from "styled-components/native";

interface PhotoContainerProps {
    selected: boolean;
}

export const PhotoContainerStyle = styled.TouchableOpacity<PhotoContainerProps>`
    background-color: ${({ selected }) => (selected ? 'grey' : 'transparent')};
    display: flex;
    align-content: space-between;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1px;
`;

export const PhotoImageStyle = styled.Image`
    width: 100%;
    height: 100%;
`;

export const PhotoStatusStyle = styled.Text`
    text-align: center;
`;
