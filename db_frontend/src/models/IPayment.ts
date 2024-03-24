export interface IPayment {
    id?: number;
    method: string;
    amount: number;
    parentId: number;
    lessonId: number;
    recordId: number;
    parentName?: string;
    lessonDate?: string;
}