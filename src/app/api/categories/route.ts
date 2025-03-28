import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const categoriesPath = path.join(process.cwd(), "public", "uploads", "categories");

    if (!fs.existsSync(categoriesPath)) {
        return NextResponse.json({ error: "Categories directory not found" }, { status: 404 });
    }

    try {
        const categories = fs.readdirSync(categoriesPath).filter(category =>
            fs.statSync(path.join(categoriesPath, category)).isDirectory()
        );

        const imagesByCategory: Record<string, string[]> = {};

        categories.forEach(category => {
            const categoryDir = path.join(categoriesPath, category);
            const files = fs.readdirSync(categoryDir).filter(file =>
                file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) // Only image files
            );

            imagesByCategory[category] = files.map(file => `/uploads/categories/${category}/${file}`);
        });

        return NextResponse.json(imagesByCategory);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to read categories directory" }, { status: 500 });
    }
}
