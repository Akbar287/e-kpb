import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            nama: string;
            avatar: string;
        };
        expires: string;
    }
}
