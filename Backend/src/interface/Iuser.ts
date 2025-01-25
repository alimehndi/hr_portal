interface Iuser {
    id: string,
    username: string,
    password: string,
    role : 'Admin' | 'EMP' | 'HR'
}
export default Iuser;