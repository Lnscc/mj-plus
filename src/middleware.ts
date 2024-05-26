import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest } from "next/server"

export default function Middleware(request: NextRequest) {
    console.log("Middleware...");
    return withAuth(request);
}