
import { sleep } from "@helpers/sleep";
import { GitHubIssues } from "../interfaces";
import { environment } from "src/environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;


export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssues> => {
    await sleep(1500);
    try {

        const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } });

        if (!resp.ok) throw "Can't load issue"

        const issue = await resp.json() as GitHubIssues;
        console.log(issue);
        return issue;
    } catch (error) {
        throw "Can't load labels"
    }

}