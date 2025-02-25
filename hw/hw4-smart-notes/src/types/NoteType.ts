export type NoteType = {
    // id: ReturnType<typeof uuid>;
    id: string;
    // tagId: ReturnType<typeof uuid> | null;
    tagId?: string | null;
    title: string | null;
    text: string;
    created: string;
    updated: string;
}