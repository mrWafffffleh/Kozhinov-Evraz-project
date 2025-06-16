
let defects = document.getElementById("defects")
let def = []
let foundDefects = new Set()
let stp = new Set()
function scanner() {
    def = []
    stp = new Set()
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
    if(lengthRail.value <= 65){
        rail.style.width = `${lengthRail.value * 20}px`
        rail.innerHTML = ''
        def.forEach(defs => {
            let defect = document.createElement('div')
            defect.className = 'defect'
            defect.style.left = `${defs * 20}px`
            rail.appendChild(defect)
        })
    }
    else if(lengthRail.value > 65){
        rail.style.width = `${lengthRail.value * 10}px`
        rail.innerHTML = ''
        def.forEach(defs => {
            let defect = document.createElement('div')
            defect.className = 'defect'
            defect.style.left = `${defs * 10}px`
            rail.appendChild(defect)
        })
    }
    let checkpoints = []
    let LaserCord = 0
    let Steps = 0
    stp.add(LaserCord)
    // Steps +=1
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
            stp.add(LaserCord)
            // Steps +=1
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
            stp.add(LaserCord)
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
    let remainingDefects = new Set()
    for(let i = 0; i < checkpoints.length; i++){
        LaserCord = checkpoints[i]
        stp.add(LaserCord)
        if(def.includes(LaserCord)){
            foundDefects.add(LaserCord)
            if(LaserCord > 3){
                if(checkDefInRange(def, LaserCord)){
                    LaserCord -= 1
                    stp.add(LaserCord)
                    if(checkDefInFound(foundDefects, LaserCord)){
                        for(let i = LaserCord; i >= LaserCord - 5; i--){
                            if(def.includes(LaserCord)){
                                foundDefects.add(LaserCord)
                                stp.add(LaserCord)
                                break
                            }
                            else{
                                LaserCord-=1
                                stp.add(LaserCord)
                            }
                        }
                    }
                }
            }
            else{
                if(checkDefInRange(def, LaserCord)){
                    LaserCord -= 1
                    stp.add(LaserCord)
                    if(def.includes(LaserCord)){
                        foundDefects.add(LaserCord)
                    }
                    else{
                        foundDefects.add(1)
                    }
                }
            }
        }
        else{
            if(LaserCord != 3){
                if(checkDefInRange(def, LaserCord)){
                    LaserCord -= 1
                    stp.add(LaserCord)
                    if(checkDefInFound(foundDefects, LaserCord)){
                        for(let i = LaserCord; i >= LaserCord - 5; i--){
                            if(def.includes(LaserCord)){
                                foundDefects.add(LaserCord)
                                stp.add(LaserCord)
                                break
                            }
                            else{
                                LaserCord-=1
                                stp.add(LaserCord)
                            }
                        }
                    }
                }
            }
            else{
                if(checkDefInRange(def, LaserCord)){
                    LaserCord -= 1
                    stp.add(LaserCord)
                    if(def.includes(LaserCord)){
                        foundDefects.add(LaserCord)
                    }
                    else{
                        foundDefects.add(1)
                    }
                }
            }
        }
    }
    let foundDefectsArray = [ ...foundDefects ].sort((a, b) => a - b)
    console.log('foundDefects', foundDefectsArray)
    write(stp, remainingDefects)
}
function checkDefInRange(def,LaserCord){
    for(let i = LaserCord; i >= LaserCord - 5; i--){
        if(def.includes(i)){
            return true
        }
    }
    return false
}
function checkDefInFound(foundDefects, LaserCord){
    for(let i = LaserCord; i >= LaserCord - 5; i--){
        if(foundDefects.has(i)){
            return false
        }
    }
    return true
}
function write(stp, remainingDefects) {
    let list = document.getElementById('list');
    list.innerHTML = '';
    let sttp = Array.from(stp)
    let remainingDef = Array.from(remainingDefects)
    let mass = []
    for (let i = 0; i < sttp.length; i++) {
        let li = document.createElement('li');
        let currentPos = sttp[i];
        let posInfo = document.createElement('span');
        posInfo.textContent = `Шаг ${i+1}: Координата ${currentPos}. `;
        li.appendChild(posInfo);
        let defectInfo = document.createElement('span');
        let foundDefect = false;
        let defectPos = null;
        let detectionMethod = '';
        console.log('remainingDef', remainingDef)
        if(def.includes(1)){
            foundDefects.add(1)
        }
        if (def.includes(currentPos)) {
            if(def.includes(1) && currentPos == 2){
                detectionMethod = `Дефект найден на координате 1 по остаточному методу`
            }
            defectPos = currentPos;
            foundDefect = true;
            defectInfo.innerHTML = `<strong>Найден дефект на ${defectPos}</strong><p style="color: red;">${detectionMethod}</p>`;
            defectInfo.style.color = 'red';
        }
        else {
            if(def.includes(1) && currentPos == 2){
                detectionMethod = `Дефект найден на координате 1 по остаточному методу`
            }
            defectInfo.innerHTML = `<strong>Дефекты не обнаружены</strong><p style="color: red;">${detectionMethod}</p>`;
        }
        li.appendChild(defectInfo);
        let indicators = document.createElement('div');
        indicators.style.display = 'flex';
        indicators.style.gap = '10px';
        indicators.style.margin = '5px 0';
        let leftIndicator = createDefectIndicator(currentPos, 'left');
        indicators.appendChild(leftIndicator);
        let rightIndicator = createDefectIndicator(currentPos, 'right');
        indicators.appendChild(rightIndicator);
        li.appendChild(indicators);
        list.appendChild(li);
    }
    let stepsInfo = document.createElement('div');
    stepsInfo.textContent = `Всего выполнено шагов: ${stp.size}`;
    stepsInfo.style.marginTop = '20px';
    stepsInfo.style.fontWeight = 'bold';
    let defectsInform = document.createElement('div')
    let founddef = Array.from(foundDefects).sort(function (a, b) { return a - b; })
    defectsInform.textContent = `Найдены дефекты на координатах: ${founddef.toString()}`
    defectsInform.style.marginTop = '20px'
    defectsInform.style.fontWeight = 'bold';
    list.appendChild(stepsInfo);
    list.appendChild(defectsInform)
}
function createDefectIndicator(position, direction) {
    let indicator = document.createElement('div');
    indicator.style.width = '20px';
    indicator.style.height = '20px';
    indicator.style.borderRadius = '50%';
    let nearestDefect = null;
    let minDistance = Infinity;
    for (const coord of def) {
        let distance = direction === 'left' ? position - coord : coord - position;
        if (distance > 0 && distance < minDistance) {
            minDistance = distance;
            nearestDefect = coord;
        }
    }
    if (nearestDefect !== null) {
        if (minDistance <= 5) {
            indicator.style.backgroundColor = 'red';
            indicator.title = `Дефект на ${nearestDefect} (расстояние ${minDistance})`;
        } else if (minDistance <= 10) {
            indicator.style.backgroundColor = 'yellow';
            indicator.title = `Дефект на ${nearestDefect}(расстояние ${minDistance})`;
        } else {
            indicator.style.backgroundColor = 'green';
            indicator.title = 'Дефектов в зоне нет';
        }
    } else {
        indicator.style.backgroundColor = 'green';
        indicator.title = 'Дефектов в зоне нет';
    }
    return indicator;
}
