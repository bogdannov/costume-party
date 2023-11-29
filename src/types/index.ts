export type Costume = {
    costumeId: string;
    userId: string;
    userName: string;
    title: string;
    color?: string,
    bgColor?: string
}

export type CreateCostumePayload = Omit<Costume, 'costumeId'>

export type User = {
    id: string;
    name: string;
}

export type Connection = {
    connectionId: string;
    userId: string;
    name: string;
}
