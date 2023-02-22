export function validateInputs(inputs, desiredLength, range){
    for(let input of inputs){
        if(input === ``){
            return false
           }
        if(desiredLength){
            if(input.length < desiredLength){
                return false
               }
          }
          if(range){
              if(input < range[0] || input > range[1]){
                  return false
              }
          }
    } 
  return true
}