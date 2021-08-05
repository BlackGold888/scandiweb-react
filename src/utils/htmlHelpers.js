export const removeHtmlFromString = (str) =>{
    return str?.replace(/<[^>]+>/g, '');
}
