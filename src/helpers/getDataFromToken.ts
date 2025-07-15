import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    if (!encodedToken) return null;

    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!)as {
      id: string;
    };

    return decodedToken.id;
  } catch (error: any) {
    // Token might be expired or invalid
    return null;
  }
};