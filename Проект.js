
let defects = document.getElementById("defects")
let def = []
let foundDefects = new Set()
function scanner() {
    def = []
    foundDefects = new Set()
    let lengthRail = document.getElementById("length")
    if (lengthRail.value == "") {
        alert("Введите длину рельсы")
        return;
    } else if (defects.value == "") {
        alert("Введите координаты дефектов")
        return;
    }
    def = defects.value.split(",").map(Number).filter(n => !isNaN(n))
    console.log(def)
    let flag = true
    def.forEach((item) => {
        if (item > +lengthRail.value) {
            flag = false
        }
    })
    if (flag == false) {
        alert('Некорректные данные')
        lengthRail.value = ''
        defects.value = ''
        return
    }

    let rail = document.getElementById('rail')
    rail.classList.remove('invise')
    rail.classList.add('rail-class')
    rail.style.width = `${lengthRail.value * 20}px`
    def.forEach(defs => {
        let defect = document.createElement('div')
        defect.className = 'defect'
        defect.style.left = `${defs * 20}px`
        rail.appendChild(defect)
    })

    let checkpoints = []
    let LaserCord = 0
    let Steps = 0

    Steps +=1
    let right = Infinity
    for(const coord of def){
        if(coord > LaserCord && coord < right){
            right = coord
        }
    }
    if(def.includes(LaserCord)){
        foundDefects.add(LaserCord)
    }

    console.log(right)

    if(right !== Infinity){
        let distance = right - LaserCord
        console.log("distance right", distance)
        if(distance >= 1 && distance <= 5){
            checkpoints.push(LaserCord + 3)
        }
    }


    console.log(LaserCord <= +lengthRail.value, LaserCord, +lengthRail.value)
    while(LaserCord < +lengthRail.value){
        console.log('LaserCord', LaserCord)
        if(lengthRail.value - LaserCord >= 20){
            LaserCord +=10
            Steps +=1
            let left = -Infinity
            let right = Infinity
            for(const coord of def){
                if(coord < LaserCord && coord > left) {
                    left = coord
                }
                if(coord > LaserCord && coord < right){
                    right = coord
                }
            }
            if(def.includes(LaserCord)){
                foundDefects.add(LaserCord)
                console.log(1, LaserCord)
            }
            console.log(left)
            console.log(right)
            if(left !== -Infinity){
                let distance = LaserCord - left
                console.log("distance left", distance)
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord - 3)
                }
                            }
            if(right !== Infinity){
                let distance = right - LaserCord
                console.log("distance right", distance)
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord + 3)
                }
            }
        }
        else{
            LaserCord = +lengthRail.value
            Steps +=1
            let left = -Infinity
            let right = Infinity
            for(const coord of def){
                if(coord < LaserCord && coord > left) {
                    left = coord
                }
                if(coord > LaserCord && coord < right){
                    right = coord
                }
            }
            if(def.includes(LaserCord)){
                foundDefects.add(LaserCord)
                console.log(2, LaserCord)
            }
            if(left !== -Infinity){
                let distance = LaserCord - left
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord - 3)
                }

            }
        }
    }
    console.log("checkpoints", checkpoints)
    check(checkpoints, LaserCord)
}
function check(checkpoints, LaserCord){
    for(let i = 0; i < checkpoints.length; i++){
        LaserCord = checkpoints[i]
        let left = -Infinity
        let right = Infinity
        for(const coord of def){
            if(coord < LaserCord && coord > left) {
                left = coord
            }
            if(coord > LaserCord && coord < right){
                right = coord
            }
        }
        if(def.includes(LaserCord)){
            foundDefects.add(LaserCord)
            console.log(3, LaserCord)
            let left = -Infinity
            let right = Infinity
            for(const coord of def){
                if(coord < LaserCord && coord > left) {

                    left = coord
                }
                if(coord > LaserCord && coord < right){
                    right = coord
                }
            }
            console.log('right', right)
            console.log('left', left)
            if(LaserCord - left <= 2){
                LaserCord -= 1
                if(left == LaserCord) {
                    foundDefects.add(LaserCord)
                    console.log(4, LaserCord)
                    let left = -Infinity
                    for (const coord of def) {
                        if (coord < LaserCord && coord > left) {
                            left = coord
                        }
                    }
                    if(LaserCord - left == 1){
                        foundDefects.add(LaserCord - 1)
                        console.log(5, LaserCord - 1)
                    }
                }
            }
            if(right - LaserCord <= 4){
                LaserCord = checkpoints[i] + 1
                console.log(".",LaserCord)
                if(right == LaserCord){
                    foundDefects.add(LaserCord)
                    let right = Infinity
                    for(const coord of def){
                        if(coord > LaserCord && coord < right){
                            right = coord
                        }
                    }
                    if(right - LaserCord == 1){
                        foundDefects.add(LaserCord+1)
                        console.log(6, LaserCord +1)
                    }
                }
            }
            console.log(foundDefects)
        }
        if(LaserCord - left == 1 && LaserCord - left == 2){
            LaserCord = checkpoints[i] - 1
            if(left == LaserCord){
                foundDefects.add(LaserCord)
                console.log(7, LaserCord)

            }
            else{
                foundDefects.add(LaserCord - 1)
                console.log(8, LaserCord -1)

            }
        }
        if(right - LaserCord == 1 && right - LaserCord == 2){
            LaserCord = checkpoints[i] +1
            if(right == LaserCord){
                foundDefects.add(LaserCord)
                console.log(9, LaserCord)

            }
            else{
                foundDefects.add(LaserCord + 1)
                console.log(10, LaserCord+1)

            }
        }


    }
    let foundDefectsArray = [ ...foundDefects ].sort((a, b) => a - b)
    console.log(foundDefectsArray)
}