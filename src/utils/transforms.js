export const transformToFilePath = (servicePath) => {
    return servicePath.replace('/', '').replace(/[\/\\]/g,'_').replace(/[?]/g,'_').replace(/["]/g,'_').replace(/[<]/g,'_').replace(/[>]/g,'_').replace(/[|]/g,'_');
}