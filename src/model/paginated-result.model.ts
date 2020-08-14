export type PaginatedResult<T> = {
    current_page?: number,
    last_page?: number,
    data: T
}