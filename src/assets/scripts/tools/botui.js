var botui = new BotUI('my-botui-app');

const delay = 500
const index = {
    'create-account': {
        message: "Let's create an account",
        to: "/account/create"
    },
    'form-profile': {
        message: "Let's create an account",
    }
}

function message ({ message, delay }, callback) {
    return botui.message.bot({
        delay,
        content: message || '...'
    }).then(function(res) {
        if(!callback) {
            console.log(Date.now(), res, 'no callack')
            return
        }

        console.log(Date.now(), 'running callback with', res.value)
        return callback(res)
    })
}

function question ({ question, placeholder, options, delay }, callback) {
    return botui.message.bot({ // show a message
        delay,
        content: question || '..?'
    })
    
    .then(function () { // wait till its shown
        
        if(placeholder) {
            return botui.action.text({ // show 'text' action
                delay: delay / 2,
                action: {
                    placeholder: placeholder || 'Enter your answer here..'
                }
            });
        }

        else if(options) {
            return botui.action.button({
                delay: delay / 2,
                action: options
            })
        }
        
    })
    
    .then(function(res) {
        if(!callback) {
            console.log(Date.now(), res, 'no callack')
            return
        }

        console.log(Date.now(), 'running callback with', res.value)
        return callback(res)
    })
}


function project (delay) {
    return botui.message.bot({
        delay,
        content: 'What would you like to do?'
    })
    
    .then(function() {
        return botui.action.button({
            delay: delay / 2,
            action: [{
                text: 'Add an account',
                value: 'account'
            }, {
                text: 'Create a new project',
                value: 'project'
            }]
        })
    })
    
    .then(function (res) {
        console.log('res', res)
        if(res.value == 'exist') {
          botui.message.human({
            delay: 500,
            content: address
          });
          end();
        } else {
          botui.message.human({
            delay: 500,
            content: res.text
          });
          askAddress();
        }
    });
}

function welcome ({delay, message}, callback) {
    
    return message({
        delay,
        message
    })

    .then(function(res, req) {
        if(!callback) {
            console.log(Date.now(), res, req, 'no callack')
            return
        }

        console.log(res, req)
        callback()
    })
}


function askAddress() {
    botui.message
      .bot({
        delay,
        content: 'Please write your address below:'
      })
      .then(function () {
        return botui.action.text({
          delay: delay * 2,
          action: {
            size: 30,
            icon: 'map-marker',
            value: address, // show the saved address if any
            placeholder: 'Address'
          }
        })
      }).then(function (res) {

        botui.message
          .bot({
            delay,
            content: 'New address: ' + res.value
          });
  
        address = res.value; // save address
  
        return botui.action.button({
          delay: 1000,
          action: [{
            icon: 'check',
            text: 'Confirm',
            value: 'confirm'
          }, {
            icon: 'pencil',
            text: 'Edit',
            value: 'edit'
          }]
        })
      }).then(function (res) {
        if(res.value == 'confirm') {
          end();
        } else {
          askAddress();
        }
      });
  }
/* botui.message.add({
    content: 'Hello from bot.'
});

botui.message.add({
    human: true,
    content: 'Hello from human.'
});
 */




message({
    delay,
    message: 'Hello!'
})

question({
    delay: delay * 3,
    question: 'Whats your name?',
    placeholder: 'Your name..'
}, (res) => message(
    {
        delay,
        message: 'Hello ' + res.value + '!'
    }
))

.then(() => {
    return question(
        {
            delay: delay * 3,
            question: 'What would you like to do?',
            options: [
                {
                    text: 'I want to create an account',
                    value: 'create-account'
                }, 
                {
                    text: 'I want to create a project',
                    value: 'create-project'
                }, 
                {
                    text: 'I want to start an index',
                    value: 'create-index'
                }
            ],
        }, 
        
        (res) => message(

            {
                delay,
                message: "Okay, " + index[res.value].message.toLowerCase() + ' then!'
            }, 
            
            (tick) => question(
                {
                    delay: delay * tick,
                    question: `How would you like to ${res.value.split('-')[0]} the ${res.value.split('-')[1]} ?`,
                    options: [
                        {
                            text: "Continue asking me questions.",
                            value: 'continue'
                        },
                        {
                            text: 'Show me a form I can fill by myself.',
                            value: 'show-form'
                        },
                        {
                            text: "Let's cancel this task.",
                            value: 'cancel'
                        }
                    ]
                }, 

                (res2) => message({
                    delay,
                    message: "Okay! Let's " + index[res2.value].message.toLowerCase() + "."
                }, () => {
                    console.log(index[res.value].route)
                })
            )

        )
    )
})

.then((res) => {
    console.log(Date.now(), 'done with task', res)
})




// welcome({ message: 'Hello!', delay })

/* .then( 
    () => profile({ delay })
) */
/* .then( 
    () => project({ delay: delay * 5 }) 
)  */

// 


 /*
botui.message.add({ // show a message
    content: 'how old are you'
}).then(function () { // wait till its shown
    return botui.action.text({ // show 'text' action
        action: {
            placeholder: 'age'
        }
    });
}).then(function (res) { // get the result
    botui.message.add({
        content: 'Your age is ' + res.value
    });
}); */


