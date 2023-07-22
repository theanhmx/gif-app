export type DraftGif = {
	file: File;
	tags: string; //A comma delimited list of tags to be applied to this GIF
	source_post_url: string; //The URL of the webpage on which this GIF was found
	id?: string; //The unique ID of the GIF
};
