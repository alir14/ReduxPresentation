export interface TodoEntity {
	UserId: number
	id: string
	title: string
	completed: boolean,
}

export interface TodosEntity {
    data: TodoEntity[]
}