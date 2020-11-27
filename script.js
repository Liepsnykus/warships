let shipModels = [
    {
        number:1,
        size: 4
    },
    {
        number:2,
        size: 3
    },
    {
        number: 3,
        size: 2
    },
    {
        number: 4,
        size: 1
    }
]

const gameContainer = document.getElementById ('gameContainer')
const playerSide = document.getElementById ('playerSide')
const shipsLeft = document.getElementById ('shipsLeft')
let shipsArr = []
let createdShip = []
let usedParts = []
let damagedShip = []
let shipsTotal = 10


function checkLastShot(item) {
    shipsArr.map (x => {
        if(x.includes(item)) {
           shipsArr[shipsArr.indexOf(x)] = x.filter( el => el != item)
           console.log(shipsArr);
           shipsArr=shipsArr.filter(el => el.length != 0)
        }
       
        shipsLeft.innerText = `Ships Left: ${shipsArr.length}`

        
    })
}

function shoot(event) {
console.log(shipsArr);
    if(event.target.classList.length > 1) {
        console.log("baaaam");
        event.target.removeEventListener('click', shoot)
        event.target.classList.add('damaged')
        checkLastShot(event.target.id)
    } else {
        event.target.removeEventListener('click', shoot)
        event.target.classList.add('wrong')
    }
}
function generateUsedParts() {
    createdShip.map ( item => {
        let part = item
        usedParts.push(`${Number(part[0])+1}${Number(part[1])}`)
        usedParts.push(`${Number(part[0])-1}${Number(part[1])}`)
        usedParts.push(`${Number(part[0])+1}${Number(part[1])+1}`)
        usedParts.push(`${Number(part[0])-1}${Number(part[1])+1}`)
        usedParts.push(`${Number(part[0])+1}${Number(part[1])-1}`)
        usedParts.push(`${Number(part[0])-1}${Number(part[1])-1}`)
        usedParts.push(`${Number(part[0])}${Number(part[1])+1}`)
        usedParts.push(`${Number(part[0])}${Number(part[1])-1}`)
    })

 
}

function createBoard () {
 
    for (let x = 0; x < 100; x++) {
        let place = document.createElement('div')
        place.classList.add('place')
        let idNr = `${x}`
        idNr.length < 2 ? idNr = `0${x}` : null
        place.setAttribute('id', idNr)
        shipsArr.map (item => {
            if(item.includes(place.id)) {
                place.classList.add('ship')
                
            }
        })
        gameContainer.appendChild(place)

        place.addEventListener('click', shoot)
        
    }
   
}

function generateShip(item) {
    createdShip = []
    let a = Math.floor(Math.random()*10)
    let b = Math.floor(Math.random()*10)
    let c =0
    let shipPart = `${a}${b}`
    let shipForm = Math.floor(Math.random()*2)
                      
    if(shipForm == 0) {
        c = a
        for (let x = item.size; x > 0; ) {
            if(a+item.size<9){
                c++
                shipPart = `${c}${b}`
                createdShip.push(shipPart)
                x--
                
            } else {
                c--
                shipPart = `${c}${b}`
                createdShip.push(shipPart)
                x--
            }
        }
    } else {
        c = b
        for (let x = item.size; x > 0; ) {
            if(b+item.size<9){
                c++
                shipPart = `${a}${c}`
                createdShip.push(shipPart)
                x--
            } else {
                c--
                shipPart = `${a}${c}`
                createdShip.push(shipPart)
                x--
            }  
        }
    }   
}


function generateFleet() {
    shipModels.map(item => {
        for (let x = 0; x < item.number; ) {
            generateShip(item)
            let mistakes = 0

            shipsArr.map( item => {
                createdShip.map(x => {
                    if(item.includes(x)) {
                        mistakes++
                     }
                })
            })
            createdShip.map(x => {
                if(usedParts.includes(x)) {
                    mistakes++
                }
            })

        if(mistakes == 0) {
            shipsArr.push(createdShip)
            generateUsedParts()
            x++
        } else {
            generateShip(item)
        }

            
         
            
        }
    }) 
    createBoard()
    console.log(shipsArr);


}

generateFleet()

function makeShip() {
    
}

function createPlayerField() {
    for (let x = 0; x < 100; x++) {
        let place = document.createElement('div')
        place.classList.add('place')
        let idNr = `${x}`
        idNr.length < 2 ? idNr = `0${x}` : null
        place.setAttribute('id', `p${idNr}`)
       
        playerSide.appendChild(place)
        place.addEventListener('click', makeShip)

        
    }
}

createPlayerField() 