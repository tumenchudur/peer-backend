function sortByLetter(array:any, key:string, isAscending: number) {
    // 1 = ascending
    if(isAscending){
        return array.sort((a:any, b:any) => a[key].localeCompare(b[key]));
    }else{
        return array.sort((a:any, b:any) => b[key].localeCompare(a[key]));
    }
}

export default {
   sortByLetter
}
