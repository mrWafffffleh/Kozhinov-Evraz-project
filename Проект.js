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
    def = defects.value.split(",").map(Number).filter(n => !isNaN(n))
    console.log(def)

    let checkpoints = []
    let foundDefects = new Set()
    let LaserCord = 0
    let Steps = 0
    while(LaserCord <= lengthRail.value) {
        break
        if (def.includes(LaserCord)) {
            foundDefects.add(LaserCord)
            Steps++
        }
        let defInRange = def.filter(coord => coord >= Math.max(0, LaserCord - 10) && coord <= LaserCord + 10)
        let sortDef = defInRange.map(coord => Math.abs(coord - LaserCord)).sort((a, b) => a - b)
        let color = {
            class: "green",
            name: "Зеленый"
        }
        if(sortDef.length > 0){
            let closeDef = sortDef[0]
            if(closeDef <= 5){
                color.name = "Красный"
                color.class = "red"
                let zoneStart = Math.max(0, LaserCord - 10)
            }
            else if(closeDef <= 10 && closeDef > 5){
                color.class = "yellow"
                color.name = "Желтый"
            }

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
