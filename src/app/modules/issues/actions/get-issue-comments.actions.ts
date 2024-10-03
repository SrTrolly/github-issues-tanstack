
import { sleep } from "@helpers/sleep";
import { GitHubIssues } from "../interfaces";
import { environment } from "src/environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;


export const getIssueCommentsByNumber = async (issueNumber: string): Promise<GitHubIssues[]> => {

    await sleep(1500);
    try {

        const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } });
        if (!resp.ok) throw "Can't load issues"

        const issues = await resp.json() as GitHubIssues[];
        console.log(issues);
        return issues;
    } catch (error) {
        throw "Can't load labels"
    }

}