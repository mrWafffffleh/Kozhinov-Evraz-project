
let defects = document.getElementById("defects")
let def = []
let foundDefects = new Set()
let stp = []
function scanner() {
    def = []
    stp=[]
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
    let body = document.getElementById('body')
    let rail = document.getElementById('rail')
    rail.classList.remove('invise')
    rail.classList.add('rail-class')
    rail.style.width = `${lengthRail.value * 20}px`
    rail.innerHTML = ''
    def.forEach(defs => {
        let defect = document.createElement('div')
        defect.className = 'defect'
        defect.style.left = `${defs * 20}px`
        rail.appendChild(defect)
    })


    let checkpoints = []
    let LaserCord = 0
    let Steps = 0
    stp.push(LaserCord)

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
        if(lengthRail.value - LaserCord >= 10){
            LaserCord +=10
            stp.push(LaserCord)
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
                if(distance >= 1 && distance < 5){
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
            stp.push(LaserCord)
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
    check(checkpoints, LaserCord, Steps)
}
function check(checkpoints, LaserCord, Steps){
    for(let i = 0; i < checkpoints.length; i++){
        LaserCord = checkpoints[i]
        Steps +=1
        stp.push(LaserCord)
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
                Steps +=1
                stp.push(LaserCord)
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
                else{
                    foundDefects.add(LaserCord - 1)
                }
            }
            LaserCord = checkpoints[i]
            Steps +=1
            stp.push(LaserCord)
            if(right - LaserCord <= 2){
                LaserCord = checkpoints[i] + 1
                Steps +=1
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
                else{
                    foundDefects.add(LaserCord+1)
                }
            }
            console.log(foundDefects)
        }
        if(LaserCord - left == 1 || LaserCord - left == 2){
            console.log('right', right)
            console.log('left', left)
            LaserCord = checkpoints[i] - 1
            Steps +=1
            stp.push(LaserCord)
            if(left == LaserCord){
                foundDefects.add(LaserCord)
                console.log(7, LaserCord)
            }
            else{
                foundDefects.add(LaserCord - 1)
                console.log(8, LaserCord -1)

            }
        }

        if(right - checkpoints[i] == 1 || right - checkpoints[i] == 2){
            console.log('right', right)
            console.log('left', left)
            LaserCord = checkpoints[i] +1
            Steps +=1
            stp.push(LaserCord)
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
    console.log(Steps)
}
function write(stp){
    let list = document.getElementById('list')

    for(let i = 1; i < stp.length; i++){
        let li = document.createElement('li')

    }
}
