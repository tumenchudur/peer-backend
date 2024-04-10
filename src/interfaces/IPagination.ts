export interface IPagination {
  limit: number
  page: number
  offset?: number
  total?: number
  total_page?: number
  artwork?: number
  koha?: number
  archive?: number
  heritage?: number
  library?: number
}
