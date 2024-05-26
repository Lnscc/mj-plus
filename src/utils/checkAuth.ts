import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const checkAuth = async () => {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
    const loggedIn = await isAuthenticated();
    console.log("is Authenticated: " + loggedIn);
    if (!loggedIn) redirect("/api/auth/login");
    return {
        loggedIn: loggedIn,
        user: await getUser(),
        permissions: {
            createImage: await getPermission("create_image"),
            getGallery: await getPermission("get_gallery")
        }
    };
};