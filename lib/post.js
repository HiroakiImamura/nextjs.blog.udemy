import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark} from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(),"posts")

//mdファイルのデータを取り出す

export function getPostdata(){
    const fileNames = fs.readdirSync(postDirectory);
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/,"");
    
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,'utf-8');

        const matterResult = matter(fileContents)
        return{ 
            id:id,
        ...matterResult.data,
        };
    });
    return allPostData;
}

//getStaticPath
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory);
    //ファイル名をIDに変換する
    const allPostIds  = fileNames.map((fileName) => {
        return{
            params:{
                id:fileName.replace(/\.md$/,"")
            }
        };
    });
    return allPostIds;
}

export async function getPostData(id){
    const fullPath = path.join(postDirectory,`${id}.md`);
    const fileContents  = fs.readFileSync(fullPath,'utf-8');
    const matterResult = matter(fileContents)
    
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
