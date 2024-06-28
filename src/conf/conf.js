const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDBid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritecollectionidorder:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDER)
}
export default conf;