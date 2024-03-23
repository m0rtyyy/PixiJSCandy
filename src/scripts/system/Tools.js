export class Tools {
    static randomNumber(min,max){
        return  Math.floor(Math.random() * ( max -min +1 ) + min);
    }


    static massiveRequire(req) {
        const files = [];

        req.keys().forEach(key => {
            files.push({
                key, data: req(key)
            });
        });
        
        return files;
    }
}