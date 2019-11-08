import createTable from "../model/DBSchema"

export const dbTypes = {userInfo: "userInfo", task: "task"}

export function init() {
    createTable()
}
