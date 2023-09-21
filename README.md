This is simple mp4 to mp3 converter

## Getting Started
First, install dependencies:
```bash
npm ci
```

Second, run the development server and development web app:

```bash
npm run dev
npm run server
```

Open [http://localhost:4444](http://localhost:4444) with your browser to see the result.

## Usage
1. Click Select file button
2. Select mp4 file (other files will be ignored)
3. Click Convert button
4. Wait for conversion
5. Check converted file

## Notes 
- I chose very minimalistic approach to the FE application
- I used [ffmpeg](https://ffmpeg.org/) for conversion
- Conversation happens in stream only fashion
- Errors are not handled
- Feedback to the user is as minimal as possible
- I limited the size of the file to 10MB (BE only)
- Originally I wanted to use Vercel to deploy the application, but I realized that there might be some issues with their limitation to bundle size (e.g. ffmpeg binary) and request timeout

## Thinks to consider
It would be nice to limit number of concurrent conversions. E.g. using load balancer or queue.
Also, with increasing file size, the limit of concurrent conversions should be decreased to preserve system performance. 
It should work well with some autoscaling or load balancing methods.
In case storage can be used, I could store the files and convert them asynchronously.
This would allow me to convert the files in the background and plan the conversion based on the load. 