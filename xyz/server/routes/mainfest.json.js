/* app.get('/manifest.json', async function(req, res){ 
    //for brevity, we're not including the isDesktop function here 
    let iconUrl = isDesktop() ? '/desktop.png' : '/mobile.png'; 
    let manifest = { 
      name: "App name", 
      icons: [{ 
       src: iconUrl, 
       sizes:  "512x512", 
       type:"image/png" 
      }] 
    } 
    res.header('content-type', 'application/json'); 
    return res.status(200).send(JSON.stringify(manifest)); 
  }); */

  export default defineEventHandler((event) => {
    console.log('manifest event', event)
  })