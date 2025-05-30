
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
    write(stp, Steps)
}
function write(stp,Steps) {
    let list = document.getElementById('list');
    list.innerHTML = ''; // Очищаем список перед заполнением

    for (let i = 0; i < stp.length; i++) {
        let li = document.createElement('li');
        let currentPos = stp[i];

        // Информация о позиции
        let posInfo = document.createElement('span');
        posInfo.textContent = `Шаг ${i+1}: Координата ${currentPos}. `;
        li.appendChild(posInfo);

        // Проверка на наличие дефекта в текущей позиции
        let defectInfo = document.createElement('span');
        let foundDefect = false;
        let defectPos = null;
        let detectionMethod = '';

        // 1. Проверка непосредственного нахождения на дефекте
        if (def.includes(currentPos)) {
            defectPos = currentPos;
            foundDefect = true;
        }
        // 2. Проверка условий для соседних координат
        else {
            // Находим ближайшие дефекты слева и справа
            let leftDefect = null;
            let rightDefect = null;

            for (const coord of def) {
                if (coord < currentPos && (leftDefect === null || coord > leftDefect)) {
                    leftDefect = coord;
                }
                if (coord > currentPos && (rightDefect === null || coord < rightDefect)) {
                    rightDefect = coord;
                }
            }

            // Проверка условий для левого соседа (строки 186-193, 231-235)
            if (leftDefect !== null && (currentPos - leftDefect === 1 || currentPos - leftDefect === 2)) {
                // Проверяем, что в радиусе 10 см нет других дефектов
                let otherDefects = def.filter(d =>
                    d !== leftDefect &&
                    d >= leftDefect - 10 &&
                    d <= leftDefect + 10
                );

                if (otherDefects.length === 0) {
                    defectPos = leftDefect;
                    foundDefect = true;
                    detectionMethod = `Дефект обнаружен на соседней координате ${leftDefect} см (единственный в зоне)`;
                }
            }

            // Проверка условий для правого соседа (строки 210-218, 249-253)
            if (!foundDefect && rightDefect !== null && (rightDefect - currentPos === 1 || rightDefect - currentPos === 2)) {
                // Проверяем, что в радиусе 10 см нет других дефектов
                let otherDefects = def.filter(d =>
                    d !== rightDefect &&
                    d >= rightDefect - 10 &&
                    d <= rightDefect + 10
                );

                if (otherDefects.length === 0) {
                    defectPos = rightDefect;
                    foundDefect = true;
                    detectionMethod = `Дефект обнаружен на соседней координате ${rightDefect} см (единственный в зоне)`;
                }
            }
        }

        // Формируем сообщение о дефекте
        if (foundDefect) {
            defectInfo.innerHTML = `<strong>Найден дефект на ${defectPos} см!</strong><br>${detectionMethod}`;
            defectInfo.style.color = 'red';
        } else {
            defectInfo.textContent = 'Дефекты не обнаружены';
        }
        li.appendChild(defectInfo);

        // Создаем индикаторы соседних дефектов
        let indicators = document.createElement('div');
        indicators.style.display = 'flex';
        indicators.style.gap = '10px';
        indicators.style.margin = '5px 0';

        // Левый индикатор
        let leftIndicator = createDefectIndicator(currentPos, 'left');
        indicators.appendChild(leftIndicator);

        // Правый индикатор
        let rightIndicator = createDefectIndicator(currentPos, 'right');
        indicators.appendChild(rightIndicator);

        li.appendChild(indicators);
        list.appendChild(li);
    }

    // Добавляем общее количество шагов
    let stepsInfo = document.createElement('div');
    stepsInfo.textContent = `Всего выполнено шагов: ${Steps}`;
    stepsInfo.style.marginTop = '20px';
    stepsInfo.style.fontWeight = 'bold';
    list.appendChild(stepsInfo);
}

// Создает индикатор для дефектов с указанной стороны
function createDefectIndicator(position, direction) {
    let indicator = document.createElement('div');
    indicator.style.width = '20px';
    indicator.style.height = '20px';
    indicator.style.borderRadius = '50%';

    // Находим ближайший дефект с указанной стороны
    let nearestDefect = null;
    let minDistance = Infinity;

    for (const coord of def) {
        let distance = direction === 'left' ? position - coord : coord - position;
        if (distance > 0 && distance < minDistance) {
            minDistance = distance;
            nearestDefect = coord;
        }
    }

    // Устанавливаем цвет индикатора
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
function checkDefectDistance(position, direction) {
    let minDistance = Infinity;

    for (const coord of def) {
        let distance;
        if (direction === 'left' && coord < position) {
            distance = position - coord;
            if (distance < minDistance) minDistance = distance;
        } else if (direction === 'right' && coord > position) {
            distance = coord - position;
            if (distance < minDistance) minDistance = distance;
        }
    }

    return minDistance !== Infinity ? minDistance : null;
}
function getColorForDistance(distance) {
    if (distance === null) return 'green';
    if (distance <= 5) return 'red';
    if (distance <= 10) return 'yellow';
    return 'green';
}
