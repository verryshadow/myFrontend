export class QueryResult {
  totalNumberOfPatients: number
  totalNumberOfPatientsRange: string
  queryId: string

  resultLines: QueryResultLine[]
}

export class QueryResultLine {
  numberOfPatients: number
  siteName: string
}
