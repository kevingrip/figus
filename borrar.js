figus = [
    { 'NUM': 'PER11', 'CANT': '0' }, 
    { 'NUM': 'PER3', 'CANT': '0' }, 
    { 'NUM': 'PER22', 'CANT': '0' }, 
    { 'NUM': 'PER5', 'CANT': '0' }, 
    { 'NUM': 'PER6', 'CANT': '0' }, 
    { 'NUM': 'TRI9', 'CANT': '0' }, 
    { 'NUM': 'URU2', 'CANT': '0' }, 
    { 'NUM': 'USA16', 'CANT': '0' }, 
    { 'NUM': 'USA19', 'CANT': '0' }, 
    { 'NUM': 'USA21', 'CANT': '0' }, 
    { 'NUM': 'USA9', 'CANT': '0' }, 
    { 'NUM': 'VEN10', 'CANT': '0' }, 
    { 'NUM': 'VEN13', 'CANT': '0' }, 
    { 'NUM': 'VEN16', 'CANT': '0' }, 
    { 'NUM': 'VEN4', 'CANT': '0' }, 
    { 'NUM': 'VEN7', 'CANT': '0' }] 
let figuritas0 = []; 
let figus0str = ''; 

figus.forEach(figu =>{ 
    if (figu["CANT"] == 0) { 
        figuritas0.push(figu["NUM"])
     } 
    }) 
    
figuritas0.sort() 
let primero = '' 
let segundo = '' 
let paiss = [] 

figuritas0.forEach(figu => { 
    if (paiss.length === 0) { 
        paiss.push(figu.substring(0, 3)); 
    } if (!paiss.includes(figu.substring(0, 3))) { 
        paiss.push(figu.substring(0, 3)) 
    } }) 
    
console.log(paiss) 

for (let x = 0; x < paiss.length; x++) { 
    primero = '' 
    segundo = '' 
    figuritas0.forEach(figu => { 
        if (paiss[x] === figu.substring(0, 3)) { 
            if (figu.length === 4) { 
                primero += figu + ', ' 
            } else { 
                segundo += figu + ', ' 
            } 
        } 
    }) 
    figus0str += primero + segundo 
} 

p1 = figus0str.slice(0, -2); 

console.log(p1)