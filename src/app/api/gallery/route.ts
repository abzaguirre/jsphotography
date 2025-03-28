import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const galleryPath = path.join(process.cwd(), "public", "uploads", "gallery");

    if (!fs.existsSync(galleryPath)) {
        return NextResponse.json({ error: "Gallery directory not found" }, { status: 404 });
    }

    try {
        // Get all image files directly inside "gallery"
        const images = fs.readdirSync(galleryPath).filter(file =>
            file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) // Only image files
        );

        return NextResponse.json({ images: images.map(file => `/uploads/gallery/${file}`) });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to read gallery directory" }, { status: 500 });
    }
}
