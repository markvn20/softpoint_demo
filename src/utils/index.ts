export const getToken = () => {
    let token = localStorage.getItem("token")
    if (token) {
        return token; 
      }
      console.warn('No token found');
}

export const convertObjectToArray = <T extends Record<string, any> | undefined>(obj?: T): [string, any][] => { 
    if (!obj) {
        return []; 
    }
    return Object.entries(obj);
};

