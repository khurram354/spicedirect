import dbConnect from "@/lib/db";
import UserModel from "@/models/userSchema";
import { handleError } from "@/utils/errorHandler";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if(!email ||!password){return handleError(null, "Please provide all fields")};
        await dbConnect();
        const user =await UserModel.findOne({email}).select("+password");
        if(!user){return handleError(null, "Invalid email or password")}
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){return handleError(null, "Invalid email or password")}
        const tokenData = {
            id: user._id,
            email: user.email,
            status: user.userstatus,
        }
         const token = jwt.sign(tokenData,process.env.JWT_SECRET, {expiresIn: '6d'});
         const response = NextResponse.json({success:true});
        response.cookies.set('sdwtkn', token, {
            httpOnly:true,
            path: '/'
        });
        return response;
    } catch (error) {
        if(error.code === 11000){return handleError(null, 'email already exist, choose different email')};
        return handleError(error)}
}