const youtubeStreamSettings = [
    // Facebook requires an audio track, so we create a silent one here.
    // Remove this line, as well as `-shortest`, if you send audio from the browser.
    '-f', 'lavfi', '-i', 'anullsrc',
    
    // FFmpeg will read input video from STDIN
    '-i', '-',
    
    // Because we're using a generated audio source which never ends,
    // specify that we'll stop at end of other input.  Remove this line if you
    // send audio from the browser.
    // '-shortest',
    '-re', '-stream_loop', '-1',
    '-b:v',
    '-framerate', '30',
    // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
    // so that we don't waste any CPU and quality with unnecessary transcoding.
    // If the browser doesn't support H.264, set the video codec to 'libx264'
    // or similar to transcode it to H.264 here on the server.
    '-vb', '400k', '-maxrate', '1500k', '-deinterlace',
    '-vcodec', 'copy',
    
    // AAC audio is required for Facebook Live.  No browser currently supports
    // encoding AAC, so we must transcode the audio to AAC here on the server.
    '-acodec', 'aac',
    
    // FLV is the container format used in conjunction with RTMP
    '-preset', 'veryfast', '-g', '30',
    '-f', 'flv',
    '-flvflags', 'no_duration_filesize ',
    
    // The output RTMP URL.
    // For debugging, you could set this to a filename like 'test.flv', and play
    // the resulting file with VLC.  Please also read the security considerations
    // later on in this tutorial.
  ]
const defaultSettings = [
  '-f', 'lavfi', 
  '-i', 'anullsrc',
  '-c:v', 'libx264',
  '-b:a', '384k',
  '-ac', '2',
  '-profile:v', 'high',
  '-crf', '18',
  '-bf', '2',
  '-vcodec', 'copy',
  '-acodec', 'aac',
  '-preset', 'slow',
  '-g', '15',
  '-movflags', '+faststart',
  '-pix_fmt', 'yuv420p',
  '-f', 'flv',
  '-threads', '4',
  '-cpu-used', '0',
  '-b:v', '10M',
  '-r', '30',
  '-coder', '1',
  '-flvflags', 'no_duration_filesize ',
  '-vf', 'scale=out_color_matrix=bt709',
  '-color_primaries', 'bt709',
  '-color_trc', 'bt709',
  '-colorspace', 'bt709'
]

exports.settings = defaultSettings