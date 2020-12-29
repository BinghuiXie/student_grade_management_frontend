export interface IRefFormat {
    [key: string]: Vue & {
        validate: (param: any) => void
    }
}