import path from 'path';
import fs from 'fs';
import { Page, Story } from "@/types/stories";
import cleanTitle from './cleanTitle';

// Directory where stories are stored
const storiesDirectory = path.join(process.cwd(), "public/stories");

// Function to get all stories
export function getAllStories(): Story[] {
    // Check if the stories directory exists
    if (!fs.existsSync(storiesDirectory)) {
        console.error(`Directory ${storiesDirectory} does not exist.`);
        return [];
    }

    // Read the story folders from the directory
    const storyFolders = fs.readdirSync(storiesDirectory);

    const stories: Story[] = storyFolders.map(storyFolder => {
        const storyPath = path.join(storiesDirectory, storyFolder);

        // Ensure the story path is valid and readable
        if (!fs.existsSync(storyPath) || !fs.statSync(storyPath).isDirectory()) {
            console.warn(`Skipping invalid directory ${storyPath}`);
            return { story: cleanTitle(storyFolder), pages: [] };
        }

        const files = fs.readdirSync(storyPath);

        const pages: Page[] = [];
        const pageMap: { [key: string]: Partial<Page> } = {};

        // Process each file in the story folder
        files.forEach(file => {
            const filePath = path.join(storyPath, file);
            const type = path.extname(file).substring(1); // Get the file extension (txt or png)
            const pageNumber = file.match(/page(\d+)\./)?.[1]; // Extract the page number from the filename

            if (pageNumber) {
                if (!pageMap[pageNumber]) {
                    pageMap[pageNumber] = {};
                }

                // Read the content of the text file
                if (type === 'txt') {
                    try {
                        pageMap[pageNumber].txt = fs.readFileSync(filePath, "utf-8");
                    } catch (error) {
                        console.error(`Error reading text file ${filePath}:`, error);
                    }
                } 
                // Read the path of the image file
                else if (type === 'png') {
                    pageMap[pageNumber].png = `/stories/${storyFolder}/${file}`;
                }
            }
        });

        // Create the pages array from the pageMap
        Object.keys(pageMap).forEach(pageNumber => {
            if (pageMap[pageNumber].txt && pageMap[pageNumber].png) {
                pages.push(pageMap[pageNumber] as Page);
            }
        });

        // Return the story object with cleaned title and pages
        return {
            story: cleanTitle(storyFolder),
            pages,
        };
    });

    // Filter out stories that have no pages
    const storiesWithPages = stories.filter(story => story.pages.length > 0);

    return storiesWithPages;
}

// Function to get a specific story by its cleaned title
export const getStory = (story: string): Story | undefined => {
    const stories = getAllStories();
    return stories.find(s => s.story === story);
};
