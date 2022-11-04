import jwt from "jsonwebtoken";
import { User_info } from "../schemas/user_schema.js";
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu")
        const user = await User_info.findOne({ user_id:decoded.user_id})
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate' })
    }
}
export default auth;