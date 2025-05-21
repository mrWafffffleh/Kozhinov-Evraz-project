let lengthRail = document.getElementById("length")
let defects = document.getElementById("defects")
let def = []
let borders = []

function scanner() {
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
}
function check(checkpoints, LaserCord){
    let foundDefects = new Set()
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
        }
        if(right - LaserCord>5 && right - LaserCord < 11){
            LaserCord+=1
            Steps +=1
            if(right == LaserCord){
                foundDefects.add(LaserCord)
            }


        }


    }
}


