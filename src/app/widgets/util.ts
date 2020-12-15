import { get } from "lodash";

export function transform<T>(data: any, map: any, fields: string[]):T{
    const output: any = {}
    output['id'] = data.id;
    fields.forEach(f=>{
        const path = map[f];
        output[f] = path ? get(data, path, null) : null;
    });
    return output;
}

export function src(src: string){
    return src;
}
