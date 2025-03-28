import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const uploadsPath = path.join(process.cwd(), "public", "uploads"); // Change path to public folder

    if (!fs.existsSync(uploadsPath)) {
        return NextResponse.json({ error: "Uploads directory not found" }, { status: 404 });
    }

    try {
        // Find a file named "logo" with an image extension in the public folder
        const logoFile = fs.readdirSync(uploadsPath).find(file =>
            file.match(/^logo\.(jpg|jpeg|png|gif|webp|svg)$/i)
        );

        if (!logoFile) {
            return NextResponse.json({ error: "Logo file not found" }, { status: 404 });
        }

        return NextResponse.json({ logo: `/uploads/${logoFile}` });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to read uploads directory" }, { status: 500 });
    }
}
