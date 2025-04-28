let lengthRail = document.getElementById("length")
let defects = document.getElementById("defects")
let def = []

def = defects.value.split(",")
def.sort()

function scanner(){
    if(lengthRail.value == ""){
        alert("Введите длину рельсы")
        return;
    }
    else if(defects.value == ""){
        alert("Введите координаты дефектов")
        return;
    }
    let checkpoints = []
    let foundDefects = new Set()
    let LaserCord = 0
    while(LaserCord <= lengthRail.value){

    }

}
