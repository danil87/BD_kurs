export interface IRecord {
    id?: number,
    parentId: number,
    childId: number | null,
    lessonId: number | null,
    lessonDate?: string,
    childName?: string,
    parentName?: string
}

export interface Record {
    childName: string;
    lessonName: string;
    childId: number | null;
    lessonId: number | null;
    parentId: number;
}