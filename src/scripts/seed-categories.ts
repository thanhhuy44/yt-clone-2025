import { db } from "@/db"
import { categories } from "@/db/schema"

const categoryNames = [
    "Cars and vehicles",
    "Comedy",
    "Education",
    "Gaming",
    "Entertainment",
    "Film and animation",
    "How-to and style",
    "Music",
    "News and politics",
    "People and blogs",
    "Pets and animals",
    "Science and technology",
    "Sports",
    "Travel and places"
]


const main = async () => {
    console.log("Seeding categories....")
    try {
        const values = categoryNames.map(name => ({
            name,
            description: `Videos related to ${name.toLowerCase()}`,
        }))
        await db.insert(categories).values(values)
        console.log("Seeding completed!")
    } catch (error) {
        console.error("🚀 ~ main ~ error:", error)
        process.exit(1)
    }
}

main()