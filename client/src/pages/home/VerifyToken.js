// const User = require("backend/models/User.js");
// const jwt = require('jsonwebtoken');

// export default function CheckToken(){
//     async function verifyToken(req){
//         try{
//             var token = req.headers.authorization.split(' ')[1];
//             var decodedToken = jwt.decode(token, process.env.JWT_SECRET, { complete: true });
//             var user = await User.findById(decodedToken.id);
//             return(true);
//         }
//         catch(err) {
//             return(false);
//         }
//     }
    
//     async function verifyTokenInStorage(){
//         try{
//             var token = localStorage.getItem('accessToken');
//             if (token === undefined) { return(false); }
//             var decodedToken = jwt.decode(token, process.env.JWT_SECRET, { complete: true });
//             var user = await User.findById(decodedToken.id);
//             return(true);
//         }
//         catch (err){
//             return(false);
//         }
//     }
// }