
const {getModels} = require('node-car-api');

async function print(){
    const brands = await getModels("RENAULT");
    console.log(brands)
}
print()