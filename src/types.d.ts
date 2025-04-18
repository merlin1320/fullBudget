export type Income = {
    id: number,
    income_type: string,
    income_amount: number,
    income_date: Date,
    household_id: number,
    user_id: number,    
}
export type Expense = {
    id: number,
    expense_type: string,
    expense_amount: number,
    expense_date: Date,
    household_id: number,
    user_id: number,  
}
export type Budget = {
    id: number,
    expense_type: string,
    expense_amount: number,
    expense_date: Date,
    household_id: number,
    user_id: number,
}

export type Household = {
    household_id: number,
    user_id: number,
}

export type User = {
    user_id: number,
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    join_date: Date,
    household_id: number,
}