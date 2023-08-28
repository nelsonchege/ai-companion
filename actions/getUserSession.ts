import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const getAuthSession = () => getServerSession(authOptions);
