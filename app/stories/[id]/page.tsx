import Story from "@/components/Story";
import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";

interface StoryPageProps {
    params: {
        id: string;
    };
}

function StoryPage({params : {id}} : StoryPageProps) {
    //the id is url encoded so we need to decode it before using
    //it to get the story. this fixes  the issue where the story is
    // not found when the id contains special characters
    const decodedId = decodeURIComponent(id);
    const story = getStory(decodedId);


    if(!story){
        return notFound();
    }
    
    return < Story story={story} />;
}



export async function generateStaticParams(){
    const stories = getAllStories();



    const paths= stories.map((story) => ({
        id: story.story
    }))

    return paths;
}
export default StoryPage;