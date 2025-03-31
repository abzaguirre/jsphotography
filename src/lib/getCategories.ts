import fs from "fs";
import path from "path";

export async function getCategories() {
  const categoriesPath = path.join(process.cwd(), "public", "uploads", "categories");

  if (!fs.existsSync(categoriesPath)) {
    return {};
  }

  const categories = fs.readdirSync(categoriesPath).filter(category =>
    fs.statSync(path.join(categoriesPath, category)).isDirectory()
  );

  const imagesByCategory: Record<string, string[]> = {};

  categories.forEach(category => {
    const categoryDir = path.join(categoriesPath, category);
    const files = fs.readdirSync(categoryDir).filter(file =>
      file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    imagesByCategory[category] = files.map(file => `/uploads/categories/${category}/${file}`);
  });

  return imagesByCategory;
}
