import { createServer } from 'http'
import { createApp } from 'h3'
import createGraph from 'gun'
import serveStatic from 'serve-static'

const app = createApp()
const port = process.env.PORT || 8765
const user = process.env.USER || 'thismedium'
const pass = process.env.PASS || 'asdfghjkl'
const server  = createServer(app).listen(port)
const publish = serveStatic('app', { index: ['index.html', 'index.htm'] })


// Available from /prefix
app.use('/', () => {} )
app.use('/api', () => 'Hello world!')


/* Constants */
const $network = createGraph({web: server});
const $account = $network.user()

if ($account.is) {
    console.log('You are logged in:');
} else {
    console.log('You are not logged in');
}

const $time = $network.get('time')
$time.once((e) => {
    console.log('ack', e)
    // if(!start) { return $time.get('start').put(Date.now()).once($tick) }
    // if(!finish) { return  $time.get('update').set(Date.now()).once($tick) }
})

$account.create( user, pass, $onCreateAccountUser)
$network.on( 'auth', (ack) => {
    console.log(ack.put.alias)
    
    $time.once((e) => {
        console.log('ack2', e)
        // if(!start) { return $time.get('start').put(Date.now()).once($tick) }
        // if(!finish) { return  $time.get('update').set(Date.now()).once($tick) }
    })
})


/* Methods */

function $tick(e, i) {
    console.log(i, e)
}

function $onCreateAccountUser({ err, ok, pub }) {
    if(err) { 
        switch(err) {
            case 'User already created!':
                $account.auth( user, pass, $onAuthAccountUser )
                break;
            default:
                return console.log('API USER: [error]', err)
        }
        return
     }

    console.log('API USER CREATED', pub, ok) 
    
}

function $onAuthAccountUser(ack) {
    const { err, id, $ } = ack
    if(err) { 
        switch(err) {
            case 'Wrong user or password.':
                return console.log('API ERROR:', err)
                break;
            default:
                return console.log('API USER: [error]', err)
        }
     }

     // console.log('API USER:', ack)
     console.log('API USER: [id]', id)
     // console.log('API USER: [stats]', ack.root.stats)
     // console.log('API USER: [sea]', ack.sea)
     // console.log('API USER: [tag]', ack.tag)
     if ($account.is) {
        console.log('You are logged in');
    } else {
        console.log('You are not logged in');
    }
    
}