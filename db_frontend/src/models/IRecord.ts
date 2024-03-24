export interface IRecord {
    id?: number,
    parentId: number | null,
    childId: number | null,
    lessonId: number | null,
    lessonDate?: string,
    childName?: string,
    parentName?: string
}

export interface Record {
    id?: number;
    childName: string;
    lessonName: string;
    childId: number | null;
    lessonId: number | null;
    parentId: number;
}