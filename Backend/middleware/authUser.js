import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({success:false, message: "Unauthorized Login Required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    } catch (error) {
        return res.status(401).json({success:false, message: error.message });
    }
}
export default authUser;