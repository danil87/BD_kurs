export interface IRecord {
    id?: number,
    parentId: number,
    childId: number | null,
    lessonId: number | null,
    lessonDate?: string,
    childName?: string,
    parentName?: string
}