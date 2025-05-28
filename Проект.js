
let defects = document.getElementById("defects")
let def = []
let foundDefects = new Set()
function scanner() {
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
        if (item > lengthRail.value) {
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

    LaserCord += 10
    Steps+=1
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
    if(left !== -Infinity){
        let distance = LaserCord - left
        if(distance >= 1 && distance <= 5){
            checkpoints.push(LaserCord + 3)
        }
        else if(distance > 5 && distance <= 10){
            checkpoints.push(LaserCord + 7)
        }
    }
    if(right !== Infinity){
        let distance = right - LaserCord
        if(distance >= 1 && distance <= 5){
            checkpoints.push(LaserCord - 3)
        }
        else if(distance > 5 && distance <= 10){
            checkpoints.push(LaserCord - 7)
        }
    }
    while(LaserCord <= lengthRail){
        console.log("l")
        if(lengthRail - LaserCord >= 20){
            LaserCord +=20
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
            if(left !== -Infinity){
                let distance = LaserCord - left
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord + 3)
                }
                else if(distance > 5 && distance <= 10){
                    checkpoints.push(LaserCord + 7)
                }
            }
            if(right !== Infinity){
                let distance = right - LaserCord
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord - 3)
                }
                else if(distance > 5 && distance <= 10){
                    checkpoints.push(LaserCord - 7)
                }
            }
        }
        else{
            LaserCord = lengthRail
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
            if(left !== -Infinity){
                let distance = LaserCord - left
                if(distance >= 1 && distance <= 5){
                    checkpoints.push(LaserCord + 3)
                }
                else if(distance > 5 && distance <= 10){
                    checkpoints.push(LaserCord + 7)
                }
            }
        }
    }
    console.log(checkpoints)
    check(checkpoints, LaserCord)
}
function check(checkpoints, LaserCord){
    for(let i = 0; checkpoints.length; i++){
        LaserCord = checkpoints[i]
        let left = -Infinity
        let right = Infinity
        for(const coord of def){
            if(coord <= LaserCord && coord > left) {
                left = coord
            }
            if(coord >= LaserCord && coord < right){
                right = coord
            }
        }
        if(left == LaserCord || right == LaserCord){
            foundDefects.add(LaserCord)
            return
        }
        if(LaserCord - left >= 1 && LaserCord - left <= 2){
            LaserCord = checkpoints[i] - 1
            if(left == LaserCord){
                foundDefects.add(LaserCord)
                return;
            }
            else{
                foundDefects.add(LaserCord - 1)
                return;
            }
        }
        if(right - LaserCord >= 1 && right - LaserCord <= 2){
            LaserCord = checkpoints[i] +1
            if(right == LaserCord){
                foundDefects.add(LaserCord)
                return;
            }
            else{
                foundDefects.add(LaserCord + 1)
                return;
            }
        }


    }
    console.log(foundDefects)
}