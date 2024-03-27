export interface IFeedback {
    id?: number,
    text: string,
    parentId: number,
    lessonId: number,
    raiting: number,
    parentName?: string,
    lessonDate?: string
}