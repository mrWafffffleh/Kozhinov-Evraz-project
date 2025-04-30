let lengthRail = document.getElementById("length")
let defects = document.getElementById("defects")
let def = []
let borders = []
function scanner(){
    if(lengthRail.value == ""){
        alert("Введите длину рельсы")
        return;
    }
    else if(defects.value == ""){
        alert("Введите координаты дефектов")
        return;
    }
    def = defects.value.split(",")
    def.sort()
    let checkpoints = []
    let foundDefects = new Set()
    let LaserCord = 0
    while(LaserCord <= lengthRail.value) {
        if (def.includes(LaserCord)) {
            foundDefects.add(LaserCord)
        }

    }
}
function checkColor(LaserCord, isRight){
    let minDistance = 11
    for (const laserCordElement of def) {
        let distance = laserCordElement - LaserCord
        if(distance < minDistance){
            minDistance = distance
        }
    }
    if(Math.abs(minDistance) <= 5){
        return "red"
    }
    else if(Math.abs(minDistance) <= 10 && Math.abs(minDistance) > 5){
        return "yellow"
    }
    else{
        return "green"
    }
}
