import fs from "fs";
import path from "path";

export async function getGalleryImages(): Promise<string[]> {
    const galleryPath = path.join(process.cwd(), "public", "uploads", "gallery");

    if (!fs.existsSync(galleryPath)) {
        return [];
    }

    try {
        // Get all image files directly inside "gallery"
        const images = fs.readdirSync(galleryPath).filter(file =>
            file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) // Only image files
        );

        return images.map(file => `/uploads/gallery/${file}`);
    } catch (error) {
        console.error("Failed to read gallery directory:", error);
        return [];
    }
}
