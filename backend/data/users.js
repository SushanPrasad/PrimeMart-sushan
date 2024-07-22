import bcrypt from "bcryptjs";

const users= [
    {
        name : 'Admin User',
        email: 'admin@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name : 'Sushan Prasad',
        email: 'sushansujipro@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name : 'Aravind',
        email: 'aravind@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name : 'shaun',
        email: 'shaun@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
  
   
]


export default users;



//preparing seeds for user to access data