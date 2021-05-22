export default interface TweetModel {
    key: number;
    user: string;
    text: string;
    comments: number;
    retweets: number;
    likes: number;
}