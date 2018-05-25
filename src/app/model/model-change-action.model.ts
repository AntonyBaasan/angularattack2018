export interface ModelChangeAction<T> {
    type: 'added' | 'removed' | 'modified';
    model: T;
}
