import { environment } from '../../environments/environment'

export function appendApiRoot(input: string){
  if(!input){
    return input;
  }
  if(input.startsWith('http')){
    return input;
  }
  const separator = input.startsWith('/') ? '' : '/';
  return `${environment.apiRoot}${separator}${input}`;
}


export function cleanClientPrefix(input: string){
  if(input && input.startsWith(environment.clientEntityPrefix)){
    return input.substr(environment.clientEntityPrefix.length);
  }
  return input;
}
